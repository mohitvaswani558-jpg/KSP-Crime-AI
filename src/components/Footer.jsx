import React from "react";
import { Shield, Server, Terminal, Radio } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="relative bg-white/80 border-t border-red-500/10 py-10 px-6 overflow-hidden">
      
      {/* Background cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-red-50/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 font-mono text-xs text-gray-500">
        
        {/* Branding block */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-655 text-red-600 font-bold text-sm">
            <Shield className="w-5 h-5" />
            <span>KSP AI-COPS</span>
          </div>
          <p className="text-[11px] leading-relaxed text-gray-500 font-normal">
            Official Crime Intelligence & Investigation Platform of the Karnataka State Police. Powered by secure machine learning models.
          </p>
          <span className="text-[10px] text-red-550/40 block font-normal">
            © 2026 KARNATAKA POLICE. ALL RIGHTS RESERVED.
          </span>
        </div>

        {/* Modules Quick Links */}
        <div className="space-y-3">
          <span className="text-red-750 font-bold uppercase tracking-wider block text-red-700">Intelligence Modules</span>
          <ul className="space-y-2 text-[11px]">
            {["AI Assistant", "News Intelligence", "Crime Heatmap", "Investigation Dashboard", "FIR Management", "Network Graph", "Pattern Analytics"].map((mod, i) => {
              const paths = ["ai-assistant", "news", "heatmap", "dashboard", "cases", "network", "patterns"];
              return (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(paths[i])}
                    className="hover:text-red-500 transition-colors hover:underline cursor-pointer text-left font-bold"
                  >
                    // {mod}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* System Logs */}
        <div className="space-y-3">
          <span className="text-red-750 font-bold uppercase tracking-wider block text-red-700">Tactical System Status</span>
          <div className="space-y-1.5 text-[10px] text-gray-500 font-bold">
            <div className="flex justify-between">
              <span>FIREWALL STATE:</span>
              <span className="text-green-600 font-extrabold">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>DECENTRALIZED LOGS:</span>
              <span className="text-red-655 text-red-600 font-extrabold">MAPPED</span>
            </div>
            <div className="flex justify-between">
              <span>LATENCY:</span>
              <span className="text-red-600 font-extrabold">0.02ms</span>
            </div>
            <div className="flex justify-between">
              <span>ACTIVE CLUSTERS:</span>
              <span className="text-gray-800 font-extrabold">5 Division Nodes</span>
            </div>
          </div>
        </div>

        {/* Datacenters and security status */}
        <div className="space-y-3">
          <span className="text-red-750 font-bold uppercase tracking-wider block text-red-700">Physical Datacenter Nodes</span>
          <div className="space-y-2 text-[11px] font-bold">
            <p className="flex items-center gap-1.5 text-gray-500">
              <Server className="w-3.5 h-3.5 text-red-500" />
              <span>Bengaluru Central Command Hub</span>
            </p>
            <p className="flex items-center gap-1.5 text-gray-500">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span>Hubballi Secondary Mirror Unit</span>
            </p>
            <p className="flex items-center gap-1.5 text-gray-500">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Mangaluru Coastal Scan Tower</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
