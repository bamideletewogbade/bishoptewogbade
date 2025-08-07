
import { Mail, MapPin, Phone, Send, MessageCircle, Calendar, Linkedin, Github, Twitter } from 'lucide-react';
import AIChat from '../components/AIChat';

const ContactPage = () => {
  const contactMethods = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email Me',
      value: 'bamidele@example.com',
      description: 'Best for detailed project discussions',
      color: 'from-blue-500/20 to-cyan-500/20',
      link: 'mailto:bamidele@example.com'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+234 xxx xxx xxxx',
      description: 'Quick questions and instant responses',
      color: 'from-green-500/20 to-emerald-500/20',
      link: 'https://wa.me/234xxxxxxxxx'
    },
    {
      id: 'calendar',
      icon: Calendar,
      title: 'Schedule Call',
      value: 'Book 30min slot',
      description: 'Perfect for project consultations',
      color: 'from-purple-500/20 to-pink-500/20',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="hero-gradient">Let's Connect</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in animate-delay-200">
              Ready to transform your ideas into intelligent solutions? 
              Chat with my AI assistant or reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Methods */}
            <div className="space-y-6 animate-fade-in animate-delay-300">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h2>
              
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.id}
                    href={method.link}
                    className="block glass hover-glow p-6 rounded-xl border border-border/20 hover:border-gold/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={20} className="text-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                          {method.title}
                        </h3>
                        <p className="text-sm text-gold font-medium">{method.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                      </div>
                      <Send size={14} className="text-muted-foreground group-hover:text-gold transition-colors duration-300" />
                    </div>
                  </a>
                );
              })}

              {/* Social Links */}
              <div className="pt-6 border-t border-border/20">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Follow My Journey</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 glass hover-glow rounded-lg flex items-center justify-center border border-border/20 hover:border-gold/30 transition-all duration-300 group"
                      >
                        <Icon size={16} className="text-muted-foreground group-hover:text-gold transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* AI Chat Showcase */}
            <div className="animate-fade-in animate-delay-400">
              <div className="glass p-8 rounded-2xl border border-border/20">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-gold" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">AI Assistant</h2>
                  <p className="text-muted-foreground mb-6">
                    Get instant answers about my experience, skills, and projects through my AI-powered assistant.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-accent/20 rounded-lg border border-border/10">
                    <p className="text-sm text-foreground font-medium mb-2">💼 "What's your experience with AI development?"</p>
                    <p className="text-xs text-muted-foreground">Ask about my professional background</p>
                  </div>
                  
                  <div className="p-4 bg-accent/20 rounded-lg border border-border/10">
                    <p className="text-sm text-foreground font-medium mb-2">🚀 "Show me your latest projects"</p>
                    <p className="text-xs text-muted-foreground">Explore my portfolio and work</p>
                  </div>
                  
                  <div className="p-4 bg-accent/20 rounded-lg border border-border/10">
                    <p className="text-sm text-foreground font-medium mb-2">🛠️ "What tools and technologies do you use?"</p>
                    <p className="text-xs text-muted-foreground">Learn about my technical stack</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-gold bg-gold/10 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                    Chat available 24/7 • Powered by Gemini
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-20 text-center animate-fade-in animate-delay-500">
            <div className="glass p-8 rounded-2xl max-w-2xl mx-auto border border-border/20">
              <MapPin size={24} className="text-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Location</h3>
              <p className="text-muted-foreground">
                Based in Nigeria • Available for remote collaboration worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <AIChat />
    </div>
  );
};

export default ContactPage;
