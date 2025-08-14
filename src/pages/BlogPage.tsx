
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, Search, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  published: boolean;
  tags: string[];
  author_name: string;
  reading_time?: number;
  created_at: string;
  updated_at: string;
}

const BlogPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchSinglePost(slug);
    } else {
      fetchPosts();
    }
  }, [slug]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchSinglePost = async (postSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      setSelectedPost(data);
    } catch (error) {
      toast.error('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-10">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Single post view
  if (selectedPost) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-10">
          <div className="container mx-auto px-6 max-w-4xl">
            <Link to="/blog" className="text-gold hover:text-gold/80 mb-6 inline-block">
              ← Back to Blog
            </Link>
            
            <article className="prose prose-lg max-w-none">
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(selectedPost.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{selectedPost.reading_time || 5} min read</span>
                  </div>
                  <span>by {selectedPost.author_name}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>

              {selectedPost.featured_image_url && (
                <img
                  src={selectedPost.featured_image_url}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}

              <div 
                className="prose-content"
                dangerouslySetInnerHTML={{ 
                  __html: selectedPost.content.replace(/\n/g, '<br />') 
                }}
              />
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Blog listing view
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">AI & Technology Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest developments in AI, LLMs, and emerging technologies
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                All Posts
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="flex items-center gap-1"
                >
                  <Tag size={14} />
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="hover:text-gold transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.reading_time || 5}m</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm || selectedTag 
                  ? "No posts found matching your criteria."
                  : "No blog posts available yet."
                }
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
