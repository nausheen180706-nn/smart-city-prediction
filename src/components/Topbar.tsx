import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, ShieldAlert, Cpu, Sparkles, LogOut, Settings2, Power, AlertTriangle, Sun, Moon } from 'lucide-react';
import { Incident } from '../types';
import { INCIDENTS_DATA } from '../data';

interface TopbarProps {
  onSearch: (query: string) => void;
  systemAlertsCount: number;
  triggerSystemSimulate: () => void;
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

export default function Topbar({
  onSearch,
  systemAlertsCount,
  triggerSystemSimulate,
  theme = 'dark',
  toggleTheme
}: TopbarProps) {
  const [searchVal, setSearchVal] = useState('');
  const [time, setTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Incident[]>(INCIDENTS_DATA);
  const [systemAlertMessage, setSystemAlertMessage] = useState<'normal' | 'congested' | 'emergency'>('normal');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) +
        ' | UTC ' +
        now.toISOString().slice(11, 19)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  const clearNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#050508]/40 px-6 backdrop-blur-md" id="command-topbar">
      {/* Search Bar / Input Dock */}
      <div className="flex flex-1 max-w-md items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Query terminal, sensors, road segments or incident codes..."
            value={searchVal}
            onChange={handleSearchChange}
            className="w-full rounded-xl border-none bg-white/5 py-2 pl-10 pr-4 text-xs font-mono text-slate-300 placeholder-slate-500 outline-none focus:ring-1 ring-cyan-500/50 transition-all"
            id="terminal-global-search"
          />
        </div>
      </div>

      {/* Center AI Engine Status Board */}
      <div className="hidden lg:flex items-center gap-5 border border-white/10 rounded-xl bg-white/5 px-4 py-1.5 font-mono">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-slate-400">ENGINE STATUS:</span>
          <span className="text-cyan-400 font-bold tracking-wide">SECURE COGNITIVE DECK</span>
        </div>
        <div className="h-3 w-px bg-white/10" />
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
          <span>ACTIVE THREAT-MODELING APEX</span>
        </div>
      </div>

      {/* Right side Utility HUD */}
      <div className="flex items-center gap-4">
        {/* Real-Time UTC Digital Clock */}
        <div className="hidden sm:flex flex-col text-right font-mono select-none">
          <span className="text-[10px] uppercase text-cyan-400 font-semibold tracking-widest">TACTICAL TIME FEED</span>
          <span className="text-xs text-slate-300 font-medium tracking-wider">{time || '00:00:00 | UTC 00:00:00'}</span>
        </div>

        {/* Theme Toggle Switch */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className={`flex h-9 items-center gap-1.5 px-3 text-[11px] font-mono font-semibold rounded-xl border transition-all ${
              theme === 'dark'
                ? 'border-yellow-500/20 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400'
                : 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-sm'
            }`}
            title="Toggle light and dark operational modes"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5 text-yellow-400 animate-spin-slow" /> : <Moon className="h-3.5 w-3.5 text-indigo-600" />}
            <span className="hidden sm:inline">LIGHTS:</span>
            <span className="font-bold">{theme === 'dark' ? 'OFF' : 'ON'}</span>
          </button>
        )}

        {/* Demo trigger helper */}
        <button
          onClick={triggerSystemSimulate}
          className="flex h-9 items-center gap-1 px-3 text-[11px] font-mono font-semibold rounded-xl border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
          title="Force telemetry fluctuation & inject simulated alert event"
          id="simulate-telemetry-btn"
        >
          <Power className="h-3 w-3" />
          <span className="hidden md:inline">INJECT SIM</span>
        </button>

        {/* Notification Alert Feed Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
            id="notification-hub-trigger"
          >
            <Bell className="h-4.5 w-4.5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-[0_0_8px_#dc2626]">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3.5 w-80 sm:w-96 rounded-2xl border border-white/10 bg-[#0a0a0e]/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md z-40" id="notification-hub-dropdown">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h4 className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldAlert className="h-4 w-4 text-orange-400" />
                  INCIDENT FEED ({notifications.length})
                </h4>
                <button
                  onClick={() => setNotifications([])}
                  className="text-[10px] font-mono text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  DISMISS ALL
                </button>
              </div>

              <div className="mt-2 text-left space-y-2 max-h-80 overflow-y-auto custom-scrollbar pt-1">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs font-mono text-slate-500">
                    No critical incidents queued. City sector statuses are nominal.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="group relative rounded-xl border border-white/5 bg-white/5 p-3 hover:bg-white/10 transition-colors border-l-2 border-l-red-500"
                    >
                      <button
                        onClick={(e) => clearNotification(notif.id, e)}
                        className="absolute right-2 top-2 text-[10px] text-slate-600 hover:text-red-400 transition-colors"
                        title="Dismiss incident"
                      >
                        ×
                      </button>
                      <div className="pr-4">
                        <div className="flex items-center gap-1.5">
                          <span className="rounded bg-red-950/40 px-1 py-0.5 text-[8px] font-mono text-red-400 border border-red-500/10 font-bold">
                            {notif.id}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                            {notif.type}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-300 leading-relaxed font-sans">{notif.location}</p>
                        <p className="mt-1 text-[10px] font-mono text-slate-500">{notif.timeAgo}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Hub Badge */}
        <div className="flex items-center gap-2 border-l border-white/5 pl-4">
          <div className="flex flex-col text-right hidden md:block select-none">
            <span className="text-xs text-slate-300 font-semibold leading-none">Dispatcher N. Ahmad</span>
            <span className="text-[9px] font-mono text-cyan-400 leading-none mt-1">SECTOR-01 LEVEL-3</span>
          </div>
          <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 flex items-center justify-center">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-bold text-cyan-400 font-mono">
              NA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
