
import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Works', href: '/works' },
    { name: 'Tools', href: '/tools' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleResumeDownload = () => {
    // You can replace this with your actual resume URL
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Bamidele_Resume.pdf';
    link.click();
  };

  return (
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
