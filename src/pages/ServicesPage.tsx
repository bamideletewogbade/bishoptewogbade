
import { Code, Brain, Smartphone, Database, Zap, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AIChat from '../components/AIChat';

const ServicesPage = () => {
  const services = [
    {
      icon: Brain,
      title: 'AI Solutions',
      description: 'Custom AI integrations, chatbots, and machine learning models for modern applications.',
      features: ['LLM Integration', 'Predictive Analytics', 'Automation Tools', 'Custom AI Models'],
      price: 'From $1,000',
      timeline: '2-4 weeks'
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies.',
      features: ['React/Next.js', 'Full-Stack Solutions', 'Performance Optimization', 'SEO Implementation'],
      price: 'From $800',
      timeline: '1-3 weeks'
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications with native performance and modern UI.',
      features: ['Flutter Development', 'Firebase Integration', 'Responsive Design', 'App Store Deployment'],
      price: 'From $1,500',
      timeline: '3-6 weeks'
    },
    {
      icon: Code,
      title: 'Consulting',
      description: 'Technical consulting and architecture design for scalable applications.',
      features: ['System Architecture', 'Code Review', 'Technical Strategy', 'Team Training'],
      price: '$50/hour',
      timeline: 'Flexible'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We start with understanding your needs, goals, and technical requirements through detailed consultation.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'I create a comprehensive project plan with timeline, milestones, and technical architecture.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development with regular updates, code reviews, and continuous feedback integration.'
    },
    {
      step: '04',
      title: 'Deployment',
      description: 'Thorough testing, deployment, and knowledge transfer with ongoing support options.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                <span className="hero-gradient">My Services</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in animate-delay-200">
                From AI-powered solutions to full-stack applications, I deliver cutting-edge technology 
                that transforms your ideas into scalable, secure digital experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-dark-lighter/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="service-card animate-fade-in group"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 flex-shrink-0">
                        <Icon size={28} className="text-gold" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-gold transition-colors duration-300">
                            {service.title}
                          </h3>
                          <div className="text-right">
                            <div className="text-gold font-semibold">{service.price}</div>
                            <div className="text-xs text-muted-foreground">{service.timeline}</div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <CheckCircle size={16} className="text-gold flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors duration-300 font-medium"
                        >
                          Get Started
                          <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="hero-gradient">My Process</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A proven methodology that ensures successful project delivery from concept to deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {process.map((item, index) => (
                <div
                  key={item.step}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-gold-foreground">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-dark-lighter/30">
          <div className="container mx-auto px-6">
            <div className="glass p-12 rounded-3xl max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Let's discuss your project and turn your vision into a powerful digital solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-hero inline-flex items-center gap-2">
                  <Brain size={18} />
                  Start Your Project
                </a>
                <a href="/tools" className="btn-outline inline-flex items-center gap-2">
                  View My Tools
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <AIChat />
    </div>
  );
};

export default ServicesPage;
