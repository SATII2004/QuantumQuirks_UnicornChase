import React, { useState, useEffect } from 'react';
import { 
  CloudRain, ShieldCheck, Zap, AlertTriangle, Thermometer, Wind, 
  Wallet, ArrowUpRight, Activity, Cpu, Radio, RefreshCw 
} from 'lucide-react';

function App() {
  const [riskData, setRiskData] = useState({
    activePeril: "NONE",
    payoutStatus: "MONITORING_SYSTEMS",
    metrics: { rain: 0.5, temp: 32, aqi: 45 },
    walletBalance: 12450.00,
    payoutAmount: 0
  });
  const [loading, setLoading] = useState(false);

  const triggerEngine = async (perilType) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/insurance/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: perilType })
      });
      const data = await response.json();
      setRiskData(data);
    } catch (err) {
      console.error("Connection Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-4 lg:p-8 relative overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />

      <nav className="max-w-7xl mx-auto mb-8 flex justify-between items-center bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-[2rem]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500 rounded-xl shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="text-slate-900" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">GATI<span className="text-cyan-400">KAVACH</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <Radio size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Oracle Live</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard icon={<CloudRain />} label="Precipitation" value={`${riskData.metrics.rain}mm`} color="text-blue-400" />
            <MetricCard icon={<Thermometer />} label="Heat Index" value={`${riskData.metrics.temp}°C`} color="text-orange-400" />
            <MetricCard icon={<Wind />} label="Air Quality" value={`${riskData.metrics.aqi} AQI`} color="text-emerald-400" />
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-md relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Activity size={20} className="text-cyan-500" /> Simulation Command Center
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TriggerBtn onClick={() => triggerEngine('RAIN')} icon={<CloudRain />} label="Heavy Rain (5mm+)" color="hover:border-blue-500/50" />
                <TriggerBtn onClick={() => triggerEngine('HEAT')} icon={<Thermometer />} label="Extreme Heat (45°C+)" color="hover:border-orange-500/50" />
                <TriggerBtn onClick={() => triggerEngine('AQI')} icon={<Wind />} label="Severe Pollution" color="hover:border-emerald-500/50" />
                <TriggerBtn onClick={() => triggerEngine('RESET')} icon={<RefreshCw />} label="Reset Sensors" color="hover:border-slate-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 p-8 rounded-[3rem] shadow-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 text-center">Available Liquidity</p>
            <div className="text-center mb-6">
              <span className="text-5xl font-black text-white italic tracking-tighter">DC {riskData.walletBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20">
                <ArrowUpRight size={14} /> +DC {riskData.payoutAmount} PENDING
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-[3rem] border transition-all duration-700 ${riskData.activePeril !== "NONE" ? 'bg-rose-500/10 border-rose-500' : 'bg-slate-900/40 border-slate-800'}`}>
            <div className="flex justify-between items-center mb-6">
              <div className={`p-4 rounded-2xl ${riskData.activePeril !== "NONE" ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                {riskData.activePeril !== "NONE" ? <Zap className="animate-pulse" /> : <Cpu />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Policy Engine</span>
            </div>
            <h3 className={`text-lg font-bold mb-2 uppercase tracking-tight ${riskData.activePeril !== "NONE" ? 'text-white' : 'text-slate-300'}`}>
              {riskData.payoutStatus}
            </h3>
            <p className="text-[11px] leading-relaxed text-slate-500">
              {riskData.activePeril !== "NONE" 
                ? `The GatiKavach Smart Contract has verified the ${riskData.activePeril} disruption. Payout initiated.` 
                : "Active monitoring of hyper-local climate nodes. Your income is currently protected."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const MetricCard = ({ icon, label, value, color }) => (
  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2.5rem] hover:bg-slate-800/40 transition-all">
    <div className={`mb-4 ${color}`}>{icon}</div>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

const TriggerBtn = ({ onClick, icon, label, color }) => (
  <button onClick={onClick} className={`flex items-center gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/20 text-left transition-all active:scale-95 group ${color}`}>
    <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">{icon}</div>
    <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">{label}</span>
  </button>
);

export default App;