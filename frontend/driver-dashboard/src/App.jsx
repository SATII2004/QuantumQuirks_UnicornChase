

import {
  Activity,
  CloudRain,
  IndianRupee,
  Lock,
  MapPin,
  ShieldCheck,
  User,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-teal-500/30">
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <Zap className="text-slate-900 fill-current" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              QUANTUM<span className="text-teal-400">QUIRKS</span>
            </span>
            <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">SEED PHASE</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="hidden md:flex gap-4 text-slate-400">
              <span className="hover:text-teal-400 cursor-pointer transition-colors">Policies</span>
              <span className="hover:text-teal-400 cursor-pointer transition-colors">Claims</span>
              <span className="hover:text-teal-400 cursor-pointer transition-colors">Network</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
              <User size={18} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-1">Partner Dashboard</h2>
          <p className="text-slate-400 flex items-center gap-2">
            <MapPin size={14} className="text-teal-500" /> Hyderabad Sector V • {currentTime}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Weekly Policy Card */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={80} />
              </div>
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Active Coverage</h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400">
                  <IndianRupee size={20} />
                </div>
                <span className="text-4xl font-bold text-white">150.00</span>
              </div>
              <p className="text-sm text-slate-500">Weekly Premium • Next Due: Mar 15</p>
              <div className="mt-6 flex gap-2">
                <span className="px-3 py-1 bg-teal-500/10 text-teal-400 text-[11px] font-bold rounded-full border border-teal-500/20">AUTO-PAY ON</span>
              </div>
            </div>

            {/* Income Protection Status */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Payout Potential</h3>
              <div className="flex items-center gap-3 mb-2 text-amber-400">
                <Activity size={20} />
                <span className="text-4xl font-bold italic">DC 1,200</span>
              </div>
              <p className="text-sm text-slate-500">Estimated Income Coverage per disruption</p>
              <div className="mt-6 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full w-[85%]"></div>
              </div>
            </div>

            {/* Simulated Live Analytics Area */}
            <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-semibold">Disruption Analytics (7 Days)</h3>
                  <select className="bg-slate-800 border-none text-xs rounded-lg px-2 py-1 text-slate-300">
                    <option>Last 7 Days</option>
                  </select>
               </div>
               <div className="h-32 flex items-end gap-2 px-2">
                  {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                    <div key={i} className="flex-1 bg-slate-800 rounded-t-md hover:bg-teal-500/40 transition-all cursor-help relative group" style={{height: `${h}%`}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}mm
                      </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
               </div>
            </div>
          </div>

          {/* Right Column: AI Engine & Triggers */}
          <div className="space-y-6">
            
            {/* Parametric Monitoring Box */}
            <div className={`rounded-3xl border transition-all duration-500 p-6 ${isTriggered ? 'bg-rose-950/20 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.1)]' : 'bg-slate-900/50 border-slate-800'}`}>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black tracking-widest text-slate-400 uppercase">AI Risk Engine</span>
                <div className={`h-2 w-2 rounded-full ${isTriggered ? 'bg-rose-500 animate-ping' : 'bg-teal-500'}`}></div>
              </div>

              <div className="text-center py-4">
                <div className={`inline-flex p-5 rounded-full mb-4 transition-colors ${isTriggered ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-800 text-slate-500'}`}>
                  <CloudRain size={48} className={isTriggered ? 'animate-bounce' : ''} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{isTriggered ? 'Trigger Condition Met' : 'Atmospheric Normal'}</h4>
                <p className="text-sm text-slate-400 mb-6 px-4">
                  {isTriggered ? 'Heavy Rainfall (>5mm/hr) detected via satellite. Claim initiated.' : 'Monitoring hyper-local weather sensors for disruptions.'}
                </p>
                
                <button 
                  onClick={() => setIsTriggered(!isTriggered)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm tracking-widest transition-all ${isTriggered ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}`}>
                  {isTriggered ? 'DISMISS ALERT' : 'SIMULATE RAIN DISRUPTION'}
                </button>
              </div>
            </div>

            {/* Phase 3 Preview: Fraud & Security */}
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-3xl">
              <div className="flex items-center gap-3 text-slate-400">
                <Lock size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Fraud Guard (AI)</span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-[11px]">
                  <span>Device Fingerprint</span>
                  <span className="text-teal-400 font-mono">SECURE</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>GPS Spoof Check</span>
                  <span className="text-teal-400 font-mono">VERIFIED</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full w-full bg-teal-500/20"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;