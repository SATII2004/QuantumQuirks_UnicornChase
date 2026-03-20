import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CloudRain,
  Cpu, Radio, RefreshCw,
  Thermometer,
  Wallet,
  Wind,
  Zap
} from 'lucide-react';
import { useState } from 'react';

function App() {
  const [riskData, setRiskData] = useState({
    activePeril: "NONE",
    payoutStatus: "MONITORING",
    metrics: { rain: 0.5, temp: 32, aqi: 45 },
    walletBalance: 12450.00,
    payoutAmount: 0
  });

  const triggerEngine = async (perilType) => {
    // Simulated Backend Sync
    const response = await fetch('http://localhost:8080/api/v1/insurance/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: perilType })
    });
    const data = await response.json();
    setRiskData(data);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* GLOW BACKGROUND EFFECT */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <nav className="border-b border-slate-800/50 bg-[#020617]/60 backdrop-blur-xl sticky top-0 z-50 px-8 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white italic">QUANTUM<span className="text-cyan-400">QUIRKS</span>.AI</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full">
            <Radio size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Node: HYD-01</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">SK</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: LIVE METRICS */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard icon={<CloudRain />} label="Precipitation" value={`${riskData.metrics.rain}mm`} color="text-blue-400" />
            <MetricCard icon={<Thermometer />} label="Heat Index" value={`${riskData.metrics.temp}°C`} color="text-orange-400" />
            <MetricCard icon={<Wind />} label="Air Quality" value={`${riskData.metrics.aqi} AQI`} color="text-emerald-400" />
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-md">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 italic tracking-tight">Parametric Simulation Lab</h2>
                <p className="text-sm text-slate-500 font-medium">Test multi-peril triggers for instant partner protection</p>
              </div>
              <Activity className="text-cyan-500/50" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TriggerBtn onClick={() => triggerEngine('RAIN')} icon={<CloudRain />} label="Heavy Rain (5mm+)" color="hover:bg-blue-500/20 hover:border-blue-500/50" />
              <TriggerBtn onClick={() => triggerEngine('HEAT')} icon={<Thermometer />} label="Extreme Heat (45°C+)" color="hover:bg-orange-500/20 hover:border-orange-500/50" />
              <TriggerBtn onClick={() => triggerEngine('AQI')} icon={<Wind />} label="Severe Pollution" color="hover:bg-emerald-500/20 hover:border-emerald-500/50" />
              <TriggerBtn onClick={() => triggerEngine('RESET')} icon={<RefreshCw />} label="Reset Engine" color="hover:bg-slate-800" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WALLET & ENGINE STATUS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Wallet size={120} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Partner Wallet</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-black text-white italic tracking-tighter">DC {riskData.walletBalance.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold bg-cyan-400/10 w-fit px-3 py-1 rounded-lg">
              <ArrowUpRight size={14} /> +DC {riskData.payoutAmount} Pending
            </div>
          </div>

          <div className={`p-8 rounded-[2.5rem] border transition-all duration-700 ${riskData.activePeril !== "NONE" ? 'bg-rose-500/10 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.2)]' : 'bg-slate-900/40 border-slate-800'}`}>
            <div className="flex justify-between items-center mb-6">
              <div className={`p-4 rounded-2xl ${riskData.activePeril !== "NONE" ? 'bg-rose-500 text-white animate-bounce' : 'bg-slate-800 text-slate-500'}`}>
                {riskData.activePeril === "HEAT" ? <AlertTriangle /> : <Cpu />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Engine Logs</span>
            </div>
            <h3 className={`text-xl font-bold mb-3 ${riskData.activePeril !== "NONE" ? 'text-white' : 'text-slate-300'}`}>
              {riskData.payoutStatus}
            </h3>
            <p className="text-xs leading-relaxed text-slate-500">
              {riskData.activePeril !== "NONE" 
                ? `Oracle confirmed ${riskData.activePeril} event. Smart contract executed. Payout of DC ${riskData.payoutAmount} initiated.` 
                : "Awaiting sensor data from hyper-local nodes. All systems nominal."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// UI HELPER COMPONENTS
const MetricCard = ({ icon, label, value, color }) => (
  <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] hover:border-slate-700 transition-colors">
    <div className={`mb-4 ${color}`}>{icon}</div>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const TriggerBtn = ({ onClick, icon, label, color }) => (
  <button onClick={onClick} className={`flex items-center gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/40 text-left transition-all active:scale-95 group ${color}`}>
    <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-xs font-bold text-slate-400 group-hover:text-white uppercase tracking-wider">{label}</span>
  </button>
);

export default App;