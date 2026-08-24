import React, { useState, useEffect } from 'react';
import { History, Calendar, FileText, Trash2, Eye, RefreshCw, AlertCircle, X } from 'lucide-react';
import { getHistoryApi, getAnalysisByIdApi, deleteAnalysisApi } from '../api/client';
import CompassGauge from '../components/CompassGauge';
import KeywordTags from '../components/KeywordTags';
import SectionChecklist from '../components/SectionChecklist';
import SuggestionsList from '../components/SuggestionsList';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await getHistoryApi();
      setHistory(data || []);
    } catch (err) {
      console.error('Fetch history error:', err);
      setErrorMessage('Failed to load past analysis history.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const detail = await getAnalysisByIdApi(id);
      setSelectedAnalysis(detail);
    } catch (err) {
      console.error('Detail error:', err);
      alert('Failed to retrieve analysis details.');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this analysis record?')) return;
    try {
      await deleteAnalysisApi(id);
      setHistory(history.filter((item) => item._id !== id));
      if (selectedAnalysis && selectedAnalysis._id === id) {
        setSelectedAnalysis(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete analysis record.');
    }
  };

  const getVerdictBadgeClass = (score) => {
    if (score >= 70) return 'bg-successGreen/10 text-successGreen border-successGreen/30';
    if (score >= 40) return 'bg-brass/10 text-brass border-brass/30';
    return 'bg-alertCoral/10 text-alertCoral border-alertCoral/30';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Page Header */}
      <div className="border-b border-hairline pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-brass font-bold uppercase tracking-widest">Database Persistence</span>
            <span className="text-slateCustom">•</span>
            <span className="font-mono text-xs text-slateCustom">Past Audits</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy mt-1">
            Analysis History Logs
          </h1>
        </div>

        <button
          onClick={fetchHistory}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-xs font-semibold border border-hairline bg-white hover:bg-offwhite text-navy self-start focus:outline-none focus:ring-2 focus:ring-brass"
        >
          <RefreshCw className="w-3.5 h-3.5 text-brass" />
          Refresh History
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded border bg-alertCoral/10 border-alertCoral/30 text-alertCoral flex items-center gap-2 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-brass animate-spin mx-auto" />
          <p className="font-mono text-xs text-slateCustom">Fetching saved analysis logs from MongoDB...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="bg-white p-12 rounded card-border text-center space-y-3 shadow-xs">
          <History className="w-10 h-10 text-slateCustom/40 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-navy">No Past Analyses Found</h3>
          <p className="font-sans text-xs text-slateCustom max-w-sm mx-auto">
            You haven't run any ATS score checks yet. Analyze your resume against a target job to save results here!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item._id}
              onClick={() => handleViewDetail(item._id)}
              className="bg-white p-5 rounded card-border shadow-sm hover-lift cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              {/* Left Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-bold text-navy group-hover:text-brass transition-colors">
                    {item.targetJobTitle || 'Target Position'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slateCustom">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-brass" />
                    {item.resumeName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brass" />
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Right Score & Actions */}
              <div className="flex items-center gap-4 self-end sm:self-center">
                <div
                  className={`font-mono text-sm font-bold px-3 py-1.5 rounded border uppercase tracking-wider ${getVerdictBadgeClass(
                    item.atsScore
                  )}`}
                >
                  {item.atsScore}% • {item.verdict}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleViewDetail(item._id)}
                    className="p-2 rounded hover:bg-offwhite text-slateCustom hover:text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brass"
                    title="View full report"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item._id)}
                    className="p-2 rounded hover:bg-alertCoral/10 text-slateCustom hover:text-alertCoral transition-colors focus:outline-none focus:ring-2 focus:ring-brass"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedAnalysis && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded card-border max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 relative shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-hairline pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-brass uppercase tracking-wider">Analysis History Record</span>
                <h2 className="font-serif text-2xl font-bold text-navy">
                  {selectedAnalysis.targetJobTitle}
                </h2>
                <p className="font-mono text-xs text-slateCustom mt-0.5">
                  Resume: {selectedAnalysis.resumeName} • Saved on {new Date(selectedAnalysis.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="p-1.5 rounded hover:bg-offwhite text-slateCustom hover:text-navy focus:outline-none focus:ring-2 focus:ring-brass"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Components */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <CompassGauge
                  score={selectedAnalysis.atsScore}
                  verdict={selectedAnalysis.verdict}
                />
              </div>
              <div className="md:col-span-7">
                <SectionChecklist sections={selectedAnalysis.sectionsDetected} />
              </div>
            </div>

            <KeywordTags
              matchedKeywords={selectedAnalysis.matchedKeywords}
              missingKeywords={selectedAnalysis.missingKeywords}
            />

            <SuggestionsList suggestions={selectedAnalysis.suggestions} />

            <div className="pt-2 border-t border-hairline flex justify-end">
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="px-5 py-2 rounded font-mono text-xs font-bold uppercase tracking-wider bg-navy text-white hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-brass"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
