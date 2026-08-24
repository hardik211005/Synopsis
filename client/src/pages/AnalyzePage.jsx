import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, 
  ArrowRight, RefreshCw, Eye, FileCode2, Briefcase, Zap, 
  BarChart2, Target, Lightbulb
} from 'lucide-react';
import { uploadResumeApi, analyzeResumeApi } from '../api/client';
import CompassGauge from '../components/CompassGauge';
import KeywordTags from '../components/KeywordTags';
import SectionChecklist from '../components/SectionChecklist';
import SuggestionsList from '../components/SuggestionsList';
import ScoreBreakdownCards from '../components/ScoreBreakdownCards';

const PRESET_JDS = [
  {
    title: 'Senior Frontend Engineer (React & TypeScript)',
    description: `We are looking for a Senior Frontend Engineer to architect accessible web apps in React.js, TypeScript, and Tailwind CSS. Requirements: 4+ years React.js, ES6+, Redux, REST APIs, GraphQL, Jest, responsive web design, performance optimization, and Git.`
  },
  {
    title: 'Full Stack Web Developer (Node.js & React)',
    description: `Seeking a Full Stack Developer proficient in Node.js, Express, React, and MongoDB (MERN). Must have experience building RESTful APIs, database schema design, Docker containerization, and Git version control.`
  },
  {
    title: 'Data Analyst & Visualization Specialist',
    description: `Hiring a Data Analyst to transform business metrics into visual dashboards. Requires SQL queries, Python data analysis (Pandas, NumPy), Tableau, Power BI, data mining, and statistical modeling.`
  },
  {
    title: 'AI/ML Software Engineer',
    description: `Building LLM fine-tuning pipelines. Requires Python, PyTorch, TensorFlow, NLP tokenization, Scikit-learn, vector databases (Pinecone, ChromaDB), FastAPI, and Docker.`
  }
];

