
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { ServiceManager } from './ServiceManager';
import { WorksManager } from './WorksManager';
import { ToolsManager } from './ToolsManager';
import { LogOut, Settings, Briefcase, Wrench } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="works" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Works
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-6">
            <ServiceManager />
          </TabsContent>

          <TabsContent value="works" className="mt-6">
            <WorksManager />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <ToolsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
