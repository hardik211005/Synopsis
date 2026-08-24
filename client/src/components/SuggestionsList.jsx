import React from 'react';
import { Lightbulb, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

export default function SuggestionsList({ suggestions = [] }) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="clean-card p-6 rounded-2xl text-center shadow-card bg-white space-y-2">
        <Sparkles className="w-8 h-8 text-brass mx-auto mb-2" />
        <h4 className="font-serif text-sm font-semibold text-navy">No Critical Improvements Needed</h4>
        <p className="text-xs text-slateCustom font-mono">Your resume matches the target job post exceptionally well.</p>
      </div>
    );
  }

  const getTypeBadge = (type) => {
    switch (type) {
      case 'critical':
        return {
          icon: AlertCircle,
          bg: 'bg-alertCoral/10 text-alertCoral border-alertCoral/30',
          label: 'Critical',
        };
      case 'tip':
        return {
          icon: Sparkles,
          bg: 'bg-brass/10 text-brass border-brass/30',
          label: 'Pro Tip',
        };
      case 'warning':
      default:
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
          label: 'Action Item',
        };
    }
  };

  return (
    <div className="clean-card p-6 rounded-2xl space-y-4 bg-white shadow-card">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-hairline">
        <Lightbulb className="w-5 h-5 text-brass" />
        <h3 className="font-serif text-sm font-semibold text-navy">
          AI & NLP Improvement Suggestions ({suggestions.length})
        </h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((item, index) => {
          const badge = getTypeBadge(item.type);
          const Icon = badge.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-3.5 p-4 rounded-xl border border-hairline bg-offwhite/50 hover:bg-white transition-colors"
            >
              <div className={`mt-0.5 p-1 rounded-md border ${badge.bg}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                    {badge.label}
                  </span>
                  <span className="font-mono text-xs text-slateCustom font-semibold">
                    {item.category || 'General'}
                  </span>
                </div>
                <p className="font-sans text-xs text-navy leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
