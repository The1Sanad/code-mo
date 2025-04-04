import React from 'react';
import { Terminal, Star, Shield, Zap, CheckCircle, Users, Clock, Code, Menu, X, Github, Twitter, Heart, ChevronRight } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { Analytics } from '@vercel/analytics/react';

export default function Layout() {
  const location = useLocation();
  const showHero = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const getPageTitle = () => {
    if (showHero) return 'DevUtils - Online Developer Tools & Utilities';
    const tool = location.pathname.split('/').pop();
    if (!tool) return 'DevUtils - Tools';
    return `${tool.charAt(0).toUpperCase() + tool.slice(1)} Tool - DevUtils`;
  };

  const getPageDescription = () => {
    if (showHero) return 'Free online developer tools including JSON formatter, Base64 encoder, JWT debugger, RegExp tester, and more. All tools run locally in your browser for maximum privacy.';
    const tool = location.pathname.split('/').pop();
    if (!tool) return 'Browse our collection of developer tools';
    return `Online ${tool.charAt(0).toUpperCase() + tool.slice(1)} tool - Free, fast, and secure. Works entirely in your browser.`;
  };

  return (
    <>
      <Analytics />
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <link rel="canonical" href={`https://code-mo.com${location.pathname}`} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:url" content={`https://code-mo.com${location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
      </Helmet>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="fixed w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
          <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
            <Link to="/" className="flex items-center space-x-2" aria-label="Code-mo Home">
              <Terminal className="w-6 h-6 text-blue-500" aria-hidden="true" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Code-mo</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/tools" className="text-gray-300 hover:text-white transition flex items-center">
                <Code className="w-4 h-4 mr-1" />
                <span>Tools</span>
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>About</span>
              </Link>
              <Link to="/faqs" className="text-gray-300 hover:text-white transition flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>FAQs</span>
              </Link>
              <a href="https://github.com/The1Sanad/code-mo" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition flex items-center">
                <Github className="w-4 h-4 mr-1" />
                <span>GitHub</span>
              </a>
              <Link to="/tools" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-500/20">
                Get Started
              </Link>
              
              {/* Theme Toggle */}
              <div className="border-l border-gray-700 pl-4">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-800 border-b border-gray-700 py-4">
              <div className="container mx-auto px-4 space-y-3">
                <Link to="/tools" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
                <Link to="/about" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link to="/faqs" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
                <a href="https://github.com/yourusername/code-mo" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white transition py-2">GitHub</a>
                <Link to="/tools" className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition mt-4 text-center" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        {showHero && (
          <section className="pt-32 pb-20 relative" aria-labelledby="hero-heading">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block bg-blue-500/10 text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  17+ Developer Tools • 100% Free • No Sign-up Required
                </div>
                
                <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                  All-in-one Online Toolbox for Developers
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Boost your productivity with our collection of powerful, browser-based developer tools. 
                  No installation, no sign-up, just instant access to the tools you need.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
                    <Zap className="w-8 h-8 text-blue-500 mb-2 mx-auto" aria-hidden="true" />
                    <h3 className="font-medium mb-1">Lightning Fast</h3>
                    <p className="text-sm text-gray-400">Optimized for speed with instant results</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
                    <Shield className="w-8 h-8 text-blue-500 mb-2 mx-auto" aria-hidden="true" />
                    <h3 className="font-medium mb-1">100% Private</h3>
                    <p className="text-sm text-gray-400">All processing happens in your browser</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
                    <Code className="w-8 h-8 text-blue-500 mb-2 mx-auto" aria-hidden="true" />
                    <h3 className="font-medium mb-1">Developer-First</h3>
                    <p className="text-sm text-gray-400">Built by developers for developers</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <Link 
                    to="/tools" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-blue-500/20 w-full sm:w-auto text-center"
                  >
                    Explore All Tools
                  </Link>
                  <a 
                    href="https://github.com/yourusername/code-mo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition border border-gray-700 w-full sm:w-auto"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Star on GitHub
                  </a>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6 border-t border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="flex" aria-label="4.9 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400" fill={i < 5 ? "currentColor" : "none"} aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-gray-400">5.0 based on user reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" aria-hidden="true" />
                    <span className="text-gray-400">Used by 10,000+ developers monthly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                    <span className="text-gray-400">Open source & actively maintained</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <main className={`py-20 bg-gray-800 ${!showHero ? 'pt-32' : ''}`}>
          <div className="container mx-auto px-4">
            {showHero && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Popular Developer Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* JSON Formatter Card */}
                  <Link to="/tools/json" className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg group-hover:text-blue-400 transition">JSON Formatter</h3>
                      <Code className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Format, validate and beautify JSON data with syntax highlighting</p>
                    <div className="text-blue-500 text-sm flex items-center">
                      <span>Try it now</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                  
                  {/* JWT Debugger Card */}
                  <Link to="/tools/jwt" className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg group-hover:text-blue-400 transition">JWT Debugger</h3>
                      <Shield className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Decode and verify JSON Web Tokens with detailed payload inspection</p>
                    <div className="text-blue-500 text-sm flex items-center">
                      <span>Try it now</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                  
                  {/* RegExp Tester Card */}
                  <Link to="/tools/regexp" className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg group-hover:text-blue-400 transition">RegExp Tester</h3>
                      <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Test and debug regular expressions with real-time matching</p>
                    <div className="text-blue-500 text-sm flex items-center">
                      <span>Try it now</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </div>
                
                <div className="text-center mt-8">
                  <Link to="/tools" className="inline-flex items-center text-blue-500 hover:text-blue-400 transition">
                    <span>View all 17+ developer tools</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            )}
            
            <div className="grid md:grid-cols-12 gap-8">
              <aside className="md:col-span-3">
                <Sidebar />
              </aside>
              <div className="md:col-span-9">
                <Outlet />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Terminal className="w-6 h-6 text-blue-500" aria-hidden="true" />
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Code-mo</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">Free, fast, and secure developer tools that run entirely in your browser.</p>
                <div className="flex space-x-4">
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/yourusername/code-mo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-lg">Tools</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/tools/json" className="hover:text-blue-400 transition">JSON Formatter</Link></li>
                  <li><Link to="/tools/jwt" className="hover:text-blue-400 transition">JWT Debugger</Link></li>
                  <li><Link to="/tools/regexp" className="hover:text-blue-400 transition">RegExp Tester</Link></li>
                  <li><Link to="/tools/base64" className="hover:text-blue-400 transition">Base64 Encoder</Link></li>
                  <li><Link to="/tools" className="hover:text-blue-400 transition">View All Tools</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-lg">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/faqs" className="hover:text-blue-400 transition">FAQs</Link></li>
                  <li><a href="https://github.com/The1Sanad/code-mo" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">GitHub Repository</a></li>
                  <li><Link to="/support" className="hover:text-blue-400 transition">Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-lg">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="hover:text-blue-400 transition">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2024 code-mo.com. All rights reserved.
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                <span>by developers for developers</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}