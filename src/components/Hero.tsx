
import { Github, Linkedin, Twitter, ArrowDown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-glow-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-glow-pulse animation-delay-1000"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-muted-foreground flex items-center justify-center gap-3">
              <span className="text-4xl">👋🏾</span>
              About Me
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="block text-foreground mb-4">I'm</span>
              <span className="hero-gradient animate-delay-200">Bamidele</span>
            </h1>
          </div>

          {/* Enhanced About Text */}
          <div className="mb-12 animate-fade-in animate-delay-300">
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
              A software engineer building impactful digital experiences across AI, web, and mobile.
            </p>
            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-400">
              From fintech APIs to AI-powered tools and sleek Flutter apps, I help ideas go from concept to code — fast, secure, and scalable.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animate-delay-500">
            <Link to="/tools" className="btn-hero inline-flex items-center gap-2">
              <Zap size={18} />
              Explore My AI Tools
            </Link>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              Let's Connect
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8 mb-16 animate-fade-in animate-delay-600">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-12 h-12 rounded-full bg-accent/50 hover:bg-gold/20 border border-border/20 hover:border-gold/30 flex items-center justify-center group transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon 
                  size={20} 
                  className="text-muted-foreground group-hover:text-gold transition-colors duration-300" 
                />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in animate-delay-700">
            <div className="flex flex-col items-center text-muted-foreground/60">
              <span className="text-sm mb-2">Scroll Down</span>
              <ArrowDown size={20} className="animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
