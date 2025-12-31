
import React from 'react';
import { Info, ShieldCheck, Zap } from 'lucide-react';
import { VStep } from '../types';
import { getIcon } from '../constants';

interface StepCardProps {
  step: VStep;
  activeId: number | null;
  onHover: (id: number | null) => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, activeId, onHover }) => {
  const isActive = activeId === step.id;

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-500 transform ${isActive ? 'scale-105 z-40' : 'hover:scale-102 z-10'}`}
      onMouseEnter={() => onHover(step.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={`flex items-start p-3 md:p-5 rounded-2xl border-2 shadow-xl backdrop-blur-md transition-all duration-300 ${isActive ? 'bg-white border-indigo-400 shadow-indigo-200/50' : 'bg-white/80 border-slate-100 shadow-slate-200/50'}`}>
        <div className={`p-3 rounded-xl text-white shadow-lg transition-transform duration-500 flex-shrink-0 ${step.color} ${isActive ? 'rotate-12 scale-110' : ''}`}>
          {getIcon(step.id)}
        </div>
        <div className="ml-4 flex-grow">
          <h3 className={`font-bold text-slate-800 text-sm md:text-lg transition-colors leading-tight mb-1 ${isActive ? 'text-indigo-600' : ''}`}>
            {step.title}
          </h3>
          <p className="text-[11px] md:text-sm text-slate-500 leading-normal">
            {step.description}
          </p>
        </div>
      </div>

      {isActive && (
        <div className="absolute top-[110%] left-0 w-[300px] md:w-[500px] bg-slate-900/95 backdrop-blur-xl text-white p-6 rounded-3xl shadow-2xl z-50 border border-slate-700/50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center mb-4 pb-2 border-b border-slate-700/50">
            <Info className="w-5 h-5 mr-3 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">步驟詳情與案例應用</span>
          </div>
          <div className="space-y-4">
            {step.cases.map((cs, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border transition-all ${idx === 0 ? 'bg-indigo-950/40 border-indigo-800/40' : 'bg-emerald-950/40 border-emerald-800/40'}`}
              >
                <div className="flex items-center mb-2">
                  {idx === 0 ? <ShieldCheck className="w-4 h-4 mr-2 text-indigo-400" /> : <Zap className="w-4 h-4 mr-2 text-emerald-400" />}
                  <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${idx === 0 ? 'text-indigo-400' : 'text-emerald-400'}`}>
                    {cs.label}
                  </p>
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-slate-200 font-medium italic">
                  "{cs.description}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;
