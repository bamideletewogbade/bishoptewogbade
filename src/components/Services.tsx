
import { Code, Brain, Smartphone, Database, Zap, Globe } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: 'AI Solutions',
      description: 'Custom AI integrations, chatbots, and machine learning models for modern applications.',
      features: ['LLM Integration', 'Predictive Analytics', 'Automation Tools']
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies.',
      features: ['React/Next.js', 'Full-Stack Solutions', 'Performance Optimization']
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications with native performance and modern UI.',
      features: ['Flutter Development', 'Firebase Integration', 'Responsive Design']
    },
    {
      icon: Database,
      title: 'Fintech Engineering',
      description: 'Secure financial applications with payment integrations and banking APIs.',
      features: ['Payment Gateways', 'Core Banking', 'Security Implementation']
    },
    {
      icon: Zap,
      title: 'DevOps & Tools',
      description: 'Development infrastructure, automation, and developer productivity tools.',
      features: ['CI/CD Pipelines', 'Testing Automation', 'Code Analysis']
    },
    {
      icon: Code,
      title: 'Consulting',
      description: 'Technical consulting and architecture design for scalable applications.',
      features: ['System Architecture', 'Code Review', 'Technical Strategy']
    }
  ];

  return (
    <section id="services" className="py-20 bg-dark-lighter/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            <span className="hero-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Transforming ideas into powerful digital solutions with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title}
                className="service-card animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon size={24} className="text-gold" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground/80 flex items-center">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
