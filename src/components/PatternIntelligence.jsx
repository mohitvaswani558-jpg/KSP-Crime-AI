import React from "react";
import { Radar, AlertOctagon, Users, Calendar, ArrowUpRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { patternPredictions } from "../data/mockData";

export default function PatternIntelligence() {
  const predictions = patternPredictions.radarPulseZones;
  const offenders = patternPredictions.repeatOffenders;
  const seasonalData = patternPredictions.seasonalTrends;

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600">
            Crime Pattern Intelligence
          </h2>
          <p className="text-xs font-mono text-red-500/70 mt-1">
            Machine learning neural engines tracing seasonal vectors, repeat offenders, and danger clusters.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-50/50 border border-red-500/30 rounded text-red-750 font-mono text-xs animate-pulse font-bold text-red-700">
          <AlertOctagon className="w-4 h-4" />
          <span>SYS STATE: {patternPredictions.activeThreatLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Predictive Zones List */}
        <div className="glass-panel rounded-xl p-5 border border-red-500/10 flex flex-col justify-between space-y-4 bg-white">
          <div className="flex items-center gap-2 mb-2 font-mono">
            <Radar className="w-4.5 h-4.5 text-red-500 animate-spin" style={{ animationDuration: '4s' }} />
            <h3 className="text-sm font-bold text-gray-900 uppercase">AI Predicted Crime Zone Alerts</h3>
          </div>

          <div className="space-y-3 flex-1">
            {predictions.map((pred, i) => (
              <div key={i} className="p-3 bg-red-50/10 border border-red-500/10 rounded flex items-center justify-between font-mono text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-red-700">{pred.zone}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">Alert: {pred.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-red-600">{pred.probability} Risk</span>
                  <span className="text-[9px] text-gray-400 block font-normal">Trend: {pred.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repeat Offenders Grid */}
        <div className="glass-panel rounded-xl p-5 border border-red-500/10 flex flex-col justify-between space-y-4 bg-white">
          <div className="flex items-center gap-2 mb-2 font-mono">
            <Users className="w-4.5 h-4.5 text-red-500" />
            <h3 className="text-sm font-bold text-gray-900 uppercase">Repeat Offender Watchlist</h3>
          </div>

          <div className="space-y-3 flex-1">
            {offenders.map((off, i) => (
              <div key={i} className="p-3 bg-red-50/10 border border-red-500/5 rounded flex flex-col sm:flex-row justify-between sm:items-center gap-2 font-mono text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-gray-900">{off.name}</span>
                  <span className="text-[10px] text-gray-400 block font-normal">{off.primaryCrime} ({off.offenses} Offenses)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 block font-normal">Threat Index</span>
                    <span className="text-red-650 font-bold text-red-650 text-red-650 text-red-600">{off.threatIndex}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] border uppercase font-bold ${
                    off.status.includes("Surveillance")
                      ? "bg-red-500/10 border-red-500/30 text-red-700"
                      : "bg-orange-500/10 border-orange-500/30 text-orange-700"
                  }`}>
                    {off.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seasonal Forecasting Chart */}
      <div className="glass-panel rounded-xl p-5 border border-red-500/10 h-[340px] flex flex-col justify-between bg-white">
        <div className="flex justify-between items-center mb-4 font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-red-500" />
            <h4 className="text-sm font-bold text-gray-900 uppercase">Seasonal Threat Analytics Wave</h4>
          </div>
          <span className="text-[10px] text-red-500/60 font-bold">FORECAST MATRIX</span>
        </div>

        <div className="flex-1 w-full text-xs font-mono">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={seasonalData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.05)" />
              <XAxis dataKey="month" stroke="rgba(220, 38, 38, 0.4)" tickLine={false} />
              <YAxis stroke="rgba(220, 38, 38, 0.4)" tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "rgba(220,38,38,0.25)", color: "#111827" }} />
              <Line type="monotone" dataKey="cybercrime" name="Cybercrime Vector" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="theft" name="Theft Vector" stroke="#fb923c" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="drugs" name="Narcotics Vector" stroke="#7f1d1d" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
