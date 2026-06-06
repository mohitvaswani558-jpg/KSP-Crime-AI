import React from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Shield, TrendingUp, AlertOctagon, CheckCircle2, Zap } from "lucide-react";
import { patternPredictions } from "../data/mockData";

export default function InvestigationDashboard() {
  const chartData = patternPredictions.seasonalTrends;

  const categoryData = [
    { name: "Cybercrime", value: 390, color: "#dc2626" }, // red-600
    { name: "Theft", value: 210, color: "#f87171" }, // red-400
    { name: "Narcotics", value: 110, color: "#b91c1c" }, // red-700
    { name: "Traffic", value: 310, color: "#fb923c" }, // orange-400
    { name: "Homicide", value: 45, color: "#7f1d1d" } // red-900
  ];

  const kpis = [
    { title: "ACTIVE INVESTIGATIONS", value: "1,482", change: "+12.4%", desc: "Open FIRs under active monitoring", icon: Shield, color: "text-red-600 border-red-500/20 bg-white" },
    { title: "AVG RESOLUTION RATE", value: "78.4%", change: "+2.1%", desc: "Case files resolved in under 60 days", icon: CheckCircle2, color: "text-red-500 border-red-400/20 bg-white" },
    { title: "AI RISK FORECAST", value: "88/100", change: "CRITICAL", desc: "Whitefield digital corridors hazard rating", icon: AlertOctagon, color: "text-red-700 border-red-500/20 bg-red-50/10 animate-pulse" }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-red-500/25 p-2.5 rounded shadow-md font-mono text-xs text-red-950">
          <p className="font-bold mb-1">{label}</p>
          {payload.map((item, idx) => (
            <p key={idx} style={{ color: item.color }}>
              {item.name}: <span className="font-bold">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600">
          Investigation Dashboard
        </h2>
        <p className="text-xs font-mono text-red-500/70 mt-1">
          Predictive operational intelligence and visual telemetry dashboard.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className={`glass-panel rounded-xl p-5 border flex justify-between items-start ${kpi.color}`}>
            <div className="space-y-2 font-mono">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{kpi.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-gray-900">{kpi.value}</span>
                <span className="text-xs font-bold">{kpi.change}</span>
              </div>
              <p className="text-[10px] text-gray-500">{kpi.desc}</p>
            </div>
            <div className="p-2 rounded-lg bg-red-50/20 border border-red-500/10">
              <kpi.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Crime growth area chart */}
        <div className="glass-panel rounded-xl p-5 border border-red-500/10 flex flex-col justify-between h-[360px] bg-white">
          <div className="flex justify-between items-center mb-4 font-mono">
            <div>
              <span className="text-[10px] text-red-500 uppercase font-bold">TELEMETRY STREAM</span>
              <h4 className="text-sm font-bold text-gray-900">Crime Trend Growth (6 Months)</h4>
            </div>
            <span className="text-[10px] text-red-500/60 flex items-center gap-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> LIVE REPORT
            </span>
          </div>

          <div className="flex-1 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyber-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="purple-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.05)" />
                <XAxis dataKey="month" stroke="rgba(220, 38, 38, 0.4)" tickLine={false} />
                <YAxis stroke="rgba(220, 38, 38, 0.4)" tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "10px" }} />
                <Area type="monotone" dataKey="cybercrime" name="Cybercrime" stroke="#dc2626" fillOpacity={1} fill="url(#cyber-gradient)" />
                <Area type="monotone" dataKey="theft" name="Theft" stroke="#fb923c" fillOpacity={1} fill="url(#purple-gradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crime category distribution bar chart */}
        <div className="glass-panel rounded-xl p-5 border border-red-500/10 flex flex-col justify-between h-[360px] bg-white">
          <div className="flex justify-between items-center mb-4 font-mono">
            <div>
              <span className="text-[10px] text-red-500 uppercase font-bold">SECTOR INTEL</span>
              <h4 className="text-sm font-bold text-gray-900">Crime Volume by Category</h4>
            </div>
            <span className="text-[10px] text-red-500/60 font-bold">INTELLIGENCE COMPILED</span>
          </div>

          <div className="flex-1 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.05)" />
                <XAxis dataKey="name" stroke="rgba(220, 38, 38, 0.4)" tickLine={false} />
                <YAxis stroke="rgba(220, 38, 38, 0.4)" tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Threat Count" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Predictive Insight Card */}
      <div className="glass-panel rounded-xl p-5 border border-red-500/20 bg-red-50/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-red-600 shrink-0">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-2 font-mono">
            <h5 className="text-sm font-bold text-red-700 flex items-center gap-1.5 uppercase">
              Predictive AI Dispatch Advisory
            </h5>
            <p className="text-xs text-gray-500 leading-relaxed">
              Based on spatial pattern clustering and recurrent neural network timelines, the KSP AI Engine forecasts a **15% increase in digital bank fraud incidents** near the Hubballi-Dharwad transportation corridor over the next 14 days. 
              <br />
              <span className="text-red-600 font-bold">RECOMMENDATION:</span> Pre-deploy specialized cyber patrols and establish warning checkpoints at local commercial hubs.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
