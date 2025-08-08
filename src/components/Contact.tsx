
import { Mail, MapPin, Phone, MessageCircle, Calendar, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Me',
      value: 'bishoptewogbade@gmail.com',
      description: 'Best for detailed project discussions',
      link: 'mailto:bamidele@example.com'
    },
    {
      icon: Phone,
      title: 'Call Me',
      value: '+234 706 170 1552',
      description: 'Quick questions and instant responses',
      link: '#'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+234 706 170 1552',
      description: 'Quick questions and instant responses',
      link: 'https://wa.me/234xxxxxxxxx'
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bamidele-tewogbade/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/bamideletewogbade', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/_tewogbade', label: 'Twitter' }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-lighter/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            <span className="hero-gradient">Let's Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Ready to bring your ideas to life? Chat with my AI assistant or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6 animate-fade-in animate-delay-300">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, innovative projects, 
                and ways to help bring your digital vision to life.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.title}
                    href={method.link}
                    className="flex items-start gap-4 p-4 glass hover-glow rounded-lg group transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground group-hover:text-gold transition-colors duration-300">
                        {method.title}
                      </h4>
                      <p className="text-sm text-gold font-medium">{method.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-border/20">
              <h4 className="text-lg font-semibold mb-4 text-foreground">Follow My Journey</h4>
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

          {/* AI Chat Preview */}
          <div className="animate-fade-in animate-delay-400">
            <div className="glass p-8 rounded-2xl border border-border/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} className="text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Chat with My AI Assistant</h3>
                <p className="text-muted-foreground text-sm">
                  Ask questions about my experience, skills, projects, or anything you'd like to know!
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-accent/30 rounded-lg border border-border/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-gold/20 to-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground mb-2">
                        "What technologies does Bamidele specialize in?"
                      </p>
                      <p className="text-xs text-muted-foreground">Try asking questions like this!</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    The AI chat assistant will appear in the bottom-right corner
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs text-gold">
                    <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                    Powered by Google Gemini
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Card */}
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
  );
};

export default Contact;
