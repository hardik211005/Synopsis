import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, History, Briefcase, FileSearch, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Compass },
    { path: '/analyze', label: 'Resume Analyzer', icon: FileSearch },
    { path: '/jobs', label: 'Job Matches', icon: Briefcase },
    { path: '/history', label: 'Analysis History', icon: History },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-hairline sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2 rounded-lg"
        >
          <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center text-brass shadow-sm group-hover:bg-navy-dark transition-colors">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-navy">
              Career<span className="text-brass ml-0.5">Compass</span>
            </span>
            <span className="font-mono text-[10px] text-slateCustom tracking-widest uppercase -mt-1 font-semibold">
              ATS & AI Resume Engine
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-brass ${
                  active
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slateCustom hover:text-navy hover:bg-offwhite'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-brass' : 'text-slateCustom'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/analyze"
            className="group flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-brass text-white hover:bg-brass-dark rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check ATS Score</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-navy hover:bg-offwhite focus:outline-none focus:ring-2 focus:ring-brass"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  active
                    ? 'bg-navy text-white'
                    : 'text-slateCustom hover:text-navy hover:bg-offwhite'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-brass' : ''}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-brass text-white hover:bg-brass-dark rounded-lg transition-all text-center shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              Check ATS Score
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
