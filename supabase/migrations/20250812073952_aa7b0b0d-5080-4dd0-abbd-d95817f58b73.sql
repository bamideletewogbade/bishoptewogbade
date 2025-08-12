
-- Create tables for managing portfolio content
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE public.works (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  demo_link TEXT,
  code_link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color_gradient TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Coming Soon',
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create admin role type
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

-- Create user profiles table with roles
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- RLS Policies for public read access
CREATE POLICY "Services are publicly readable" ON public.services FOR SELECT USING (true);
CREATE POLICY "Works are publicly readable" ON public.works FOR SELECT USING (true);
CREATE POLICY "Tools are publicly readable" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Admin settings are publicly readable" ON public.admin_settings FOR SELECT USING (true);

-- RLS Policies for admin write access
CREATE POLICY "Admins can manage services" ON public.services 
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage works" ON public.works 
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage tools" ON public.tools 
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage settings" ON public.admin_settings 
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view own profile" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" ON public.profiles 
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    new.id, 
    new.email,
    CASE WHEN new.email = 'your-admin-email@example.com' THEN 'admin'::user_role ELSE 'user'::user_role END
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create storage bucket for resume uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true);

-- Storage policies for resume bucket
CREATE POLICY "Admins can upload resumes" ON storage.objects 
  FOR INSERT WITH CHECK (
    bucket_id = 'resumes' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can update resumes" ON storage.objects 
  FOR UPDATE USING (
    bucket_id = 'resumes' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can delete resumes" ON storage.objects 
  FOR DELETE USING (
    bucket_id = 'resumes' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Resumes are publicly accessible" ON storage.objects 
  FOR SELECT USING (bucket_id = 'resumes');

-- Insert initial data
INSERT INTO public.services (title, description, icon, features, sort_order) VALUES
('AI Solutions', 'Custom AI integrations, chatbots, and machine learning models for modern applications.', 'Brain', ARRAY['LLM Integration', 'Predictive Analytics', 'Automation Tools'], 1),
('Web Development', 'Modern, responsive web applications built with cutting-edge technologies.', 'Globe', ARRAY['React/Next.js', 'Full-Stack Solutions', 'Performance Optimization'], 2),
('Mobile Apps', 'Cross-platform mobile applications with native performance and modern UI.', 'Smartphone', ARRAY['Flutter Development', 'Database Integration', 'Responsive Design'], 3),
('Consulting', 'Technical consulting and architecture design for scalable applications.', 'Code', ARRAY['System Architecture', 'Code Review', 'Technical Strategy'], 4);

INSERT INTO public.works (title, description, image_url, technologies, demo_link, code_link, featured, sort_order) VALUES
('AI Chat Platform', 'Modern chat application with AI-powered responses and real-time messaging.', '/api/placeholder/400/250', ARRAY['React', 'OpenAI', 'WebSocket', 'Node.js'], '#', '#', true, 1),
('Fintech Dashboard', 'Financial analytics dashboard with payment processing and reporting.', '/api/placeholder/400/250', ARRAY['Flutter', 'Firebase', 'Payment APIs', 'Charts'], '#', '#', true, 2),
('Campus Management App', 'Comprehensive campus solution for students and faculty management.', '/api/placeholder/400/250', ARRAY['Flutter', 'Python', 'PostgreSQL', 'REST API'], '#', '#', false, 3),
('Trading Bot', 'Automated cryptocurrency trading bot with machine learning predictions.', '/api/placeholder/400/250', ARRAY['Python', 'ML', 'Binance API', 'TensorFlow'], '#', '#', false, 4),
('Developer Tools', 'Suite of productivity tools for developers and code automation.', '/api/placeholder/400/250', ARRAY['TypeScript', 'CLI Tools', 'VS Code', 'Automation'], '#', '#', false, 5),
('E-Learning Platform', 'Interactive learning platform with AI-powered course recommendations.', '/api/placeholder/400/250', ARRAY['Next.js', 'AI/ML', 'Video Streaming', 'Analytics'], '#', '#', false, 6);

INSERT INTO public.tools (title, description, icon, color_gradient, features, status, link, sort_order) VALUES
('AI Resume Analyzer', 'Intelligent resume analysis with skill matching and improvement suggestions using advanced NLP.', 'FileText', 'from-blue-500/20 to-purple-500/20', ARRAY['ATS Compatibility Check', 'Skill Gap Analysis', 'Keyword Optimization'], 'Live', '#', 1),
('Smart Contract Reader', 'AI-powered contract analysis that extracts key terms, risks, and obligations automatically.', 'Search', 'from-green-500/20 to-teal-500/20', ARRAY['Risk Assessment', 'Key Terms Extraction', 'Legal Compliance Check'], 'Beta', '#', 2),
('Document Summarizer', 'Transform lengthy documents into concise, actionable summaries with AI precision.', 'Brain', 'from-orange-500/20 to-red-500/20', ARRAY['Multi-format Support', 'Custom Summary Length', 'Key Insights Highlight'], 'Coming Soon', '#', 3),
('AI Data Insights', 'Turn raw data into meaningful insights with automated analysis and visualization.', 'Zap', 'from-purple-500/20 to-pink-500/20', ARRAY['Pattern Recognition', 'Predictive Analytics', 'Auto Visualization'], 'Live', '#', 4);
