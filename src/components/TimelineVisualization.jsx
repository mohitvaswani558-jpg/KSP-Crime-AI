import React, { useState } from "react";
import { Clock, ShieldCheck, FileText, Anchor, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { newsArticles } from "../data/mockData";

export default function TimelineVisualization() {
  const [activeTab, setActiveTab] = useState(newsArticles[0].id);

  const activeArticle = newsArticles.find((art) => art.id === activeTab);

  const getTimelineIcon = (category) => {
    switch (category) {
      case "Public Safety":
        return <Activity className="w-4 h-4" />;
      case "Cybercrime":
        return <ShieldCheck className="w-4 h-4" />;
      case "Drug Trafficking":
        return <Anchor className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-650">
          Timeline Visualization
        </h2>
        <p className="text-xs font-mono text-red-500/70 mt-1">
          Chronological logs, operational timelines, and evidence ingestion histories.
        </p>
      </div>

      {/* Case Timeline Selectors */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-red-500/10 scrollbar-thin">
        {newsArticles.map((art) => (
          <button
            key={art.id}
            onClick={() => setActiveTab(art.id)}
            className={`flex-shrink-0 px-4 py-2 border font-mono text-xs rounded transition-all cursor-pointer ${
              activeTab === art.id
                ? "bg-red-600 text-white border-red-600 font-bold"
                : "bg-white border-red-500/15 text-red-600 hover:text-red-500"
            }`}
          >
            {art.city}: {art.title.substring(0, 20)}...
          </button>
        ))}
      </div>

      {/* Vertical Timeline Feed */}
      <div className="glass-panel rounded-xl p-6 border border-red-500/10 max-h-[500px] overflow-y-auto scrollbar-thin relative bg-white">
        
        {/* Progress Bar background connector */}
        <div className="absolute top-8 bottom-8 left-[31px] w-[2px] bg-gradient-to-b from-red-600 via-red-400 to-transparent pointer-events-none" />

        <div className="space-y-8 relative">
          {activeArticle.timeline.map((step, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              key={idx}
              className="flex gap-6 items-start text-xs font-mono text-gray-600"
            >
              {/* Timeline dot/icon */}
              <div className="w-10 h-10 rounded-full border border-red-500/30 bg-white flex items-center justify-center text-red-500 z-10 shrink-0 shadow-sm">
                {idx === 0 ? <Clock className="w-4.5 h-4.5 animate-pulse" /> : getTimelineIcon(activeArticle.category)}
              </div>

              {/* Text info block */}
              <div className="space-y-1 bg-red-50/5 border border-red-500/5 p-4 rounded-lg flex-1 hover:border-red-500/15 transition-all">
                <div className="flex justify-between items-center text-[10px] text-red-500/80 mb-1 font-bold">
                  <span>TIMESTAMP: {step.time}</span>
                  <span>INDEX #{idx + 1}</span>
                </div>
                <p className="text-gray-650 leading-relaxed text-[12px]">{step.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
