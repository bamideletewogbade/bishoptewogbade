
import { useState, useEffect } from 'react';
import { Menu, X, Download, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthModal from './AuthModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Works', href: '/works' },
    { name: 'Tools', href: '/tools' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      setIsAdmin(profile?.role === 'admin');
    }
  };

  const handleResumeDownload = async () => {
    try {
      // Get resume filename from admin settings
      const { data: setting } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'resume_filename')
        .single();

      if (!setting?.value) {
        toast({
          title: "Resume not available",
          description: "Resume file has not been uploaded yet.",
          variant: "destructive"
        });
        return;
      }

      // Get download URL from storage
      const { data } = supabase.storage
        .from('resumes')
        .getPublicUrl(setting.value);

      // Create download link
      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.download = 'Bamidele_Resume.pdf';
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Could not download resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/80 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <span className="text-xl font-bold text-gold-foreground">B</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${location.pathname === item.href ? 'text-gold' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleResumeDownload}
                className="btn-outline flex items-center gap-2"
              >
                <Download size={16} />
                Resume
              </button>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="btn-outline flex items-center gap-2"
                >
                  <Settings size={16} />
                  Admin
                </Link>
              )}
              {!isAdmin && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-outline flex items-center gap-2 text-xs"
                >
                  <Settings size={14} />
                  Admin
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link ${location.pathname === item.href ? 'text-gold' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleResumeDownload();
                    setIsOpen(false);
                  }}
                  className="btn-outline flex items-center gap-2 w-fit"
                >
                  <Download size={16} />
                  Resume
                </button>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="btn-outline flex items-center gap-2 w-fit"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings size={16} />
                    Admin
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="btn-outline flex items-center gap-2 w-fit text-xs"
                  >
                    <Settings size={14} />
                    Admin
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onSuccess={checkAdminStatus}
      />
    </>
  );
};

export default Navigation;
