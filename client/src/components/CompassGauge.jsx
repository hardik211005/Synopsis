import React from 'react';

/**
 * Custom SVG Compass & Gauge Dial Component - Fully Responsive Light Mode
 */
export default function CompassGauge({ score = 0, verdict = 'Needs work' }) {
  const normalizedScore = Math.min(100, Math.max(0, Number(score) || 0));
  const needleAngle = -90 + (normalizedScore / 100) * 180;

  let verdictColorClass = 'bg-alertCoral/10 text-alertCoral border-alertCoral/30';
  if (normalizedScore >= 75) {
    verdictColorClass = 'bg-successGreen/10 text-successGreen border-successGreen/30';
  } else if (normalizedScore >= 45) {
    verdictColorClass = 'bg-brass/10 text-brass border-brass/30';
  }

  // Generate tick marks (11 major ticks from 0 to 100)
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const val = i * 10;
    const angleRad = ((-180 + i * 18) * Math.PI) / 180;
    const x1 = 150 + 106 * Math.cos(angleRad);
    const y1 = 140 + 106 * Math.sin(angleRad);
    const isMajor = i % 2 === 0;
    const tickLen = isMajor ? 12 : 6;
    const x2 = 150 + (106 - tickLen) * Math.cos(angleRad);
    const y2 = 140 + (106 - tickLen) * Math.sin(angleRad);
    const lx = 150 + 82 * Math.cos(angleRad);
    const ly = 140 + 82 * Math.sin(angleRad);

    ticks.push(
      <g key={i}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isMajor ? '#0F172A' : '#64748B'}
          strokeWidth={isMajor ? 2.5 : 1}
          opacity={isMajor ? 0.8 : 0.4}
        />
        {isMajor && (
          <text
            x={lx}
            y={ly + 4}
            textAnchor="middle"
            fontSize="9"
            fontFamily="JetBrains Mono"
            fill="#64748B"
            fontWeight="600"
          >
            {val}
          </text>
        )}
      </g>
    );
  }

  return (
    <div className="clean-card p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden bg-white shadow-card w-full">
      {/* Header Badge */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-slateCustom mb-2">
        <span className="uppercase tracking-widest text-[10px] text-brass font-bold">Compass Dial</span>
        <span className="text-[10px] text-slateCustom font-semibold hidden sm:inline">100% Calibrated</span>
      </div>

      <div className="relative w-full max-w-[280px] aspect-[300/175]">
        <svg viewBox="0 0 300 170" className="w-full h-full">
          <defs>
            <filter id="needleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C08A2E" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Background Outer Arc Track */}
          <path
            d="M 30 140 A 120 120 0 0 1 270 140"
            fill="none"
            stroke="#EEF0F4"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Zone 1: Needs Work (<45%) */}
          <path
            d="M 30 140 A 120 120 0 0 1 111 46"
            fill="none"
            stroke="#DC2626"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Zone 2: Moderate Match (45-75%) */}
          <path
            d="M 111 46 A 120 120 0 0 1 230 73"
            fill="none"
            stroke="#C08A2E"
            strokeWidth="12"
            opacity="0.85"
          />

          {/* Zone 3: Strong Match (75-100%) */}
          <path
            d="M 230 73 A 120 120 0 0 1 270 140"
            fill="none"
            stroke="#059669"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Ticks */}
          {ticks}

          {/* Center Hub */}
          <circle cx="150" cy="140" r="14" fill="#0F172A" />
          <circle cx="150" cy="140" r="7" fill="#C08A2E" />

          {/* Rotating Needle */}
          <g
            transform={`rotate(${needleAngle}, 150, 140)`}
            style={{ transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            filter="url(#needleGlow)"
          >
            <polygon points="150,140 144,136 150,28 156,136" fill="#C08A2E" />
            <polygon points="150,28 146,38 154,38" fill="#0F172A" />
            <circle cx="150" cy="140" r="3" fill="#EEF0F4" />
          </g>

          {/* Cardinal Directions */}
          <text x="150" y="20" textAnchor="middle" fontSize="10" fontFamily="Fraunces" fill="#0F172A" fontWeight="700">N</text>
          <text x="284" y="143" textAnchor="middle" fontSize="9" fontFamily="Fraunces" fill="#64748B">E</text>
          <text x="16" y="143" textAnchor="middle" fontSize="9" fontFamily="Fraunces" fill="#64748B">W</text>
        </svg>
      </div>

      {/* Score Reading & Verdict */}
      <div className="flex flex-col items-center mt-2 z-10">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">{normalizedScore}%</span>
          <span className="text-[10px] sm:text-xs font-mono text-slateCustom uppercase tracking-wider">ATS Score</span>
        </div>

        <div className={`mt-2 px-3.5 py-1 text-xs font-mono font-bold rounded-md border uppercase tracking-wider ${verdictColorClass}`}>
          {verdict}
        </div>
      </div>
    </div>
  );
}
