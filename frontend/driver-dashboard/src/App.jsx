import React, { useState, useEffect } from 'react';
import { 
  CloudRain, ShieldCheck, Activity, MapPin, Zap, Lock, User, IndianRupee, AlertCircle
} from 'lucide-react';

function App() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTriggerSimulation = async () => {
    setLoading(true);
    try {
      // Connecting to your Spring Boot Backend (Eclipse)
      const response = await fetch('http://localhost:8080/api/v1/triggers/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition: isTriggered ? "NORMAL" : "HEAVY_RAIN" })
      });
      const data = await response.json();
      
      // Update UI based on Backend response
      if (data.status === "CLAIM_INITIATED") {
        setIsTriggered(true);
      } else {
        setIsTriggered(false);
      }
    } catch (err) {
      console.log("Backend not reachable, toggling local state for demo.");
      setIsTriggered(!isTriggered);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-teal-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.4)]">
              <Zap className="text-slate-900 fill-current" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white italic">QUANTUM<span className="text-teal-400">QUIRKS</span></span>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Live</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Partner Dashboard</h2>
            <p className="text-slate-400 flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-teal-500" /> Hyderabad Sector V • {currentTime}
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">Partner ID</p>
            <p className="text-sm font-mono text-teal-400">QQ-2026-SATISH</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coverage Card */}
              <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] backdrop-blur-sm relative overflow-hidden transition-all hover:border-teal-500/30 group">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ShieldCheck size={140} />
                </div>
                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Active Coverage</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-4xl font-black text-white tracking-tighter">DC 150</span>
                  <span className="text-teal-500 font-bold">/wk</span>
                </div>
                <p className="text-xs text-slate-500">Protection: Loss of Income Only</p>
              </div>

              {/* Payout Card */}
              <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] backdrop-blur-sm relative overflow-hidden transition-all hover:border-amber-500/30">
                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Payout Potential</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-4xl font-black text-amber-400 tracking-tighter italic">DC 1,200</span>
                </div>
                <p className="text-xs text-slate-500">Automated Transfer on Disruption</p>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2rem] backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Activity size={16} className="text-teal-500" /> Hyper-local Rain Data (mm)
                </h3>
              </div>
              <div className="h-40 flex items-end gap-3 px-2">
                {[35, 65, 40, 85, 55, 95, 20].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-800/50 rounded-t-xl hover:bg-teal-500/30 transition-all relative group" style={{height: `${h}%`}}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}mm
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[9px] text-slate-600 font-black uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          {/* AI Engine Sidebar */}
          <div className="space-y-6">
            <div className={`p-8 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden ${isTriggered ? 'bg-rose-950/20 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.15)]' : 'bg-slate-900/40 border-slate-800/60'}`}>
              {isTriggered && (
                <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none"></div>
              )}
              
              <div className="text-center relative z-10">
                <div className={`inline-flex p-6 rounded-3xl mb-6 transition-all duration-500 ${isTriggered ? 'bg-rose-500 text-white rotate-12 shadow-lg shadow-rose-500/40' : 'bg-slate-800 text-slate-600'}`}>
                  <CloudRain size={40} className={isTriggered ? 'animate-bounce' : ''} />
                </div>
                <h4 className={`text-xl font-black mb-2 tracking-tight ${isTriggered ? 'text-white' : 'text-slate-400'}`}>
                  {isTriggered ? 'TRIGGER ACTIVE' : 'MONITORING'}
                </h4>
                <p className="text-xs text-slate-500 mb-8 leading-relaxed">
                  {isTriggered 
                    ? 'Rainfall > 5mm/hr detected at your GPS coordinates. Claim QQ-992 initiated.' 
                    : 'AI Risk Engine is scanning hyper-local weather sensors for disruptions.'}
                </p>
                
                <button 
                  onClick={handleTriggerSimulation}
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-95 ${isTriggered ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/30 hover:bg-rose-600' : 'bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/20 hover:bg-teal-400'}`}>
                  {loading ? 'PROCESSING...' : isTriggered ? 'RESET SENSORS' : 'SIMULATE DISRUPTION'}
                </button>
              </div>
            </div>

            {/* AI Fraud Logic Preview */}
            <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Lock size={14} className="text-teal-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Guard</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">GPS SPOOF CHECK</span>
                  <span className="text-teal-400 font-mono tracking-tighter px-2 py-0.5 bg-teal-500/10 rounded">PASS</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">DEVICE VERIFIED</span>
                  <span className="text-teal-400 font-mono tracking-tighter px-2 py-0.5 bg-teal-500/10 rounded">YES</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Notification */}
        {isTriggered && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-rose-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10">
            <AlertCircle className="animate-pulse" />
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-widest">System Payout Initiated</p>
              <p className="text-[10px] opacity-80">DC 1,200 being transferred to your wallet.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;