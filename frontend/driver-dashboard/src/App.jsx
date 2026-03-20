import React, { useState, useEffect } from 'react';
import { CloudRain, ShieldCheck, Activity, MapPin, Zap, Lock, IndianRupee, AlertCircle, RefreshCw } from 'lucide-react';

function App() {
  const [policy, setPolicy] = useState({
    policyId: "PENDING",
    status: "ACTIVE_MONITORING",
    currentRainfall: 0,
    threshold: 5.0,
    payoutAmount: 0,
    triggerActive: false
  });
  const [loading, setLoading] = useState(false);

  const syncWeatherEngine = async (simulatedRain) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/insurance/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rainfall: simulatedRain })
      });
      const data = await response.json();
      setPolicy(data);
    } catch (err) {
      console.error("Connection Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-4 lg:p-8">
      <div className="max-w-7xl mx-auto border border-slate-800 bg-[#0f172a]/30 rounded-[3rem] overflow-hidden shadow-2xl">
        <nav className="border-b border-slate-800/50 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Zap className="text-teal-400 fill-teal-400/20" size={28} />
            <span className="text-2xl font-black tracking-tighter text-white">QUANTUM<span className="text-teal-500 underline decoration-teal-500/30">QUIRKS</span></span>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${policy.triggerActive ? 'bg-rose-500' : 'bg-teal-500'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{policy.status}</span>
            </div>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-8 p-8 lg:p-12 border-r border-slate-800/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Policy ID</p>
                <p className="text-2xl font-mono font-bold text-white">{policy.policyId}</p>
              </div>
              <div className="space-y-1 text-right md:text-left">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hyper-Local Coverage</p>
                <p className="text-2xl font-bold text-white flex items-center gap-2 justify-end md:justify-start">
                  <MapPin size={20} className="text-teal-500" /> HYD-SEC-V
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] mb-8">
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Risk Analysis Engine</h3>
                <Activity className="text-teal-500 animate-pulse" size={20} />
              </div>
              <div className="flex items-end gap-4 h-32">
                {[2, 4, 3, 8, 5, policy.currentRainfall * 10, 2].map((val, i) => (
                  <div key={i} className="flex-1 transition-all duration-700 rounded-t-lg bg-slate-800" 
                       style={{ height: `${Math.min(val, 100)}%`, backgroundColor: val >= 50 ? '#f43f5e' : '#14b8a633' }} />
                ))}
              </div>
              <div className="mt-6 flex justify-between text-[10px] font-black text-slate-600 uppercase">
                <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => syncWeatherEngine(1.2)} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-xs font-bold transition-all">NORMAL WEATHER</button>
              <button onClick={() => syncWeatherEngine(6.8)} className="px-8 py-4 bg-teal-500 text-slate-900 hover:bg-teal-400 rounded-2xl text-xs font-bold shadow-lg shadow-teal-500/20 transition-all">SIMULATE DISRUPTION (6.8mm)</button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/20 p-8 lg:p-12 space-y-8">
            <div className="p-8 rounded-[2rem] border border-slate-800 bg-slate-900/40 relative overflow-hidden">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 text-center">Wallet Status</h4>
              <div className="text-center">
                <div className="inline-flex items-baseline gap-1 text-5xl font-black text-white tracking-tighter mb-2">
                  <IndianRupee size={28} className="text-teal-500" />
                  {policy.payoutAmount.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500">Pending Instant Payout</p>
              </div>
              {policy.triggerActive && (
                <div className="mt-8 p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center gap-3">
                  <ShieldCheck size={20} className="text-teal-500" />
                  <span className="text-[10px] font-bold text-teal-400">VERIFIED BY AI GUARD</span>
                </div>
              )}
            </div>

            <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${policy.triggerActive ? 'bg-rose-500 border-rose-400 shadow-2xl shadow-rose-500/20' : 'bg-slate-800 border-slate-700'}`}>
              <div className="flex justify-between items-start mb-6">
                <CloudRain size={32} className={policy.triggerActive ? 'text-white' : 'text-slate-600'} />
                {loading && <RefreshCw size={16} className="animate-spin text-white" />}
              </div>
              <h5 className={`text-lg font-bold mb-2 ${policy.triggerActive ? 'text-white' : 'text-slate-400'}`}>
                {policy.triggerActive ? 'DISRUPTION PAYOUT' : 'SAFE ZONE'}
              </h5>
              <p className={`text-[11px] leading-relaxed ${policy.triggerActive ? 'text-rose-100' : 'text-slate-500'}`}>
                {policy.triggerActive ? 'Rainfall threshold exceeded. Claim processed without human intervention.' : 'Monitoring weather sensors. Your income is protected if rainfall exceeds 5mm/hr.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;