
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'bamidele@example.com',
      link: 'mailto:bamidele@example.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Remote / Nigeria',
      link: '#'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+234 xxx xxx xxxx',
      link: 'tel:+234xxxxxxxxx'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-lighter/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            <span className="hero-gradient">Let's Work Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Ready to bring your ideas to life? Get in touch and let's discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in animate-delay-300">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, innovative projects, 
                and ways to help bring your digital vision to life.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.title}
                    href={info.link}
                    className="flex items-center gap-4 p-4 glass hover-glow rounded-lg group transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-gold transition-colors duration-300">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in animate-delay-400">
            <form onSubmit={handleSubmit} className="glass p-8 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-accent/50 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors duration-200 text-foreground placeholder-muted-foreground"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-accent/50 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors duration-200 text-foreground placeholder-muted-foreground"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-accent/50 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors duration-200 text-foreground placeholder-muted-foreground"
                  placeholder="Project discussion"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-accent/50 border border-border/20 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors duration-200 text-foreground placeholder-muted-foreground resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-hero flex items-center justify-center gap-3 group"
              >
                <Send size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
