
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createAdminUser } from '@/utils/createAdminUser';
import { toast } from 'sonner';

export const CreateAdminButton = () => {
  const [creating, setCreating] = useState(false);

  const handleCreateAdmin = async () => {
    setCreating(true);
    try {
      const result = await createAdminUser();
      
      if (result.success) {
        toast.success('Admin user created successfully! You can now login with admin@example.com / admin123');
      } else {
        toast.error(`Failed to create admin user: ${result.error}`);
      }
    } catch (error) {
      toast.error('Unexpected error occurred');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mb-4">
      <Button 
        onClick={handleCreateAdmin} 
        disabled={creating}
        variant="outline"
      >
        {creating ? 'Creating Admin User...' : 'Create Admin User (admin@example.com)'}
      </Button>
      <p className="text-sm text-muted-foreground mt-2">
        Click this button to create an admin user with email: admin@example.com and password: admin123
      </p>
    </div>
  );
};
