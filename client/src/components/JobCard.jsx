import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function JobCard({ job, rank }) {
  const [expanded, setExpanded] = useState(false);

  const getMatchBadgeClass = (percentage) => {
    if (percentage >= 70) return 'bg-successGreen/10 text-successGreen border-successGreen/30';
    if (percentage >= 45) return 'bg-brass/10 text-brass border-brass/30';
    return 'bg-slateCustom/10 text-slateCustom border-slateCustom/30';
  };

  return (
    <div className="bg-white rounded card-border shadow-sm p-6 relative hover-lift transition-all">
      {/* Top Header: Rank + Title + Match Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          {rank && (
            <div className="w-7 h-7 rounded bg-navy text-brass font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-brass/30">
              #{rank}
            </div>
          )}
          <div>
            <h3 className="font-serif text-lg font-bold text-navy leading-tight">
              {job.title}
            </h3>
            <p className="font-sans text-sm font-semibold text-brass mt-0.5">
              {job.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          <div
            className={`font-mono text-xs font-bold px-3 py-1 rounded border uppercase tracking-wider ${getMatchBadgeClass(
              job.matchPercentage
            )}`}
          >
            {job.matchPercentage || 0}% Match
          </div>
        </div>
      </div>

      {/* Meta Pills */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slateCustom mb-4 border-b border-hairline pb-3">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-brass" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-brass" />
          {job.jobType} • {job.experienceLevel}
        </span>
        {job.salaryRange && (
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-brass" />
            {job.salaryRange}
          </span>
        )}
      </div>

      {/* Tag Comparison */}
      <div className="space-y-2 mb-4">
        {job.matchedTags && job.matchedTags.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 text-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-slateCustom mr-1 tracking-wider">Your Matching Skills:</span>
            {job.matchedTags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 font-mono text-[11px] rounded bg-successGreen/10 text-successGreen border border-successGreen/30 flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[2.5]" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {job.missingTags && job.missingTags.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 text-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-slateCustom mr-1 tracking-wider">Skills to Add:</span>
            {job.missingTags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 font-mono text-[11px] rounded bg-alertCoral/10 text-alertCoral border border-alertCoral/30 flex items-center gap-1">
                <X className="w-3 h-3 stroke-[2.5]" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="text-xs text-navy font-sans leading-relaxed">
        <p className={expanded ? '' : 'line-clamp-3'}>
          {job.description}
        </p>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs font-mono font-semibold text-brass hover:text-brass-dark uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-brass rounded px-1 -ml-1"
      >
        {expanded ? (
          <>
            Show Less <ChevronUp className="w-3.5 h-3.5" />
          </>
        ) : (
          <>
            Read Full Job Description <ChevronDown className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}
