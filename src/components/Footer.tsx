
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/20 bg-dark/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4 md:mb-0">
            <span>© {currentYear} Bamidele. Made with</span>
            <Heart size={16} className="text-gold animate-pulse" />
            <span>by Bamidele</span>
          </div>
          
          <div className="text-xs text-muted-foreground/60">
            Code By Tewogbade Bamidele
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
