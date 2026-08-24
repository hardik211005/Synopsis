import React from 'react';
import { Compass, CheckCircle2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070A10] text-slate-400 mt-20 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-wide">
                Career Compass
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              College Minor Project — AI-powered ATS score analyzer, keyword overlap engine, and semantic job matching platform.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              NLP Engine Spec
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Tokenization & N-Gram Phrase Matching
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Cosine Similarity Vector Job Ranking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Regex Section Completeness Verification
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Tech Stack Architecture
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">React 18</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">Vite</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">Node.js</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">Express</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">MongoDB</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">pdf-parse</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">mammoth</span>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Career Compass. Academic Minor Project Demo.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1 text-slate-400">
            Crafted for Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
