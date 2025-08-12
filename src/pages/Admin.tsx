
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, Plus, Edit2, Trash2, Upload } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface User {
  id: string;
  email: string;
  role: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  sort_order: number;
}

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

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      setUser({
        id: session.user.id,
        email: session.user.email || '',
        role: profile.role
      });
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [servicesRes, worksRes, toolsRes] = await Promise.all([
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('works').select('*').order('sort_order'),
        supabase.from('tools').select('*').order('sort_order')
      ]);

      if (servicesRes.data) setServices(servicesRes.data);
      if (worksRes.data) setWorks(worksRes.data);
      if (toolsRes.data) setTools(toolsRes.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;

    setUploadingResume(true);
    try {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `resume.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile, { upsert: true });

      if (uploadError) throw uploadError;

      await supabase
        .from('admin_settings')
        .upsert({ key: 'resume_filename', value: fileName });

      toast({
        title: "Success",
        description: "Resume uploaded successfully!"
      });

      setResumeFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload resume.",
        variant: "destructive"
      });
    } finally {
      setUploadingResume(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">Welcome back, {user.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="services" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="works">Works</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <ServicesManager services={services} onUpdate={fetchData} />
            </TabsContent>

            <TabsContent value="works">
              <WorksManager works={works} onUpdate={fetchData} />
            </TabsContent>

            <TabsContent value="tools">
              <ToolsManager tools={tools} onUpdate={fetchData} />
            </TabsContent>

            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Management</CardTitle>
                  <CardDescription>
                    Upload your resume file. Users can download it from the navigation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="resume">Resume File (PDF recommended)</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <Button 
                    onClick={handleResumeUpload}
                    disabled={!resumeFile || uploadingResume}
                    className="flex items-center gap-2"
                  >
                    {uploadingResume ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                    Upload Resume
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const ServicesManager = ({ services, onUpdate }: { services: Service[], onUpdate: () => void }) => {
  // Component logic will be in separate components
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Services</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Service
        </Button>
      </div>
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const WorksManager = ({ works, onUpdate }: { works: Work[], onUpdate: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Works</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Work
        </Button>
      </div>
      <div className="grid gap-4">
        {works.map((work) => (
          <Card key={work.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">{work.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {work.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-secondary rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ToolsManager = ({ tools, onUpdate }: { tools: Tool[], onUpdate: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Tools</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Tool
        </Button>
      </div>
      <div className="grid gap-4">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <span className="inline-block px-2 py-1 bg-secondary rounded text-xs mt-2">
                    {tool.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Admin;