export default function AnalyzePage() {
  const navigate = useNavigate();

  // State
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  
  const [jobDescription, setJobDescription] = useState('');
  const [targetJobTitle, setTargetJobTitle] = useState('');
  
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showExtractedText, setShowExtractedText] = useState(false);

  const [viewTab, setViewTab] = useState('dashboard');

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt'].includes(ext)) {
      setErrorMessage('Please select a valid PDF or DOCX file.');
      return;
    }
    setErrorMessage('');
    setFile(selectedFile);
    setResumeData(null);
    setAnalysisResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a resume file to upload.');
      return;
    }

    try {
      setUploading(true);
      setErrorMessage('');
      const data = await uploadResumeApi(file);
      setResumeData(data);
    } catch (err) {
      console.error('Upload error:', err);
      setErrorMessage(err.response?.data?.error || 'Failed to upload and parse resume file.');
    } finally {
      setUploading(false);
    }
  };

  const applyPresetJD = (preset) => {
    setTargetJobTitle(preset.title);
    setJobDescription(preset.description);
  };

  const handleAnalyze = async () => {
    if (!resumeData || !resumeData.resumeId) {
      setErrorMessage('Please upload and parse a resume first.');
      return;
    }
    if (!jobDescription || jobDescription.trim().length < 20) {
      setErrorMessage('Please enter a target job description (at least 20 characters).');
      return;
    }

    try {
      setAnalyzing(true);
      setErrorMessage('');
      const result = await analyzeResumeApi(
        resumeData.resumeId,
        jobDescription,
        targetJobTitle || 'Target Position'
      );
      setAnalysisResult(result);

      setTimeout(() => {
        const resultsEl = document.getElementById('analysis-results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Analysis error:', err);
      setErrorMessage(err.response?.data?.error || 'An error occurred during resume analysis.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Page Header */}
      <div className="border-b border-hairline pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-brass font-bold uppercase tracking-widest">Multi-Pillar Engine</span>
            <span className="text-slateCustom">•</span>
            <span className="font-mono text-xs text-slateCustom">High-Precision ATS Tracking</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy mt-1">
            Resume & ATS Score Intelligence
          </h1>
        </div>
        
        {resumeData && (
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-hairline text-xs font-mono text-slateCustom shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-successGreen" />
            <span>Active Resume: <strong className="text-navy">{resumeData.originalName}</strong></span>
          </div>
        )}
      </div>

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl border bg-alertCoral/10 border-alertCoral/30 text-alertCoral flex items-center gap-3 text-xs font-mono">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Resume Upload */}
        <div className="clean-card p-6 rounded-2xl space-y-5 flex flex-col justify-between bg-white shadow-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-brass" />
                <h2 className="font-serif text-base font-bold text-navy">1. Upload Resume Document</h2>
              </div>
              <span className="font-mono text-[11px] text-slateCustom">PDF or DOCX (Max 10MB)</span>
            </div>

            {/* Drag & Drop Box */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[180px] ${
                file
                  ? 'border-brass bg-brass/5'
                  : 'border-hairline bg-offwhite/50 hover:border-brass/60 hover:bg-white'
              }`}
            >
              <input
                type="file"
                id="resume-file-input"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {file ? (
                <div className="space-y-2">
                  <FileText className="w-10 h-10 text-brass mx-auto" />
                  <div className="font-mono text-xs font-bold text-navy">{file.name}</div>
                  <div className="font-mono text-[11px] text-slateCustom">
                    {(file.size / 1024).toFixed(1)} KB • {file.name.split('.').pop().toUpperCase()}
                  </div>
                  <label
                    htmlFor="resume-file-input"
                    className="inline-block text-[11px] font-mono text-brass hover:underline cursor-pointer pt-1"
                  >
                    Choose a different file
                  </label>
                </div>
              ) : (
                <label htmlFor="resume-file-input" className="cursor-pointer space-y-2">
                  <UploadCloud className="w-10 h-10 text-slateCustom/60 mx-auto" />
                  <div className="font-sans text-xs font-semibold text-navy">
                    Drag & drop your resume file here, or <span className="text-brass underline">browse</span>
                  </div>
                  <div className="font-mono text-[11px] text-slateCustom">
                    Supports .pdf, .docx, and .txt files
                  </div>
                </label>
              )}
            </div>

            {/* Upload Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="flex-1 py-2.5 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider bg-navy text-white hover:bg-navy-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brass"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-brass" />
                    Parsing Resume...
                  </>
                ) : (
                  <>
                    <FileCode2 className="w-4 h-4 text-brass" />
                    Parse & Extract Text
                  </>
                )}
              </button>

              {resumeData && (
                <button
                  onClick={() => setShowExtractedText(!showExtractedText)}
                  className="py-2.5 px-3 rounded-lg font-mono text-xs border border-hairline bg-offwhite hover:bg-white text-navy flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brass"
                  title="View parsed text"
                >
                  <Eye className="w-4 h-4 text-brass" />
                  <span className="hidden sm:inline">Parsed Text</span>
                </button>
              )}
            </div>

            {/* Upload Status Card */}
            {resumeData && (
              <div className="p-3.5 rounded-lg border border-successGreen/30 bg-successGreen/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-successGreen font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Text Extracted Successfully
                  </span>
                  <span>{resumeData.wordCount} Words</span>
                </div>
                <p className="text-[11px] font-mono text-slateCustom">
                  Detected Sections: {Object.entries(resumeData.detectedSections || {})
                    .filter(([_, v]) => v)
                    .map(([k]) => k)
                    .join(', ') || 'General Text'}
                </p>
              </div>
            )}

            {/* Parsed Text Preview Drawer */}
            {showExtractedText && resumeData && (
              <div className="p-3 bg-navy text-offwhite font-mono text-[11px] rounded-lg max-h-48 overflow-y-auto space-y-1">
                <div className="text-brass font-bold uppercase border-b border-navy-light pb-1 mb-1">
                  Raw Extracted Resume Text:
                </div>
                <pre className="whitespace-pre-wrap font-mono leading-relaxed text-slate-300">
                  {resumeData.extractedText}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Job Description Input */}
        <div className="clean-card p-6 rounded-2xl space-y-4 flex flex-col justify-between bg-white shadow-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brass" />
                <h2 className="font-serif text-base font-bold text-navy">2. Target Job Description</h2>
              </div>
              <span className="font-mono text-[11px] text-slateCustom">Pasted Text</span>
            </div>

            {/* Target Job Title Input */}
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slateCustom mb-1">
                Target Job Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Engineer, Data Analyst..."
                value={targetJobTitle}
                onChange={(e) => setTargetJobTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs font-sans rounded-lg border border-hairline focus:border-brass focus:outline-none bg-offwhite/40"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-brass" />
                <span className="font-mono text-[11px] font-semibold text-slateCustom uppercase">Quick Demo Samples:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_JDS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPresetJD(preset)}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-md border border-hairline bg-offwhite hover:bg-brass hover:text-white transition-colors"
                  >
                    {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description Textarea */}
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slateCustom mb-1">
                Paste Full Job Description
              </label>
              <textarea
                rows={7}
                placeholder="Paste the complete job description, requirements, responsibilities, and skill sets here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3 text-xs font-sans rounded-lg border border-hairline focus:border-brass focus:outline-none bg-offwhite/40 leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Run Analysis Button */}
          <div className="pt-2">
            <button
              onClick={handleAnalyze}
              disabled={!resumeData || !jobDescription || analyzing}
              className="w-full py-3 px-6 rounded-lg font-mono text-xs font-bold uppercase tracking-wider bg-brass text-white hover:bg-brass-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brass"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  Analyzing Keyword Overlap & ATS Pillars...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Run Precision ATS Audit & Score
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* RESULTS DISPLAY SECTION */}
      {analysisResult && (
        <div id="analysis-results-section" className="space-y-8 pt-8 border-t border-hairline animate-fade-in-up">
          
          {/* Header & Tab Selector */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-brass font-bold uppercase tracking-widest">
                ATS Audit Report
              </span>
              <h2 className="font-serif text-2xl font-bold text-navy">
                Diagnostics & Compatibility Breakdown
              </h2>
            </div>

            {/* View Navigation Tabs */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-hairline font-mono text-xs shadow-xs">
              <button
                onClick={() => setViewTab('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  viewTab === 'dashboard' ? 'bg-navy text-white font-bold shadow-xs' : 'text-slateCustom hover:text-navy'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5 text-brass" />
                Dashboard Overview
              </button>
              <button
                onClick={() => setViewTab('keywords')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  viewTab === 'keywords' ? 'bg-navy text-white font-bold shadow-xs' : 'text-slateCustom hover:text-navy'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-brass" />
                Keyword Audit
              </button>
              <button
                onClick={() => setViewTab('suggestions')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  viewTab === 'suggestions' ? 'bg-navy text-white font-bold shadow-xs' : 'text-slateCustom hover:text-navy'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-brass" />
                Action Items
              </button>
            </div>

            {/* Link to Job Recommendations */}
            <button
              onClick={() => navigate(`/jobs?resumeId=${analysisResult.resumeId}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider bg-navy text-white hover:bg-navy-dark transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brass"
            >
              <Briefcase className="w-4 h-4 text-brass" />
              Matched Jobs
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {viewTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 flex">
                  <div className="w-full">
                    <CompassGauge
                      score={analysisResult.atsScore}
                      verdict={analysisResult.verdict}
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 flex">
                  <div className="w-full">
                    <SectionChecklist sections={analysisResult.sectionsDetected} />
                  </div>
                </div>
              </div>

              <ScoreBreakdownCards
                breakdown={analysisResult.scoreBreakdown || {}}
                impactCount={analysisResult.impactMetricsCount || 0}
              />

              <KeywordTags
                matchedKeywords={analysisResult.matchedKeywords}
                missingKeywords={analysisResult.missingKeywords}
                categorizedMatched={analysisResult.categorizedMatched || []}
                categorizedMissing={analysisResult.categorizedMissing || []}
              />
            </div>
          )}

          {/* TAB 2: KEYWORD AUDIT */}
          {viewTab === 'keywords' && (
            <div className="space-y-6">
              <KeywordTags
                matchedKeywords={analysisResult.matchedKeywords}
                missingKeywords={analysisResult.missingKeywords}
                categorizedMatched={analysisResult.categorizedMatched || []}
                categorizedMissing={analysisResult.categorizedMissing || []}
              />
            </div>
          )}

          {/* TAB 3: ACTION ITEMS */}
          {viewTab === 'suggestions' && (
            <div className="space-y-6">
              <SuggestionsList suggestions={analysisResult.suggestions} />
            </div>
          )}

        </div>
      )}
    </div>
  );
}
