
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Work {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  demo_link: string;
  code_link: string;
  featured: boolean;
  sort_order: number;
}

export const WorksManager = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    technologies: '',
    demo_link: '',
    code_link: '',
    featured: false,
    sort_order: 0
  });

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    const { data, error } = await supabase
      .from('works')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast.error('Failed to fetch works');
    } else {
      setWorks(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const workData = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
      demo_link: formData.demo_link,
      code_link: formData.code_link,
      featured: formData.featured,
      sort_order: formData.sort_order
    };

    if (editingWork) {
      const { error } = await supabase
        .from('works')
        .update(workData)
        .eq('id', editingWork.id);
      
      if (error) {
        toast.error('Failed to update work');
      } else {
        toast.success('Work updated successfully');
        fetchWorks();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('works')
        .insert(workData);
      
      if (error) {
        toast.error('Failed to create work');
      } else {
        toast.success('Work created successfully');
        fetchWorks();
        resetForm();
      }
    }
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      description: work.description,
      image_url: work.image_url || '',
      technologies: work.technologies.join(', '),
      demo_link: work.demo_link || '',
      code_link: work.code_link || '',
      featured: work.featured,
      sort_order: work.sort_order
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this work?')) {
      const { error } = await supabase
        .from('works')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error('Failed to delete work');
      } else {
        toast.success('Work deleted successfully');
        fetchWorks();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      technologies: '',
      demo_link: '',
      code_link: '',
      featured: false,
      sort_order: 0
    });
    setEditingWork(null);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Works Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingWork(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Work
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingWork ? 'Edit Work' : 'Add New Work'}
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
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
              <Input
                placeholder="Technologies (comma separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              />
              <Input
                placeholder="Demo Link"
                value={formData.demo_link}
                onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
              />
              <Input
                placeholder="Code Link"
                value={formData.code_link}
                onChange={(e) => setFormData({ ...formData, code_link: e.target.value })}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                />
                <label htmlFor="featured" className="text-sm">Featured</label>
              </div>
              <Input
                type="number"
                placeholder="Sort Order"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingWork ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {works.map((work) => (
          <Card key={work.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{work.title} {work.featured && '⭐'}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(work)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(work.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{work.description}</p>
              <p className="text-xs text-muted-foreground">Technologies: {work.technologies.join(', ')}</p>
              <p className="text-xs text-muted-foreground">Sort Order: {work.sort_order}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
