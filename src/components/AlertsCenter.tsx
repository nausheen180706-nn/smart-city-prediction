import { useState } from 'react';
import { BellRing, ShieldAlert, Sliders, Smartphone, Mail, Info, RefreshCw, Eye, Sparkles } from 'lucide-react';

export default function AlertsCenter() {
  const [smsOn, setSmsOn] = useState(true);
  const [emailOn, setEmailOn] = useState(false);
  const [pushOn, setPushOn] = useState(true);
  const [priorityLimit, setPriorityLimit] = useState<'moderate' | 'critical'>('critical');
  const [customPhone, setCustomPhone] = useState('+1 (555) 019-2831');
  const [customEmail, setCustomEmail] = useState('sector1-ops@city.gov');

  const [alertsHistory, setAlertsHistory] = useState([
    { id: 'ALT-803', title: 'TRAFFIC DENSE CRITICAL', timeAgo: '8 mins ago', target: 'M-90 Interstate', status: 'delivered', channel: 'SMS' },
    { id: 'ALT-802', title: 'CROWD SURGE PLAZA SUBWAY', timeAgo: '24 mins ago', target: 'Plaza Exit Corridor', status: 'delivered', channel: 'Push Notification' },
    { id: 'ALT-801', title: 'TRASH BIN OVERFLOW OVERRUN', timeAgo: '1 hour ago', target: 'Smart Hub 14 Helix', status: 'failed', channel: 'Email' },
    { id: 'ALT-800', title: 'SECTOR-04 DECAY PATTERN FLAG', timeAgo: '3 hours ago', target: 'Genesis Boulevard Near Main', status: 'delivered', channel: 'SMS' },
  ]);

  const [testLog, setTestLog] = useState<string | null>(null);

  const triggerTestAlert = () => {
    setTestLog('SENDING...');
    setTimeout(() => {
      setTestLog('AUTOMATED BROADCAST DEPLOYED: SentraCity@360 alert dispatched successfully to target dispatch nodes.');
      setAlertsHistory(prev => [
        {
          id: `ALT-0${Math.floor(100 + Math.random() * 899)}`,
          title: 'COMMAND OVERRIDE MANUAL TEST',
          timeAgo: 'Just now',
          target: 'All active sector channels',
          status: 'delivered',
          channel: smsOn ? 'SMS' : pushOn ? 'Push' : 'Web'
        },
        ...prev
      ]);
    }, 600);
  };

  return (
    <div className="p-6 space-y-6 text-left font-mono" id="alerts-center-workspace">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#22d3ee]">TACTICAL DISPATCH GATEWAY</span>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase flex items-center gap-2">
            <BellRing className="h-7 w-7 text-pink-500 animate-pulse" />
            ALERTS CENTER & BROADCASTS
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Configure target ingestion channels to instantly forward AI model outcomes to field operators, fire trucks, waste managers, and maintenance crews.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SECTION 1: INGESTION CONFIG CHANNELS */}
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 flex flex-col justify-between text-xs text-left text-slate-300">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <h2 className="text-xs font-bold text-slate-200 uppercase flex items-center gap-1.5">
                <Smartphone className="h-4 w-4 text-pink-400" />
                BROADCAST TARGETS
              </h2>
              <p className="text-[10px] text-slate-500 uppercase mt-0.5">Setup direct forwarding paths</p>
            </div>

            {/* SMS Toggle */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-200 flex items-center gap-1.5 uppercase text-[11px]">SMS Direct Forwarding</p>
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="bg-transparent border-0 font-mono text-[10px] text-[#22d3ee] outline-none w-36 mt-1"
                />
              </div>
              <button
                onClick={() => setSmsOn(!smsOn)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                  smsOn ? 'bg-pink-500' : 'bg-white/10'
                }`}
              >
                <div className={`h-4 w-4 rounded-full bg-slate-950 transition-all ${smsOn ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Email Toggle */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-200 flex items-center gap-1.5 uppercase text-[11px]">Email Ingestion Hub</p>
                <input
                  type="text"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="bg-transparent border-0 font-mono text-[10px] text-[#22d3ee] outline-none w-44 mt-1"
                />
              </div>
              <button
                onClick={() => setEmailOn(!emailOn)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                  emailOn ? 'bg-pink-500' : 'bg-white/10'
                }`}
              >
                <div className={`h-4 w-4 rounded-full bg-slate-950 transition-all ${emailOn ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Mobile Push Toggle */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-200 flex items-center gap-1.5 uppercase text-[11px]">Mobile Command App Push</p>
                <p className="text-[9px] text-slate-500 mt-0.5">Pushes to iPad & patrol radios</p>
              </div>
              <button
                onClick={() => setPushOn(!pushOn)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                  pushOn ? 'bg-pink-500' : 'bg-white/10'
                }`}
              >
                <div className={`h-4 w-4 rounded-full bg-slate-950 transition-all ${pushOn ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Filter Priorities Selection */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-black">MINIMUM TRIGGER ACTION LEVEL</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(['moderate', 'critical'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPriorityLimit(lvl)}
                    className={`py-1.5 rounded-lg border uppercase text-[9px] font-bold tracking-wide transition-all ${
                      priorityLimit === lvl
                        ? 'border-pink-500/30 bg-pink-955/20 text-pink-400 font-bold'
                        : 'border-white/5 bg-white/5 text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    {lvl} SEVERITY
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={triggerTestAlert}
              className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-slate-950 font-black tracking-widest text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all uppercase"
              id="broadcast-test-alarm-btn"
            >
              <RefreshCw className="h-3.5 w-3.5" /> EMIT TEST BROADCAST
            </button>
            {testLog && (
              <p className="text-[9px] text-pink-400 text-center mt-2 lowercase text-left">{testLog}</p>
            )}
          </div>
        </div>

        {/* SECTION 2: BROADCAST SYSTEM SENT ALERTS HISTORY (2 cols) */}
        <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-white/5 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-200">BROADCAST TRANSMISSION METRIC LOG</h2>
                <p className="text-[10px] text-slate-500 uppercase">TELEMETRY SENT TO CONNECTED FIELD NODES</p>
              </div>
              <span className="text-[9px] bg-white/5 p-1 rounded font-normal text-slate-400 uppercase">Active</span>
            </div>

            <div className="space-y-3.5 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
              {alertsHistory.map((h) => (
                <div
                  key={h.id}
                  className="p-3 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3 text-left">
                    <div className="h-6 w-6 rounded bg-pink-950/60 border border-pink-500/10 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">
                      <BellRing className="h-3.5 w-3.5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-200 uppercase tracking-tight text-xs leading-none">
                          {h.title}
                        </span>
                        <span className="text-[8px] bg-white/10 text-slate-500 px-1 rounded">
                          {h.id}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">Target: {h.target}</p>
                      <p className="text-[9px] text-slate-500 mt-1 lowercase">
                        emitted via {h.channel} • synced {h.timeAgo}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {h.status === 'delivered' ? (
                      <span className="text-[10px] text-[#34d399] bg-emerald-950/20 border border-emerald-500/15 px-2 py-0.5 rounded-full font-bold uppercase">
                        ✓ DELIVERED
                      </span>
                    ) : (
                      <span className="text-[10px] text-red-400 bg-red-950/20 border border-red-500/15 px-2 py-0.5 rounded-full font-bold uppercase">
                        𐫵 FAULTED
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 text-[9px] text-slate-500 border-t border-white/5 pt-3 leading-relaxed flex items-center justify-between">
            <span>AUTOMATION AUDITS ENCRYPTED UNDER AES-GCM 256</span>
            <span>SENTRACITY@360 CONTROL CENTER READY</span>
          </div>
        </div>

      </div>
    </div>
  );
}
