
-- Create a table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT DEFAULT 'Admin',
  reading_time INTEGER, -- estimated reading time in minutes
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read published posts
CREATE POLICY "Published blog posts are publicly readable" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = true);

-- Create policy that allows admins to manage all posts
CREATE POLICY "Admins can manage all blog posts" 
  ON public.blog_posts 
  FOR ALL
  USING (is_admin(auth.uid()));

-- Create index for better performance
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published, created_at DESC);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Insert some sample blog posts about AI/LLMs
INSERT INTO public.blog_posts (title, slug, excerpt, content, published, tags, reading_time) VALUES
(
  'The Evolution of Large Language Models in 2024',
  'evolution-of-llms-2024',
  'Exploring the latest breakthroughs in large language models and their impact on various industries.',
  '# The Evolution of Large Language Models in 2024

Large Language Models (LLMs) have undergone remarkable transformations this year. From improved reasoning capabilities to more efficient architectures, the field continues to advance at an unprecedented pace.

## Key Developments

### 1. Enhanced Reasoning Capabilities
Recent models have shown significant improvements in logical reasoning, mathematical problem-solving, and complex decision-making tasks.

### 2. Multimodal Integration
The integration of vision, audio, and text processing has opened new possibilities for AI applications across various domains.

### 3. Efficiency Improvements
New architectures and training techniques have made LLMs more efficient, reducing computational costs while maintaining performance.

## Impact on Industries

The improvements in LLMs are transforming industries from healthcare to finance, enabling new applications and improving existing workflows.',
  true,
  ARRAY['AI', 'LLMs', 'Technology', 'Machine Learning'],
  5
),
(
  'Understanding Transformer Architecture: A Deep Dive',
  'transformer-architecture-deep-dive',
  'A comprehensive look at the transformer architecture that powers modern AI systems.',
  '# Understanding Transformer Architecture: A Deep Dive

The transformer architecture has become the backbone of modern AI systems. Understanding its components and mechanisms is crucial for anyone working with or interested in AI technology.

## Core Components

### Attention Mechanism
The self-attention mechanism allows models to weigh the importance of different parts of the input sequence.

### Position Encoding
Since transformers process sequences in parallel, position encoding helps the model understand the order of elements.

### Feed-Forward Networks
These networks process the attended information and generate the final representations.

## Why Transformers Work

The success of transformers lies in their ability to:
- Process sequences in parallel
- Capture long-range dependencies
- Scale effectively with more data and parameters',
  true,
  ARRAY['AI', 'Transformers', 'Deep Learning', 'Neural Networks'],
  8
),
(
  'The Future of AI Agents and Autonomous Systems',
  'future-ai-agents-autonomous-systems',
  'Exploring the potential of AI agents and their role in creating autonomous systems.',
  '# The Future of AI Agents and Autonomous Systems

AI agents are becoming increasingly sophisticated, moving beyond simple chatbots to complex autonomous systems capable of planning, reasoning, and acting in dynamic environments.

## Current State of AI Agents

Today''s AI agents can:
- Understand complex instructions
- Break down tasks into manageable steps
- Interact with various tools and APIs
- Learn from feedback and adapt

## Challenges Ahead

### Reliability and Safety
Ensuring AI agents operate safely and reliably in real-world scenarios remains a significant challenge.

### Ethical Considerations
As agents become more autonomous, we must address ethical implications and establish proper governance frameworks.

## The Road Forward

The future of AI agents lies in creating systems that are not just intelligent, but also trustworthy, transparent, and aligned with human values.',
  false,
  ARRAY['AI Agents', 'Autonomous Systems', 'Future Tech', 'Ethics'],
  6
);
