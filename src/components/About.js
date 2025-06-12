import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Globe, 
  Brain, 
  Sparkles, 
  Star, 
  Github, 
  Mail, 
  User,
  Tv,
  Search,
  Shield,
  Zap,
  ChevronRight,
  Play,
  Heart,
  Award
} from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techStack = [
    { 
      name: 'JavaScript', 
      icon: Code, 
      gradient: 'from-yellow-400 to-orange-500',
      description: 'Modern ES6+ features'
    },
    { 
      name: 'React.js', 
      icon: Code, 
      gradient: 'from-blue-400 to-cyan-500',
      description: 'Component-based UI'
    },
    { 
      name: 'Tailwind CSS', 
      icon: Sparkles, 
      gradient: 'from-teal-400 to-blue-500',
      description: 'Utility-first styling'
    },
    { 
      name: 'Redux Toolkit', 
      icon: Database, 
      gradient: 'from-purple-400 to-pink-500',
      description: 'State management'
    },
    { 
      name: 'Firebase Auth', 
      icon: Shield, 
      gradient: 'from-orange-400 to-red-500',
      description: 'Secure authentication'
    },
    { 
      name: 'TMDB API', 
      icon: Tv, 
      gradient: 'from-green-400 to-emerald-500',
      description: 'Movie database'
    },
    { 
      name: 'OpenAI GPT', 
      icon: Brain, 
      gradient: 'from-violet-400 to-purple-500',
      description: 'AI recommendations'
    },
    { 
      name: 'Gemini API', 
      icon: Search, 
      gradient: 'from-pink-400 to-rose-500',
      description: 'Enhanced search'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Discovery',
      description: 'Intelligent movie recommendations tailored to your taste using advanced GPT technology.',
      stats: '99% Accuracy'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Seamless content experience across 15+ languages with real-time translation.',
      stats: '15+ Languages'
    },
    {
      icon: Tv,
      title: 'Vast Movie Library',
      description: 'Access to trending, upcoming, and top-rated content from TMDB\'s extensive database.',
      stats: '500K+ Movies'
    },
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Optimized for speed with lazy loading, caching, and modern web technologies.',
      stats: '<100ms Load'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-950/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent"></div>
        
        {/* Moving gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-500/5 to-orange-500/5 blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className={`relative z-10 pt-24 px-6 sm:px-10 md:px-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="relative inline-block group">
              <h1 className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
                NetflixGPT
              </h1>
              <div className="absolute -inset-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating icons */}
              <div className="absolute -top-8 -right-8 animate-bounce delay-1000">
                <div className="p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-red-400" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 animate-bounce delay-2000">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl sm:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
                Experience the <span className="font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">future of entertainment</span> with AI-powered streaming.
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Discover movies like never before with intelligent recommendations, seamless browsing, and cutting-edge technology.
              </p>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300">
                <Play className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">Production Ready</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium">AI Enhanced</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-medium">Open Source</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Powered by cutting-edge technology to deliver an exceptional streaming experience
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`group relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 hover:border-red-500/50 transition-all duration-500 hover:scale-105 cursor-pointer ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-8 h-8 text-red-400" />
                      </div>
                      <span className="text-xs font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                        {feature.stats}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="flex items-center text-red-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Section */}
          <div className="relative">
            <div className="bg-gradient-to-r from-zinc-900/80 via-zinc-800/60 to-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5"></div>
              
              <div className="relative z-10 p-8 sm:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl">
                        <User className="w-6 h-6 text-red-400" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">Meet the Developer</h2>
                    </div>
                    
                    <div className="space-y-4 text-lg">
                      <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-colors">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">Y SATHWIK REDDY</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-colors">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">sathwik1014@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-colors group cursor-pointer">
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        <a href="https://github.com/sathwikreddy1014" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                          github.com/sathwikreddy1014
                        </a>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="relative">
                      <div className="w-64 h-64 mx-auto bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                        <div className="w-48 h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center border-2 border-red-500/30">
                          <Code className="w-24 h-24 text-red-400" />
                        </div>
                      </div>
                      <div className="absolute -top-4 -right-4 animate-bounce">
                        <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full">
                          <Award className="w-6 h-6 text-green-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A comprehensive streaming platform built with modern technologies
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                    <Tv className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Features</h3>
                </div>
                
                <ul className="space-y-4">
                  {[
                    'Built with React, Tailwind CSS, and Redux',
                    'TMDB API integration for movie data',
                    'AI-powered search and recommendations',
                    'Multi-language support system',
                    'Firebase Authentication integration'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">AI Integration</h3>
                </div>
                
                <ul className="space-y-4">
                  {[
                    'OpenAI GPT for intelligent recommendations',
                    'Gemini API for enhanced search capabilities',
                    'Natural language movie queries',
                    'Personalized content suggestions',
                    'Smart filtering and categorization'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Technology Stack</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Built with cutting-edge technologies for optimal performance and scalability
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <div 
                  key={tech.name}
                  className={`group relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 cursor-pointer hover:scale-105 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  <div className="relative z-10 text-center space-y-3">
                    <div className={`mx-auto w-12 h-12 bg-gradient-to-r ${tech.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-red-400 group-hover:to-orange-400 transition-all duration-300">
                        {tech.name}
                      </h4>
                      <p className={`text-xs text-gray-400 mt-1 transition-all duration-300 ${hoveredTech === tech.name ? 'opacity-100' : 'opacity-0'}`}>
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Dive into a world of AI-powered entertainment and discover movies like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    <span>Start Exploring</span>
                  </div>
                </button>
                <button className="group bg-transparent border-2 border-white/20 text-white font-bold py-4 px-8 rounded-full hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    <span>View Source</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;