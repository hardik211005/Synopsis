import React, { useState } from 'react';
import { Check, X, Copy, CheckCheck, Filter } from 'lucide-react';

export default function KeywordTags({ matchedKeywords = [], missingKeywords = [], categorizedMatched = [], categorizedMissing = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);

  const matchedItems = categorizedMatched.length > 0
    ? categorizedMatched
    : matchedKeywords.map(k => ({ word: k, category: 'Core Keyword' }));

  const missingItems = categorizedMissing.length > 0
    ? categorizedMissing
    : missingKeywords.map(k => ({ word: k, category: 'Core Keyword' }));

  const filterItems = (items) => {
    if (activeTab === 'all') return items;
    if (activeTab === 'tech') return items.filter(i => i.category === 'Technical Skill');
    if (activeTab === 'tools') return items.filter(i => i.category === 'Tools & Platforms');
    return items;
  };

  const filteredMatched = filterItems(matchedItems);
  const filteredMissing = filterItems(missingItems);

  const handleCopyMissing = () => {
    const textToCopy = missingKeywords.join(', ');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="clean-card p-6 rounded-2xl space-y-5 bg-white shadow-card">
      {/* Top Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brass" />
          <h3 className="font-serif text-base font-bold text-navy">
            Keyword Gap & Domain Skill Diagnostic
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center flex-wrap gap-1 font-mono text-[11px]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-navy text-white font-bold shadow-xs'
                : 'bg-offwhite text-slateCustom hover:text-navy'
            }`}
          >
            All Keywords ({matchedItems.length + missingItems.length})
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'tech'
                ? 'bg-navy text-white font-bold shadow-xs'
                : 'bg-offwhite text-slateCustom hover:text-navy'
            }`}
          >
            Technical Skills
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'tools'
                ? 'bg-navy text-white font-bold shadow-xs'
                : 'bg-offwhite text-slateCustom hover:text-navy'
            }`}
          >
            Tools & Platforms
          </button>
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Matched Keywords */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-successGreen/15 flex items-center justify-center text-successGreen">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-navy">
                Matched Keywords ({filteredMatched.length})
              </h4>
            </div>
          </div>

          {filteredMatched.length === 0 ? (
            <p className="text-xs text-slateCustom font-mono py-3 italic">
              No matching keywords in this category.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {filteredMatched.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-md border bg-successGreen/10 text-successGreen border-successGreen/30"
                >
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  {item.word}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Keywords */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-alertCoral/15 flex items-center justify-center text-alertCoral">
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-navy">
                Missing Keywords ({filteredMissing.length})
              </h4>
            </div>

            {missingKeywords.length > 0 && (
              <button
                onClick={handleCopyMissing}
                className="flex items-center gap-1 text-[11px] font-mono font-semibold text-brass hover:text-brass-dark uppercase transition-colors"
                title="Copy missing keywords to clipboard"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-successGreen" />
                    <span className="text-successGreen">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy List
                  </>
                )}
              </button>
            )}
          </div>

          {filteredMissing.length === 0 ? (
            <p className="text-xs text-successGreen font-mono font-semibold py-3">
              🎉 Outstanding! Your resume covers all key job requirements!
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {filteredMissing.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-md border bg-alertCoral/10 text-alertCoral border-alertCoral/30"
                >
                  <X className="w-3 h-3 stroke-[2.5]" />
                  {item.word}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
