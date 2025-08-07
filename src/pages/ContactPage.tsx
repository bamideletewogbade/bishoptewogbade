
import { Mail, MapPin, Phone, Send, MessageCircle, Calendar, Linkedin, Github, Twitter } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

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
              Let's discuss your next AI-powered project.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Methods */}
            <div className="xl:col-span-1 space-y-6 animate-fade-in animate-delay-300">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h2>
              
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.id}
                    href={method.link}
                    className="block glass hover-glow p-6 rounded-xl border border-border/20 hover:border-gold/30 transition-all duration-300 group"
                    onMouseEnter={() => setActiveCard(method.id)}
                    onMouseLeave={() => setActiveCard(null)}
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
                      <div className={`transition-transform duration-300 ${
                        activeCard === method.id ? 'translate-x-1' : ''
                      }`}>
                        <Send size={14} className="text-muted-foreground group-hover:text-gold" />
                      </div>
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

            {/* Contact Form */}
            <div className="xl:col-span-2 animate-fade-in animate-delay-400">
              <div className="glass p-8 rounded-2xl border border-border/20">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Send me a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-accent/30 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200 text-foreground placeholder-muted-foreground"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-accent/30 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200 text-foreground placeholder-muted-foreground"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-accent/30 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200 text-foreground placeholder-muted-foreground"
                      placeholder="Let's discuss your AI project..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-accent/30 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200 text-foreground placeholder-muted-foreground resize-none"
                      placeholder="Tell me about your project, goals, and how I can help..."
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                      I typically respond within 24 hours
                    </p>
                    <button
                      type="submit"
                      className="btn-hero flex items-center gap-2 group"
                    >
                      <Send size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </button>
                  </div>
                </form>
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
    </div>
  );
};

export default ContactPage;
