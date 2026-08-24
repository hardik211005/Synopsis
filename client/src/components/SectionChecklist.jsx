import React from 'react';
import { CheckCircle2, XCircle, FileText, UserCheck, GraduationCap, Briefcase, FolderGit2, Wrench } from 'lucide-react';

export default function SectionChecklist({ sections = {} }) {
  const sectionItems = [
    { key: 'contactInfo', label: 'Contact Details', icon: UserCheck },
    { key: 'skills', label: 'Skills & Tech Stack', icon: Wrench },
    { key: 'experience', label: 'Work Experience', icon: Briefcase },
    { key: 'projects', label: 'Projects & Work', icon: FolderGit2 },
    { key: 'education', label: 'Education', icon: GraduationCap },
  ];

  const totalPassed = sectionItems.filter(item => !!sections[item.key]).length;

  return (
    <div className="clean-card p-4 sm:p-6 rounded-2xl space-y-4 bg-white shadow-card w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brass shrink-0" />
          <h3 className="font-serif text-sm font-semibold text-navy">
            Resume Section Verification
          </h3>
        </div>
        <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-offwhite border border-hairline text-slateCustom self-start sm:self-auto">
          {totalPassed}/5 Sections Detected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {sectionItems.map((item) => {
          const isPresent = !!sections[item.key];
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className={`flex flex-col p-3 rounded-lg border transition-all ${
                isPresent
                  ? 'bg-successGreen/5 border-successGreen/30'
                  : 'bg-alertCoral/5 border-alertCoral/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isPresent ? 'text-successGreen' : 'text-alertCoral'}`} />
                {isPresent ? (
                  <CheckCircle2 className="w-4 h-4 text-successGreen shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-alertCoral shrink-0" />
                )}
              </div>
              <span className="font-sans text-xs font-semibold text-navy mb-0.5 truncate">
                {item.label}
              </span>
              <span
                className={`font-mono text-[11px] ${
                  isPresent ? 'text-successGreen font-medium' : 'text-alertCoral font-medium'
                }`}
              >
                {isPresent ? 'Passed' : 'Missing'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
