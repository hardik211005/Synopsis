import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, UploadCloud, Target, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Cpu, BarChart3, FileCode2, Zap, Layers 
} from 'lucide-react';
import CompassGauge from '../components/CompassGauge';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy text-white py-16 px-6 sm:px-12 rounded-2xl border border-navy-light shadow-xl">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-brass/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brass/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Badge */}
          <div className="animate-fade-in-up stagger-1 inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brass/15 border border-brass/30 text-brass text-xs font-mono font-semibold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            AI & NLP Powered Applicant Tracking System Engine
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up stagger-2 font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Navigate the Job Market with <span className="text-brass">Precision ATS Intelligence</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-in-up stagger-3 font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Career Compass analyzes your resume against target job descriptions using transparent natural language processing. Uncover missing keywords, verify ATS section formatting, and view top job recommendations.
          </p>

          {/* Buttons */}
          <div className="animate-fade-in-up stagger-4 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/analyze"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider bg-brass text-navy hover:bg-brass-light rounded-lg transition-all shadow-lg hover:shadow-brass/25 focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2"
            >
              <span>Analyze Your Resume Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider bg-navy-light/60 text-offwhite hover:bg-brass/20 hover:border-brass/40 border border-slate-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2"
            >
              Browse Sample Jobs
            </Link>
          </div>

          {/* Quick Metrics Bar with dividers and icons */}
          <div className="pt-10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-navy-light/60 text-center relative">
            <div className="space-y-1.5 p-2">
              <Cpu className="w-4 h-4 text-brass mx-auto" />
              <div className="font-mono text-2xl font-bold text-brass">100%</div>
              <div className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Local & Transparent</div>
            </div>

            <div className="space-y-1.5 p-2 md:border-l md:border-navy-light/60">
              <FileCode2 className="w-4 h-4 text-brass mx-auto" />
              <div className="font-mono text-2xl font-bold text-white">PDF & DOCX</div>
              <div className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Multi-Format Parser</div>
            </div>

            <div className="space-y-1.5 p-2 md:border-l md:border-navy-light/60">
              <BarChart3 className="w-4 h-4 text-brass mx-auto" />
              <div className="font-mono text-2xl font-bold text-brass">Cosine Match</div>
              <div className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Vector Job Ranking</div>
            </div>

            <div className="space-y-1.5 p-2 md:border-l md:border-navy-light/60">
              <Zap className="w-4 h-4 text-brass mx-auto" />
              <div className="font-mono text-2xl font-bold text-white">0 Setup</div>
              <div className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Instant Demo Ready</div>
            </div>
          </div>

        </div>
      </section>

      {/* Signature Component Preview & Value Prop */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs font-bold text-brass uppercase tracking-widest">
              Signature Visualizer
            </span>
            <h2 className="font-serif text-3xl font-bold text-navy">
              The ATS Compass Gauge Dial
            </h2>
            <p className="font-sans text-sm text-slateCustom leading-relaxed">
              Generic ATS tools display static donut charts. Career Compass uses a custom SVG semicircular gauge dial with calibrated tick marks, color-coded compatibility arcs, and a smooth brass needle that reflects your true score verdict.
            </p>
            <ul className="space-y-2.5 font-mono text-xs text-navy pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-alertCoral shrink-0" />
                <span>Needs Work (&lt;45%): Critical gaps identified</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brass shrink-0" />
                <span>Moderate Match (45-75%): Moderate alignment</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-successGreen shrink-0" />
                <span>Strong Match (75%+): High ATS pass probability</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md">
              <CompassGauge score={85} verdict="Strong match" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Step Flow */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <span className="font-mono text-xs font-bold text-brass uppercase tracking-widest">
            Simple 3-Step Process
          </span>
          <h2 className="font-serif text-3xl font-bold text-navy">
            How Career Compass Works
          </h2>
          <p className="font-sans text-sm text-slateCustom max-w-xl mx-auto">
            From raw resume document to tailored ATS recommendations in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="clean-card clean-card-hover p-6 rounded-2xl flex flex-col relative space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy text-brass flex items-center justify-center font-mono font-bold text-sm border border-brass/30">
              01
            </div>
            <UploadCloud className="w-6 h-6 text-brass" />
            <h3 className="font-serif text-lg font-bold text-navy">
              1. Upload Resume
            </h3>
            <p className="font-sans text-xs text-slateCustom leading-relaxed">
              Drag & drop your PDF or DOCX resume. The backend server extracts raw text using <code className="font-mono text-navy font-semibold">pdf-parse</code> and <code className="font-mono text-navy font-semibold">mammoth</code>.
            </p>
          </div>

          {/* Step 2 */}
          <div className="clean-card clean-card-hover p-6 rounded-2xl flex flex-col relative space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy text-brass flex items-center justify-center font-mono font-bold text-sm border border-brass/30">
              02
            </div>
            <Target className="w-6 h-6 text-brass" />
            <h3 className="font-serif text-lg font-bold text-navy">
              2. Paste Job Description
            </h3>
            <p className="font-sans text-xs text-slateCustom leading-relaxed">
              Paste the target job description. The NLP engine tokenizes terms, strips stopwords, and extracts frequency-ranked keywords.
            </p>
          </div>

          {/* Step 3 */}
          <div className="clean-card clean-card-hover p-6 rounded-2xl flex flex-col relative space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy text-brass flex items-center justify-center font-mono font-bold text-sm border border-brass/30">
              03
            </div>
            <BarChart3 className="w-6 h-6 text-brass" />
            <h3 className="font-serif text-lg font-bold text-navy">
              3. View Score & Jobs
            </h3>
            <p className="font-sans text-xs text-slateCustom leading-relaxed">
              Get an instant ATS score on the compass dial, review keyword gaps, check section formatting, and see top matching jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="clean-card p-8 rounded-2xl max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brass/10 text-brass flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base font-bold text-navy">Explainable Local NLP</h4>
            <p className="font-sans text-xs text-slateCustom leading-relaxed">
              Built specifically for academic evaluation. Uses deterministic, explainable tokenization and TF-IDF overlap rather than unexplainable black-box prompts.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brass/10 text-brass flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base font-bold text-navy">Section Verification</h4>
            <p className="font-sans text-xs text-slateCustom leading-relaxed">
              Ensures essential ATS headings (Contact Info, Skills, Experience, Projects, Education) are present and properly formatted for automated parsers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brass/10 text-brass flex items-center justify-center mb-3">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base font-bold text-navy">Cosine Recommendation</h4>
            <p className="font-sans text-xs text-slateCustom leading-relaxed">
              Ranks seeded job postings using vector similarity to help candidates discover roles that align with their existing qualifications.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy text-white p-10 rounded-2xl text-center max-w-4xl mx-auto space-y-4 shadow-xl">
        <h3 className="font-serif text-2xl font-bold">
          Ready to Check Your Resume's ATS Score?
        </h3>
        <p className="font-sans text-xs text-slate-300 max-w-lg mx-auto">
          No sign-up required for MVP. Upload your resume and get detailed keyword gap analysis right now.
        </p>
        <div>
          <Link
            to="/analyze"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider bg-brass text-navy hover:bg-brass-light rounded-lg transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2"
          >
            <span>Launch Analyzer Tool</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
