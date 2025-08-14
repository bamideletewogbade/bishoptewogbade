import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    // { name: 'Works', href: '/works' },
    { name: 'Tools', href: '/tools' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleResumeDownload = async () => {
    setIsDownloading(true);
    try {
      // Use the actual filename from your public folder
      const resumeUrl = '/Tewogbade_Bamidele_.pdf'; // URL encoded space
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Tewogbade_Bamidele_Resume.pdf'; // Clean filename for download
      link.target = '_blank'; // Open in new tab as fallback
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Alternative method using fetch (more reliable)
      // const response = await fetch(resumeUrl);
      // if (response.ok) {
      //   const blob = await response.blob();
      //   const url = window.URL.createObjectURL(blob);
      //   const link = document.createElement('a');
      //   link.href = url;
      //   link.download = 'Tewogbade_Bamidele_Resume.pdf';
      //   link.click();
      //   window.URL.revokeObjectURL(url);
      // } else {
      //   // Fallback: open in new tab
      //   window.open(resumeUrl, '_blank');
      // }
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab for viewing
      window.open('/Tewogbade%20Bamidele_.pdf', '_blank');
    } finally {
      setIsDownloading(false);
    }
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
              disabled={isDownloading}
              className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} className={isDownloading ? 'animate-bounce' : ''} />
              {isDownloading ? 'Downloading...' : 'Resume'}
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
                disabled={isDownloading}
                className="btn-outline flex items-center gap-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} className={isDownloading ? 'animate-bounce' : ''} />
                {isDownloading ? 'Downloading...' : 'Resume'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;