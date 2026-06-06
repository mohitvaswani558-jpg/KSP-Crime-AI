import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, Trash2, ShieldAlert, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { alertsData } from "../data/mockData";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState(alertsData);
  const [threatLevel, setThreatLevel] = useState("HIGH (LEVEL 3)");

  const handleDismiss = (id) => {
    setAlerts((prev) => prev.filter((al) => al.id !== id));
  };

  const handleSimulateAlert = () => {
    const mockPhrases = [
      { type: "CRITICAL", message: "Majestic Depot: Rapid response dispatch ordered. Suspect Manoj Swamy trace active." },
      { type: "WARNING", message: "Whitefield Cluster: Firewall flags high outbound traffic patterns to suspicious server nodes." },
      { type: "INFO", message: "Mysuru Division: Patrol unit 18 checking temple security locks." }
    ];
    const chosen = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];
    
    const newAlert = {
      id: `al-${Date.now()}`,
      type: chosen.type,
      message: chosen.message,
      time: "Just now"
    };

    setAlerts((prev) => [newAlert, ...prev]);
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "CRITICAL":
        return "border-red-500/35 bg-red-50/40 text-red-800";
      case "WARNING":
        return "border-orange-500/30 bg-orange-50/20 text-orange-850 text-orange-800";
      default:
        return "border-gray-300 bg-gray-50/40 text-gray-700";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "CRITICAL":
        return <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />;
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-orange-650 text-orange-600" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 text-gray-750">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-red-500/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-sm text-red-600 font-bold">
          <Radio className="w-4 h-4 animate-bounce" />
          <span>Real-Time Intelligence Alerts</span>
        </div>
        <button
          onClick={handleSimulateAlert}
          className="px-3 py-1.5 bg-red-600 text-white font-bold font-mono text-[10px] uppercase rounded hover:bg-red-500 transition-all cursor-pointer hover:shadow-neon-red"
        >
          Simulate Dispatch
        </button>
      </div>

      {/* Threat Level indicator */}
      <div className="glass-panel rounded-xl p-4 border border-red-500/10 bg-white shadow-sm">
        <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">State Security Protocol</span>
        <div className="flex justify-between items-center font-mono">
          <span className="text-xs font-bold text-gray-700 uppercase">SYS THREAT INDEX:</span>
          <select
            value={threatLevel}
            onChange={(e) => setThreatLevel(e.target.value)}
            className="bg-white border border-red-500/20 px-2 py-1 text-xs rounded text-red-600 font-bold focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="CRITICAL (LEVEL 5)">CRITICAL (LEVEL 5)</option>
            <option value="HIGH (LEVEL 3)">HIGH (LEVEL 3)</option>
            <option value="MODERATE (LEVEL 2)">MODERATE (LEVEL 2)</option>
            <option value="CLEAR (LEVEL 1)">CLEAR (LEVEL 1)</option>
          </select>
        </div>
        
        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden border border-red-500/5">
          <div className={`h-full transition-all duration-500 ${
            threatLevel.includes("CRITICAL") 
              ? "w-full bg-red-600 shadow-neon-red" 
              : threatLevel.includes("HIGH") 
                ? "w-[75%] bg-red-400" 
                : threatLevel.includes("MODERATE") 
                  ? "w-[40%] bg-orange-400" 
                  : "w-[15%] bg-green-500"
          }`} />
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
        <AnimatePresence initial={false}>
          {alerts.map((al) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              key={al.id}
              className={`p-3.5 border rounded-lg flex justify-between items-start gap-3 text-xs font-mono transition-all hover:bg-red-500/5 ${getAlertColor(
                al.type
              )}`}
            >
              <div className="flex gap-2.5 items-start">
                <div className="mt-0.5 shrink-0">{getAlertIcon(al.type)}</div>
                <div className="space-y-1">
                  <p className="text-[11px] leading-relaxed text-gray-700">{al.message}</p>
                  <span className="text-[9px] text-gray-450 text-gray-400 block font-normal">{al.time}</span>
                </div>
              </div>

              <button
                onClick={() => handleDismiss(al.id)}
                className="text-gray-450 hover:text-red-600 p-1 rounded transition-colors cursor-pointer shrink-0 text-gray-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {alerts.length === 0 && (
          <div className="py-12 text-center text-gray-400 font-mono text-xs">
            No active dispatcher alerts. Grid status clear.
          </div>
        )}
      </div>

    </div>
  );
}
