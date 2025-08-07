
import { Brain, FileText, Search, Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const Tools = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'resume-analyzer',
      title: 'AI Resume Analyzer',
      description: 'Intelligent resume analysis with skill matching and improvement suggestions using advanced NLP.',
      icon: FileText,
      color: 'from-blue-500/20 to-purple-500/20',
      features: ['ATS Compatibility Check', 'Skill Gap Analysis', 'Keyword Optimization'],
      status: 'Live',
      link: '#'
    },
    {
      id: 'contract-reader',
      title: 'Smart Contract Reader',
      description: 'AI-powered contract analysis that extracts key terms, risks, and obligations automatically.',
      icon: Search,
      color: 'from-green-500/20 to-teal-500/20',
      features: ['Risk Assessment', 'Key Terms Extraction', 'Legal Compliance Check'],
      status: 'Beta',
      link: '#'
    },
    {
      id: 'text-summarizer',
      title: 'Document Summarizer',
      description: 'Transform lengthy documents into concise, actionable summaries with AI precision.',
      icon: Brain,
      color: 'from-orange-500/20 to-red-500/20',
      features: ['Multi-format Support', 'Custom Summary Length', 'Key Insights Highlight'],
      status: 'Coming Soon',
      link: '#'
    },
    {
      id: 'data-insights',
      title: 'AI Data Insights',
      description: 'Turn raw data into meaningful insights with automated analysis and visualization.',
      icon: Zap,
      color: 'from-purple-500/20 to-pink-500/20',
      features: ['Pattern Recognition', 'Predictive Analytics', 'Auto Visualization'],
      status: 'Live',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="hero-gradient">AI-Powered Tools</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in animate-delay-200">
              Discover intelligent solutions that automate complex tasks, 
              analyze data with precision, and unlock insights from your content.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="relative group animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                >
                  <div className="glass hover-glow p-8 rounded-2xl h-full border border-border/20 group-hover:border-gold/30 transition-all duration-500">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} className="text-gold" />
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        tool.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                        tool.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {tool.status}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-gold transition-colors duration-300">
                      {tool.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-8">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={tool.link}
                      className={`flex items-center gap-2 text-gold hover:text-gold/80 transition-all duration-300 ${
                        hoveredTool === tool.id ? 'translate-x-2' : ''
                      }`}
                    >
                      <span className="font-medium">
                        {tool.status === 'Coming Soon' ? 'Stay Tuned' : 'Try Tool'}
                      </span>
                      {tool.status !== 'Coming Soon' ? (
                        <ExternalLink size={16} />
                      ) : (
                        <ArrowRight size={16} />
                      )}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 animate-fade-in animate-delay-400">
            <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Need a Custom AI Tool?
              </h3>
              <p className="text-muted-foreground mb-6">
                Have a specific use case in mind? Let's build a tailored AI solution for your needs.
              </p>
              <a
                href="/contact"
                className="btn-hero inline-flex items-center gap-2"
              >
                <Brain size={18} />
                Let's Build Together
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
