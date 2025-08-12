
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  color_gradient: string;
  features: string[];
  status: string;
  link: string;
  sort_order: number;
}

export const ToolsManager = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    color_gradient: '',
    features: '',
    status: 'Coming Soon',
    link: '',
    sort_order: 0
  });

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast.error('Failed to fetch tools');
    } else {
      setTools(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const toolData = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      color_gradient: formData.color_gradient,
      features: formData.features.split('\n').filter(f => f.trim()),
      status: formData.status,
      link: formData.link,
      sort_order: formData.sort_order
    };

    if (editingTool) {
      const { error } = await supabase
        .from('tools')
        .update(toolData)
        .eq('id', editingTool.id);
      
      if (error) {
        toast.error('Failed to update tool');
      } else {
        toast.success('Tool updated successfully');
        fetchTools();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('tools')
        .insert(toolData);
      
      if (error) {
        toast.error('Failed to create tool');
      } else {
        toast.success('Tool created successfully');
        fetchTools();
        resetForm();
      }
    }
  };

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool);
    setFormData({
      title: tool.title,
      description: tool.description,
      icon: tool.icon,
      color_gradient: tool.color_gradient,
      features: tool.features.join('\n'),
      status: tool.status,
      link: tool.link || '',
      sort_order: tool.sort_order
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error('Failed to delete tool');
      } else {
        toast.success('Tool deleted successfully');
        fetchTools();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      color_gradient: '',
      features: '',
      status: 'Coming Soon',
      link: '',
      sort_order: 0
    });
    setEditingTool(null);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tools Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTool(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tool
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTool ? 'Edit Tool' : 'Add New Tool'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <Input
                placeholder="Icon (Lucide icon name)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
              />
              <Input
                placeholder="Color Gradient (e.g., from-blue-500 to-purple-600)"
                value={formData.color_gradient}
                onChange={(e) => setFormData({ ...formData, color_gradient: e.target.value })}
                required
              />
              <Textarea
                placeholder="Features (one per line)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={3}
              />
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                  <SelectItem value="Live">Live</SelectItem>
                  <SelectItem value="Beta">Beta</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Link (optional)"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Sort Order"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingTool ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm">
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{tool.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(tool)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(tool.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
              <p className="text-xs text-muted-foreground">Status: {tool.status}</p>
              <p className="text-xs text-muted-foreground">Icon: {tool.icon}</p>
              <p className="text-xs text-muted-foreground">Sort Order: {tool.sort_order}</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {tool.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
