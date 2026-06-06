import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, ShieldCheck, Map, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { districtsData } from "../data/mockData";

export default function CrimeHeatmap() {
  const [selectedDistrict, setSelectedDistrict] = useState(districtsData[0]); // default to Bengaluru
  const [dangerFilter, setDangerFilter] = useState("ALL");

  const filteredDistricts = districtsData.filter((dist) => {
    if (dangerFilter === "ALL") return true;
    return dist.dangerLevel === dangerFilter;
  });

  const getDangerColor = (level) => {
    switch (level) {
      case "CRITICAL":
        return "text-red-600 bg-red-50/40 border-red-500/30 shadow-sm";
      case "HIGH":
        return "text-red-500 bg-red-50/20 border-red-400/30 shadow-sm";
      case "MODERATE":
        return "text-orange-500 bg-orange-50/20 border-orange-400/20";
      default:
        return "text-gray-500 bg-gray-50/40 border-gray-400/20";
    }
  };

  const getDangerCircleColor = (level) => {
    switch (level) {
      case "CRITICAL":
        return "fill-red-600 stroke-red-500 shadow-neon-red";
      case "HIGH":
        return "fill-red-400 stroke-red-300";
      case "MODERATE":
        return "fill-orange-400 stroke-orange-300";
      default:
        return "fill-gray-300 stroke-gray-300";
    }
  };

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600">
          Crime Heatmap & Area Intelligence
        </h2>
        <p className="text-xs font-mono text-red-500/70 mt-1">
          Tactical district-level scanning of threat volumes, dangerous vectors, and alert codes.
        </p>
      </div>

      {/* Main Grid: Map and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Schematic SVG Map */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-5 border border-red-500/10 flex flex-col justify-between min-h-[500px] relative overflow-hidden bg-white">
          
          <div className="absolute top-3 left-3 font-mono text-[9px] text-red-600/40 flex flex-col">
            <span>GRID: AREA_COORDINATOR_MAPPED</span>
            <span>LAT/LONG: SCALE_100_STATION</span>
          </div>

          <div className="absolute bottom-3 left-3 flex gap-4 text-[10px] font-mono">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-neon-red/35 animate-pulse" /> Critical</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" /> High</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Moderate</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> Low</div>
          </div>

          {/* Map canvas */}
          <div className="flex-1 flex items-center justify-center py-6 min-h-[360px]">
            <svg viewBox="0 0 100 100" className="w-full max-w-[420px] aspect-square text-red-500/10">
              
              {/* Tactical background lines */}
              <path
                d="M 30 32 L 40 45 M 40 45 L 56 48 M 56 48 L 68 82 M 40 45 L 43 64 M 43 64 L 58 86 M 58 86 L 68 82 M 43 64 L 42 78 M 42 78 L 58 86 M 55 18 L 40 45 M 55 18 L 30 32 M 55 18 L 56 48 M 72 78 L 68 82 M 72 78 L 56 48"
                stroke="rgba(220, 38, 38, 0.08)"
                strokeWidth="0.5"
                strokeDasharray="1 1"
                fill="none"
              />

              {/* Pulsing red radar signals */}
              {districtsData
                .filter((d) => d.dangerLevel === "CRITICAL" || d.dangerLevel === "HIGH")
                .map((d) => (
                  <g key={`pulse-${d.id}`}>
                    <circle
                      cx={d.coords.x}
                      cy={d.coords.y}
                      r="7"
                      fill="none"
                      stroke="rgba(220, 38, 38, 0.35)"
                      strokeWidth="0.5"
                      className="radar-ring"
                      style={{ transformOrigin: `${d.coords.x}px ${d.coords.y}px` }}
                    />
                    <circle
                      cx={d.coords.x}
                      cy={d.coords.y}
                      r="12"
                      fill="none"
                      stroke="rgba(220, 38, 38, 0.15)"
                      strokeWidth="0.5"
                      className="radar-ring"
                      style={{ transformOrigin: `${d.coords.x}px ${d.coords.y}px`, animationDelay: "1.5s" }}
                    />
                  </g>
                ))}

              {/* Districts node plotting */}
              {filteredDistricts.map((dist) => {
                const isSelected = selectedDistrict.id === dist.id;
                const radius = dist.id === "blr" ? 3.5 : dist.id === "hub" || dist.id === "mng" ? 2.8 : 2.2;

                return (
                  <g
                    key={dist.id}
                    onClick={() => setSelectedDistrict(dist)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={dist.coords.x}
                      cy={dist.coords.y}
                      r={radius + 3}
                      fill="rgba(220, 38, 38, 0)"
                      className="group-hover:fill-red-500/5 transition-colors"
                    />

                    {/* Outer glowing border for selected */}
                    {isSelected && (
                      <circle
                        cx={dist.coords.x}
                        cy={dist.coords.y}
                        r={radius + 1.8}
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="0.5"
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Dot */}
                    <circle
                      cx={dist.coords.x}
                      cy={dist.coords.y}
                      r={radius}
                      className={`transition-all duration-300 ${getDangerCircleColor(dist.dangerLevel)} ${
                        isSelected ? "scale-125" : "hover:scale-115"
                      }`}
                      style={{ transformOrigin: `${dist.coords.x}px ${dist.coords.y}px` }}
                    />

                    <circle
                      cx={dist.coords.x}
                      cy={dist.coords.y}
                      r="0.8"
                      fill="#ffffff"
                    />

                    {/* District Abbreviation Label */}
                    <text
                      x={dist.coords.x}
                      y={dist.coords.y - radius - 1.5}
                      textAnchor="middle"
                      className="font-mono text-[5.5px] font-bold fill-red-700 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      {dist.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Details Card and Filters Sidebar */}
        <div className="space-y-4 flex flex-col">
          {/* Filters card */}
          <div className="glass-panel rounded-xl p-4 border border-red-500/10 bg-white">
            <span className="text-[10px] font-mono text-red-600 uppercase font-bold block mb-2">
              Filter Threat Levels
            </span>
            <div className="grid grid-cols-2 gap-2">
              {["ALL", "CRITICAL", "HIGH", "MODERATE"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDangerFilter(level)}
                  className={`px-2.5 py-1.5 rounded font-mono text-[10px] uppercase border transition-all cursor-pointer ${
                    dangerFilter === level
                      ? "bg-red-600 text-white border-red-600 font-bold"
                      : "bg-white border-red-500/15 text-red-600 hover:text-red-500"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* District info cards */}
          <AnimatePresence mode="wait">
            {selectedDistrict && (
              <motion.div
                key={selectedDistrict.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`glass-panel rounded-xl p-5 border flex-1 flex flex-col justify-between bg-white ${getDangerColor(
                  selectedDistrict.dangerLevel
                )}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="font-mono">
                      <span className="text-[10px] text-gray-400 uppercase block font-bold">ZONE CODE: {selectedDistrict.code}</span>
                      <h4 className="text-lg font-bold text-gray-900">{selectedDistrict.name}</h4>
                    </div>
                    
                    <span className="px-2.5 py-1.5 rounded border text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      {selectedDistrict.dangerLevel === "CRITICAL" ? (
                        <ShieldAlert className="w-3.5 h-3.5" />
                      ) : selectedDistrict.dangerLevel === "HIGH" ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5" />
                      )}
                      {selectedDistrict.status}
                    </span>
                  </div>

                  {/* Stats counts */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono py-3 border-t border-b border-red-500/10">
                    <div>
                      <span className="text-gray-400 block font-bold">Threat Vol:</span>
                      <span className="text-gray-800 font-extrabold text-sm">
                        {selectedDistrict.crimeCount.toLocaleString()} Cases
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">Primary Vector:</span>
                      <span className="text-gray-800 font-bold text-xs truncate block max-w-full">
                        {selectedDistrict.commonCrime}
                      </span>
                    </div>
                  </div>

                  {/* Long analytical logs */}
                  <div className="space-y-1 text-xs font-mono">
                    <span className="text-red-600 font-bold block">📖 Predictive Crime Synopsis:</span>
                    <p className="text-gray-500 leading-relaxed text-[11px] p-2 bg-red-50/10 border border-red-500/5 rounded">
                      {selectedDistrict.details}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-red-500/5 flex justify-between items-center text-[10px] font-mono text-red-500">
                  <span className="flex items-center gap-1"><Map className="w-3.5 h-3.5" /> AREA INTEL</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 animate-pulse" /> LIVE TRACKING</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
