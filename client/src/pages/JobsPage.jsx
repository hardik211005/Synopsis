import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Briefcase, Sparkles, AlertCircle, RefreshCw, Search, CheckCircle2 } from 'lucide-react';
import { getJobRecommendationsApi, getAllJobsApi } from '../api/client';
import JobCard from '../components/JobCard';

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('resumeId');

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [resumeId]);

  const fetchJobs = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      if (resumeId) {
        const res = await getJobRecommendationsApi(resumeId);
        setJobs(res.recommendations || []);
        setResumeInfo({
          resumeId: res.resumeId,
          resumeName: res.resumeName,
          totalEvaluated: res.totalJobsEvaluated,
        });
      } else {
        const allJobs = await getAllJobsApi();
        setJobs(allJobs || []);
      }
    } catch (err) {
      console.error('Fetch jobs error:', err);
      setErrorMessage('Failed to load job recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      (job.tags && job.tags.some(t => t.toLowerCase().includes(term)))
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Page Header */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-brass font-bold uppercase tracking-widest">Matching Engine</span>
            <span className="text-slateCustom">•</span>
            <span className="font-mono text-xs text-slateCustom">Cosine Vector Similarity</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy mt-1">
            Recommended Job Postings
          </h1>
        </div>

        {resumeInfo ? (
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-hairline text-xs font-mono text-slateCustom shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-successGreen" />
            <span>Ranked for: <strong className="text-navy">{resumeInfo.resumeName}</strong></span>
          </div>
        ) : (
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-brass text-white hover:bg-brass-dark rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brass"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Analyze Resume to See Match Scores
          </Link>
        )}
      </div>

      {/* Info Notice when viewing without resume */}
      {!resumeId && (
        <div className="p-4 rounded-xl border border-hairline bg-navy text-offwhite flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brass/20 text-brass flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">Viewing General Job Catalog</h4>
              <p className="font-sans text-xs text-slate-300">
                Upload your resume in the analyzer to get personalized percentage match scores for each job posting!
              </p>
            </div>
          </div>
          <Link
            to="/analyze"
            className="shrink-0 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-brass text-navy hover:bg-brass-light rounded-lg transition-colors text-center"
          >
            Analyze Resume
          </Link>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slateCustom absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Filter jobs by title, company, or skill tag (e.g. React, Python, Node.js)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs font-sans rounded-lg border border-hairline focus:border-brass focus:outline-none bg-white shadow-xs"
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-xl border bg-alertCoral/10 border-alertCoral/30 text-alertCoral flex items-center gap-2 text-xs font-mono">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-brass animate-spin mx-auto" />
          <p className="font-mono text-xs text-slateCustom">Calculating cosine similarity vector match scores...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="clean-card p-12 rounded-2xl text-center space-y-3 bg-white shadow-card">
          <Briefcase className="w-10 h-10 text-slateCustom/40 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-navy">No Job Postings Found</h3>
          <p className="font-sans text-xs text-slateCustom max-w-sm mx-auto">
            {searchTerm ? 'No job postings match your search filter.' : 'No job postings exist in the database.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slateCustom">
            <span>Showing Top {filteredJobs.length} Job Matches</span>
            {resumeId && <span>Ranked by Cosine Keyword Overlap</span>}
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job, idx) => (
              <JobCard
                key={job._id || idx}
                job={job}
                rank={resumeId ? idx + 1 : null}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
