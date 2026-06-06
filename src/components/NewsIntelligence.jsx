import React, { useState } from "react";
import { Search, Calendar, MapPin, ShieldAlert, X, TrendingUp, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { newsArticles } from "../data/mockData";

export default function NewsIntelligence() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);

  const filteredArticles = newsArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? art.city === selectedCity : true;
    const matchesCategory = selectedCategory ? art.category === selectedCategory : true;
    return matchesSearch && matchesCity && matchesCategory;
  });

  const trendingTopics = [
    { title: "RCB Victory Stampede", tag: "Public Safety", hits: "4.5K scans", color: "border-red-500/30 text-red-600 bg-red-50/20" },
    { title: "Hubballi SIM Cloning", tag: "Cybercrime", hits: "2.1K scans", color: "border-red-500/20 text-red-600 bg-red-50/10" },
    { title: "Mangaluru Port Contraband", tag: "Narcotics", hits: "3.8K scans", color: "border-red-500/20 text-red-600 bg-red-50/10" },
    { title: "Nanjangud Temple Theft", tag: "Antique Smuggling", hits: "1.2K scans", color: "border-red-500/20 text-red-600 bg-red-50/10" }
  ];

  return (
    <div className="space-y-8 relative text-gray-700">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600">
            Smart News & Article Intelligence
          </h2>
          <p className="text-xs font-mono text-red-500/70 mt-1">
            Real-time parsing and indexing of public news streams matched with local police databases.
          </p>
        </div>
      </div>

      {/* Trending Topics Carousel */}
      <div className="glass-panel rounded-xl p-4 border border-red-500/10 bg-red-50/5">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-red-600">
          <TrendingUp className="w-4 h-4 text-red-500 animate-bounce" />
          <span>TRENDING CRIME INTELLIGENCE SEARCHES</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {trendingTopics.map((topic, i) => (
            <button
              key={i}
              onClick={() => setSearchTerm(topic.title.split(" ")[0])}
              className={`flex-shrink-0 flex items-center gap-2 border px-3.5 py-2 rounded-lg hover:bg-red-500/5 transition-all text-xs font-mono cursor-pointer ${topic.color}`}
            >
              <span>{topic.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span className="opacity-40 font-normal">({topic.hits})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtering Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-red-50/10 p-3 rounded-lg border border-red-500/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/50" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded bg-white border border-red-500/20 font-mono text-xs text-red-950 placeholder-red-500/30 focus:outline-none focus:border-red-500 focus:shadow-neon-red/10 transition-all"
          />
        </div>

        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white border border-red-500/20 font-mono text-xs text-red-600 focus:outline-none focus:border-red-500 transition-all cursor-pointer"
          >
            <option value="">Select City (All)</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hubballi">Hubballi</option>
            <option value="Mangaluru">Mangaluru</option>
            <option value="Mysuru">Mysuru</option>
          </select>
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white border border-red-500/20 font-mono text-xs text-red-600 focus:outline-none focus:border-red-500 transition-all cursor-pointer"
          >
            <option value="">Select Category (All)</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Cybercrime">Cybercrime</option>
            <option value="Drug Trafficking">Drug Trafficking</option>
            <option value="Theft & Smuggling">Theft & Smuggling</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCity("");
            setSelectedCategory("");
          }}
          className="px-4 py-2 border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5 text-red-600 rounded font-mono text-xs transition-all cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      {/* Grid of news articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredArticles.map((art) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="glass-panel hover:glass-panel-red rounded-xl p-5 border border-red-500/10 flex flex-col justify-between cursor-pointer group shadow hover:shadow-neon-red/5 transition-all relative overflow-hidden bg-white"
            >
              <div className={`absolute top-0 left-0 w-full h-[2.5px] transition-colors ${
                art.investigationStatus === "RESOLVED" ? "bg-green-500" : "bg-red-500"
              }`} />

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-red-50/50 text-red-600 border border-red-500/15">
                    {art.category}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-red-500/60" />
                    {art.date}
                  </span>
                </div>

                <h3 className="text-base font-bold font-mono text-gray-900 group-hover:text-red-600 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-gray-500 font-mono line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-red-500/5 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {art.city}
                </span>
                <span className="text-red-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  Examine Briefing
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <div className="col-span-2 py-16 text-center glass-panel rounded-xl border border-red-500/10 bg-white">
            <ShieldAlert className="w-10 h-10 text-red-500/40 mx-auto mb-3" />
            <p className="font-mono text-sm text-red-500">
              No matching intelligence reports indexed. Please broaden search constraints.
            </p>
          </div>
        )}
      </div>

      {/* Detail Overlay Drawer */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-950/45 backdrop-blur-md flex justify-end"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white border-l border-red-500/20 p-6 overflow-y-auto relative h-screen shadow-2xl flex flex-col justify-between scrollbar-thin"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-red-500/10 pb-4">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-red-50/50 border border-red-500/20 font-mono text-[10px] text-red-600 uppercase font-bold">
                      {activeArticle.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded border font-mono text-[10px] uppercase font-bold ${
                      activeArticle.investigationStatus === "RESOLVED"
                        ? "bg-green-500/10 border-green-500/35 text-green-700"
                        : "bg-red-500/10 border-red-500/35 text-red-700 animate-pulse"
                    }`}>
                      {activeArticle.investigationStatus}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="w-8 h-8 rounded border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Article Info */}
                <div className="space-y-2 font-mono">
                  <span className="text-[10px] text-red-500 font-bold block">CASE RECORD REFERENCE: {activeArticle.id}</span>
                  <h3 className="text-xl font-bold text-gray-900">{activeArticle.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-red-500/60" /> {activeArticle.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-500" /> {activeArticle.location}</span>
                  </div>
                </div>

                {/* AI Summary Block */}
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-50/10 text-xs font-mono relative">
                  <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
                  <span className="text-red-700 font-bold uppercase block mb-1">🤖 AI-Generated Intelligence Summary</span>
                  <p className="text-gray-600 leading-relaxed">{activeArticle.summary}</p>
                </div>

                {/* Case Stats */}
                <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-b border-red-500/10 py-4">
                  <div>
                    <span className="text-gray-400 block">⚠️ Casualties/Impact:</span>
                    <span className="text-red-950 font-extrabold">{activeArticle.casualties}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">⛓️ Linked incident registers:</span>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {activeArticle.relatedIncidents.map((inc, index) => (
                        <span key={index} className="px-1.5 py-0.5 rounded bg-red-50/50 text-red-600 border border-red-500/10 text-[9px] font-bold">
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Event Timeline */}
                <div className="space-y-4 font-mono">
                  <span className="text-red-600 font-bold text-xs uppercase block">⏱️ Tactical Event Log</span>
                  <div className="relative border-l border-red-500/20 pl-4 ml-2 space-y-5">
                    {activeArticle.timeline.map((step, index) => (
                      <div key={index} className="relative text-xs">
                        <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
                        <span className="text-red-500 font-bold block">[{step.time}]</span>
                        <p className="text-gray-600 mt-0.5 leading-relaxed">{step.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-red-500/10 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 bg-red-600 border border-red-600 text-white font-mono font-bold text-xs uppercase rounded hover:bg-red-500 transition-all cursor-pointer hover:shadow-neon-red"
                >
                  Confirm Acknowledgment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
