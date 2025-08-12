
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  sort_order: number;
}

export const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: '',
    sort_order: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast.error('Failed to fetch services');
    } else {
      setServices(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      features: formData.features.split('\n').filter(f => f.trim()),
      sort_order: formData.sort_order
    };

    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingService.id);
      
      if (error) {
        toast.error('Failed to update service');
      } else {
        toast.success('Service updated successfully');
        fetchServices();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert(serviceData);
      
      if (error) {
        toast.error('Failed to create service');
      } else {
        toast.success('Service created successfully');
        fetchServices();
        resetForm();
      }
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join('\n'),
      sort_order: service.sort_order
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error('Failed to delete service');
      } else {
        toast.success('Service deleted successfully');
        fetchServices();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      features: '',
      sort_order: 0
    });
    setEditingService(null);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
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
              <Textarea
                placeholder="Features (one per line)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={4}
              />
              <Input
                type="number"
                placeholder="Sort Order"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingService ? 'Update' : 'Create'}
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
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{service.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
              <p className="text-xs text-muted-foreground">Icon: {service.icon}</p>
              <p className="text-xs text-muted-foreground">Sort Order: {service.sort_order}</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {service.features.map((feature, index) => (
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
