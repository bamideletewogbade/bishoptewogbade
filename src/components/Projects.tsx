import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'AI Chat Platform',
      description: 'Modern chat application with AI-powered responses and real-time messaging.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'OpenAI', 'WebSocket', 'Node.js'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      title: 'Fintech Dashboard',
      description: 'Financial analytics dashboard with payment processing and reporting.',
      image: '/api/placeholder/400/250',
      technologies: ['Flutter', 'Firebase', 'Payment APIs', 'Charts'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      title: 'Campus Management App',
      description: 'Comprehensive campus solution for students and faculty management.',
      image: '/api/placeholder/400/250',
      technologies: ['Flutter', 'Python', 'PostgreSQL', 'REST API'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    },
    {
      title: 'Trading Bot',
      description: 'Automated cryptocurrency trading bot with machine learning predictions.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'ML', 'Binance API', 'TensorFlow'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    },
    {
      title: 'Developer Tools',
      description: 'Suite of productivity tools for developers and code automation.',
      image: '/api/placeholder/400/250',
      technologies: ['TypeScript', 'CLI Tools', 'VS Code', 'Automation'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    },
    {
      title: 'E-Learning Platform',
      description: 'Interactive learning platform with AI-powered course recommendations.',
      image: '/api/placeholder/400/250',
      technologies: ['Next.js', 'AI/ML', 'Video Streaming', 'Analytics'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            <span className="hero-gradient">Featured Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-200">
            A showcase of innovative solutions built with modern technologies
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.title}
              className="glass hover-glow rounded-lg overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="aspect-video bg-gradient-to-br from-dark-lighter to-accent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                    <ExternalLink size={24} className="text-gold" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
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
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <div 
              key={project.title}
              className="glass hover-glow rounded-lg p-6 group animate-fade-in"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <h4 className="text-lg font-semibold mb-2 text-foreground group-hover:text-gold transition-colors duration-300">
                {project.title}
              </h4>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
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
  );
};

export default Projects;
