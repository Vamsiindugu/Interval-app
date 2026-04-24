import React, { useState } from 'react';
import { Clock, Plus, Minus, ArrowRightLeft, Settings2, Equal, ChevronRight } from 'lucide-react';

/**
 * =========================================
 * 1. CORE DOMAIN LOGIC (Optimized)
 * =========================================
 */
const SECONDS_IN_DAY = 86400;

const toSeconds = ({ h, m, s }) => 
  (Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0);

const toTimeString = (totalSeconds) => {
  const norm = ((totalSeconds % SECONDS_IN_DAY) + SECONDS_IN_DAY) % SECONDS_IN_DAY;
  const pad = (n) => String(Math.floor(n)).padStart(2, '0');
  return `${pad(norm / 3600)}:${pad((norm % 3600) / 60)}:${pad(norm % 60)}`;
};

/**
 * =========================================
 * 2. EXTENSIBILITY: FUNCTION REGISTRY
 * =========================================
 */
const OPERATIONS = {
  add: { id: 'add', name: 'Add', icon: Plus, type: 'time', execute: (a, b) => a + b },
  subtract: { id: 'subtract', name: 'Subtract', icon: Minus, type: 'time', execute: (a, b) => a - b },
  difference: { id: 'difference', name: 'Difference', icon: ArrowRightLeft, type: 'time', execute: (a, b) => Math.abs(a - b) },
  normalize: { id: 'normalize', name: 'Normalize', icon: Settings2, type: 'time', execute: (a) => a },
  compare: { 
    id: 'compare', name: 'Compare', icon: Equal, type: 'text', 
    execute: (a, b) => a === b ? "Intervals are Equal" : (a > b ? "Interval A is Larger" : "Interval B is Larger") 
  }
};

/**
 * =========================================
 * 3. UI COMPONENTS (Refactored & DRY)
 * =========================================
 */
const TimeInputGroup = ({ label, time, onChange }) => (
  <div className="flex flex-col p-6 bg-slate-900/50 rounded-2xl border border-slate-800/80 shadow-sm transition-all hover:border-slate-700">
    <label className="text-sm font-semibold text-slate-300 mb-5 flex items-center gap-2">
      <Clock className="w-4 h-4 text-emerald-500" />
      {label}
    </label>
    
    <div className="flex items-center justify-center gap-3">
      {['h', 'm', 's'].map((unit, idx) => (
        <React.Fragment key={unit}>
          <div className="flex flex-col relative group w-20">
            <input 
              type="number" min="0" max="999" value={time[unit]} 
              onChange={(e) => onChange({ ...time, [unit]: e.target.value ? parseInt(e.target.value, 10) : '' })}
              className="w-full h-14 text-center text-xl font-mono bg-slate-950 border border-slate-700/50 rounded-xl focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-slate-100 placeholder-slate-700 hover:border-slate-600"
              placeholder="00" 
            />
            <span className="text-[10px] text-center mt-2 text-slate-500 font-bold tracking-widest uppercase">
              {unit === 'h' ? 'Hours' : unit === 'm' ? 'Mins' : 'Secs'}
            </span>
          </div>
          {idx < 2 && <span className="text-xl font-bold text-slate-700 pb-6">:</span>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

/**
 * =========================================
 * 4. MAIN APP COMPONENT
 * =========================================
 */
export default function App() {
  const [timeA, setTimeA] = useState({ h: '', m: '', s: '' });
  const [timeB, setTimeB] = useState({ h: '', m: '', s: '' });
  const [opId, setOpId] = useState('add');
  const [result, setResult] = useState(null);

  const handleCompute = () => {
    const aSecs = toSeconds(timeA);
    const bSecs = toSeconds(timeB);
    const strategy = OPERATIONS[opId];
    
    const rawResult = strategy.execute(aSecs, bSecs);

    if (strategy.type === 'text') {
      setResult({ type: 'text', data: rawResult });
      return;
    }

    const baseDisplay = toTimeString(rawResult);
    const projections = [];
    let currentTotal = rawResult;
    
    for (let i = 0; i < 5; i++) {
      currentTotal += bSecs;
      projections.push(toTimeString(currentTotal));
    }

    setResult({ type: 'time', base: baseDisplay, projections });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8 flex items-center justify-center font-sans selection:bg-emerald-500/30">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* Sleek Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-slate-900 border border-slate-800 rounded-2xl mb-2 shadow-sm">
            <Settings2 className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Interval Engine Pro</h1>
          <p className="text-slate-500 text-sm font-medium">Precision 24-hour sequence generation</p>
        </div>

        {/* Main Interface Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 sm:p-8 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <TimeInputGroup label="Interval A" time={timeA} onChange={setTimeA} />
            <TimeInputGroup label="Interval B" time={timeB} onChange={setTimeB} />
          </div>

          <div className="mb-8">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">
              Operation Strategy
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Object.values(OPERATIONS).map((op) => {
                const Icon = op.icon;
                const isSelected = opId === op.id;
                return (
                  <button key={op.id} onClick={() => { setOpId(op.id); handleCompute(); }}
                    className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all duration-200 ${
                      isSelected 
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-sm' 
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}>
                    <Icon className="w-5 h-5 mb-2" />
                    <span className="text-[11px] font-bold tracking-wide">{op.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={handleCompute} 
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl transition-colors focus:ring-4 focus:ring-emerald-500/20 active:scale-[0.98] text-sm uppercase tracking-widest flex items-center justify-center gap-2">
            Calculate Sequence <ChevronRight className="w-4 h-4" />
          </button>

          {/* Results Area */}
          {result && (
            <div className="mt-8 pt-8 border-t border-slate-800/80 animate-in slide-in-from-bottom-4 fade-in duration-500">
              {result.type === 'text' ? (
                 <div className="text-center font-mono text-lg text-emerald-400 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
                   {result.data}
                 </div>
               ) : (
                <div className="space-y-8">
                  {/* Base Result */}
                  <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">Resultant Output</span>
                    <div className="text-6xl sm:text-7xl font-mono font-light tracking-tight text-slate-100">
                      {result.base}
                    </div>
                  </div>

                  {/* 5 Projections */}
                  <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4">
                      Sequential Sequence (+ Interval B)
                    </span>
                    <div className="grid gap-2">
                      {result.projections.map((projTime, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 sm:px-4 bg-slate-900 border border-slate-800 rounded-lg group hover:border-slate-700 transition-colors">
                          <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400">Output {idx + 1}</span>
                          <span className="font-mono text-lg text-slate-300 group-hover:text-slate-100 transition-colors">{projTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}