import React from "react";
import { Shield, Brain, Terminal, Cpu, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero({ onNavigate }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden border-b border-red-500/10">
      
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Tactical SVG Radar */}
      <div className="absolute right-10 bottom-10 w-96 h-96 opacity-20 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 200" className="w-full h-full text-red-500">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          {/* Scanning Sweep */}
          <motion.path
            d="M 100 100 L 100 10 A 90 90 0 0 1 180 60 Z"
            fill="url(#radar-gradient)"
            style={{ transformOrigin: "100px 100px" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          />
          <defs>
            <radialGradient id="radar-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(220, 38, 38, 0)" />
              <stop offset="90%" stopColor="rgba(220, 38, 38, 0.03)" />
              <stop offset="100%" stopColor="rgba(220, 38, 38, 0.25)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Floating KSP AI Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/25 bg-red-50/30 backdrop-blur-md text-red-600 text-xs font-mono tracking-widest mb-6 shadow-neon-red/10 animate-pulse"
      >
        <Shield className="w-3.5 h-3.5" />
        KARNATAKA STATE POLICE // AI SYSTEM ACTIVE
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-red-950 to-red-600 max-w-4xl"
      >
        AI Crime Intelligence Platform
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-gray-600 text-base md:text-lg max-w-2xl mt-6 font-mono leading-relaxed"
      >
        Next-generation investigation, analytics, and conversational intelligence system for Karnataka State Police.
      </motion.p>

      {/* Glowing Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mt-10 z-10"
      >
        <button
          onClick={() => onNavigate("dashboard")}
          className="relative px-8 py-3.5 rounded-lg font-mono font-bold text-sm uppercase tracking-wider text-white bg-red-600 border border-red-600 shadow-neon-red hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all duration-300 group cursor-pointer"
        >
          <span className="flex items-center gap-2">
            Launch Intelligence System
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => onNavigate("heatmap")}
          className="relative px-8 py-3.5 rounded-lg font-mono font-bold text-sm uppercase tracking-wider text-red-600 border border-red-500/20 bg-white/80 backdrop-blur-md hover:bg-red-500/5 hover:border-red-500/40 hover:shadow-neon-red/10 transition-all duration-300 cursor-pointer"
        >
          Explore Crime Analytics
        </button>
      </motion.div>

      {/* Floating Holographic AI interface preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 w-full max-w-4xl glass-panel rounded-xl p-4 md:p-6 border border-red-500/15 relative shadow-lg cursor-pointer group"
        onClick={() => onNavigate("ai-assistant")}
      >
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-red-500/10 pb-3 mb-4 text-xs font-mono text-red-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span>AI COPS SYSTEM V4.9 // ONLINE_SESSION</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/10" />
            <span className="w-2 h-2 rounded-full bg-red-500/10" />
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
          </div>
        </div>

        {/* Floating preview content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-mono">
          <div className="p-4 rounded-lg bg-white border border-red-500/5 hover:border-red-500/20 transition-all">
            <div className="flex items-center gap-2 text-red-600 text-xs font-bold mb-1.5">
              <Brain className="w-4 h-4" />
              INTELLIGENCE AGENT
            </div>
            <p className="text-[11px] text-gray-500">Natural Language Processor active. Ask about crime data, case links, and trends.</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-red-500/5 hover:border-red-500/20 transition-all">
            <div className="flex items-center gap-2 text-red-600 text-xs font-bold mb-1.5">
              <Terminal className="w-4 h-4" />
              PREDICTIVE ANALYSIS
            </div>
            <p className="text-[11px] text-gray-500">Threat vectors mapped for 31 police districts. Pulse indicators are monitoring zones.</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-red-500/5 hover:border-red-500/20 transition-all">
            <div className="flex items-center gap-2 text-red-600 text-xs font-bold mb-1.5">
              <Cpu className="w-4 h-4" />
              NETWORK MATCHING
            </div>
            <p className="text-[11px] text-gray-500">Fingerprint & facial node tracking linked. Suspect relationship graph compiled.</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-red-500/10 flex items-center justify-between text-xs font-mono text-red-600/60 group-hover:text-red-600 transition-colors">
          <span>Click anywhere to initiate direct AI conversation</span>
          <span className="flex items-center gap-1">SYS_ENG_OK <Shield className="w-3 h-3 text-red-500" /></span>
        </div>
      </motion.div>
      
    </section>
  );
}
