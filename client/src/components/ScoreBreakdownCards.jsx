import React from 'react';
import { Target, Layers, TrendingUp, CheckSquare } from 'lucide-react';

export default function ScoreBreakdownCards({ breakdown = {}, impactCount = 0 }) {
  const pillars = [
    {
      title: 'Keyword Overlap',
      weight: '50% Weight',
      score: breakdown.keywordMatchScore || 0,
      icon: Target,
      desc: 'Match ratio of technical skills, frameworks, and job-specific phrases.',
    },
    {
      title: 'Section Structure',
      weight: '20% Weight',
      score: breakdown.sectionScore || 0,
      icon: Layers,
      desc: 'Presence of standard ATS headings (Skills, Experience, Projects, Contact).',
    },
    {
      title: 'Measurable Impact',
      weight: '15% Weight',
      score: breakdown.impactMetricScore || 0,
      icon: TrendingUp,
      desc: `${impactCount} quantifiable metrics detected (percentages %, dollars $, and metric data).`,
    },
    {
      title: 'Formatting & Verbs',
      weight: '15% Weight',
      score: breakdown.formattingScore || 0,
      icon: CheckSquare,
      desc: 'Document length optimization and strong action verb density.',
    },
  ];

  const getBarColor = (score) => {
    if (score >= 75) return 'bg-successGreen';
    if (score >= 45) return 'bg-brass';
    return 'bg-alertCoral';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {pillars.map((pillar, idx) => {
        const Icon = pillar.icon;
        return (
          <div
            key={idx}
            className="clean-card clean-card-hover p-5 rounded-xl flex flex-col justify-between space-y-3 bg-white"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center text-brass">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-slateCustom px-2.5 py-0.5 rounded-md bg-offwhite border border-hairline">
                  {pillar.weight}
                </span>
              </div>

              <h4 className="font-serif text-sm font-bold text-navy">
                {pillar.title}
              </h4>
              <p className="font-sans text-[11px] text-slateCustom leading-relaxed mt-1">
                {pillar.desc}
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-hairline">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slateCustom">Rating</span>
                <span className="font-bold text-navy">{pillar.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-offwhite rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${getBarColor(pillar.score)}`}
                  style={{ width: `${pillar.score}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
