import { ExternalLink, Github, ArrowRight, Calendar, Users, Code, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AIChat from '../components/AIChat';

const WorksPage = () => {
  const projects = [
    {
      title: 'AI Chat Platform',
      description: 'Modern chat application with AI-powered responses, real-time messaging, and advanced natural language processing capabilities.',
      longDescription: 'Built a comprehensive chat platform integrating OpenAI GPT models with real-time WebSocket connections. Features include message history, user authentication, typing indicators, and intelligent response generation.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'OpenAI', 'WebSocket', 'Node.js', 'MongoDB', 'JWT'],
      demoLink: '#',
      codeLink: '#',
      featured: true,
      category: 'AI/ML',
      duration: '3 months',
      team: 'Solo project',
      stats: ['500+ users', '99.9% uptime', '50ms response time']
    },
    {
      title: 'Fintech Dashboard',
      description: 'Comprehensive financial analytics dashboard with payment processing, transaction monitoring, and detailed reporting.',
      longDescription: 'Developed a full-stack fintech solution with real-time transaction processing, fraud detection algorithms, and comprehensive analytics. Integrated multiple payment gateways and implemented advanced security measures.',
      image: '/api/placeholder/600/400',
      technologies: ['Flutter', 'Firebase', 'Payment APIs', 'Charts.js', 'Node.js', 'PostgreSQL'],
      demoLink: '#',
      codeLink: '#',
      featured: true,
      category: 'Fintech',
      duration: '6 months',
      team: '4 developers',
      stats: ['$2M+ processed', '10k+ transactions', '4.8/5 rating']
    },
    {
      title: 'Campus Management App',
      description: 'Comprehensive campus solution for students and faculty management with course scheduling and grade tracking.',
      longDescription: 'Created a complete campus management system handling student enrollment, faculty scheduling, grade management, and campus events. Features include mobile app, admin dashboard, and parent portal.',
      image: '/api/placeholder/600/400',
      technologies: ['Flutter', 'Python', 'PostgreSQL', 'REST API', 'Firebase'],
      demoLink: '#',
      codeLink: '#',
      featured: false,
      category: 'Education',
      duration: '4 months',
      team: '3 developers',
      stats: ['5k+ students', '200+ faculty', '15+ schools']
    },
    {
      title: 'Trading Bot',
      description: 'Automated cryptocurrency trading bot with machine learning predictions and risk management.',
      longDescription: 'Developed an intelligent trading bot using machine learning algorithms for market prediction. Implements advanced risk management, portfolio optimization, and real-time market analysis.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'TensorFlow', 'Binance API', 'Redis', 'Docker'],
      demoLink: '#',
      codeLink: '#',
      featured: false,
      category: 'Trading',
      duration: '2 months',
      team: 'Solo project',
      stats: ['25% ROI', '100+ trades/day', '90% accuracy']
    },
    {
      title: 'Developer Tools Suite',
      description: 'Collection of productivity tools for developers including code generators and automation scripts.',
      longDescription: 'Built a comprehensive suite of developer productivity tools including code scaffolding, automated testing utilities, and deployment scripts. Supports multiple programming languages and frameworks.',
      image: '/api/placeholder/600/400',
      technologies: ['TypeScript', 'CLI Tools', 'VS Code API', 'Node.js'],
      demoLink: '#',
      codeLink: '#',
      featured: false,
      category: 'Tools',
      duration: '2 months',
      team: 'Solo project',
      stats: ['1k+ downloads', '50+ stars', '20+ contributors']
    },
    {
      title: 'E-Learning Platform',
      description: 'Interactive learning platform with AI-powered course recommendations and progress tracking.',
      longDescription: 'Developed a modern e-learning platform with adaptive learning algorithms, interactive content creation tools, and comprehensive analytics for both students and instructors.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'AI/ML', 'Video Streaming', 'Analytics', 'Stripe'],
      demoLink: '#',
      codeLink: '#',
      featured: false,
      category: 'Education',
      duration: '5 months',
      team: '6 developers',
      stats: ['10k+ learners', '500+ courses', '4.9/5 rating']
    }
  ];

  const categories = ['All', 'AI/ML', 'Fintech', 'Education', 'Trading', 'Tools'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

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
                <span className="hero-gradient">My Works</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in animate-delay-200">
                A collection of projects showcasing innovative solutions across AI, fintech, education, and developer tools. Each project represents a unique challenge solved with modern technology.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in animate-delay-300">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gold text-gold-foreground'
                      : 'glass hover-glow text-muted-foreground hover:text-foreground border border-border/20 hover:border-gold/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="hero-gradient">Featured Projects</span>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredProjects.map((project, index) => (
                  <div 
                    key={project.title}
                    className="glass hover-glow rounded-2xl overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-dark-lighter to-accent relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
                          <ExternalLink size={32} className="text-gold" />
                        </div>
                      </div>
                      
                      {/* Project Stats */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>{project.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.longDescription}
                      </p>

                      {/* Project Stats */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        {project.stats.map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs">
                            <Zap size={12} className="text-gold" />
                            <span className="text-gold font-medium">{stat}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-accent/50 text-accent-foreground text-sm rounded-full border border-border/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <a 
                            href={project.demoLink}
                            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors duration-200"
                          >
                            <ExternalLink size={16} />
                            <span className="text-sm font-medium">Live Demo</span>
                          </a>
                          <a 
                            href={project.codeLink}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            <Github size={16} />
                            <span className="text-sm font-medium">Code</span>
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users size={12} />
                          <span>{project.team}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="hero-gradient">Other Projects</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <div 
                    key={project.title}
                    className="glass hover-glow rounded-lg p-6 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={10} />
                        <span>{project.duration}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2 text-foreground group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h4>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Mini stats */}
                    <div className="flex gap-2 mb-4">
                      {project.stats.slice(0, 2).map((stat, idx) => (
                        <span key={idx} className="text-xs text-gold">
                          {stat}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 bg-accent/30 text-accent-foreground text-xs rounded border border-border/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <a 
                          href={project.demoLink}
                          className="text-gold hover:text-gold/80 transition-colors duration-200"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <a 
                          href={project.codeLink}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                          <Github size={14} />
                        </a>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
        <AIChat />
      </div>
    </div>
  );
};

export default WorksPage;
