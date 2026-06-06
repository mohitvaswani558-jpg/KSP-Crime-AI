import React, { useState } from "react";
import { Search, FileText, User, Newspaper, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { newsArticles, casesData, networkData } from "../data/mockData";

export default function AdvancedSearch() {
  const [query, setQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  const getResults = () => {
    if (!query.trim()) return { cases: [], news: [], suspects: [] };

    const q = query.toLowerCase();

    const matchedCases = casesData.filter(
      (c) =>
        c.firNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.suspect.toLowerCase().includes(q)
    );

    const matchedNews = newsArticles.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.city.toLowerCase().includes(q)
    );

    const matchedSuspects = networkData.nodes.filter(
      (node) =>
        node.id.toLowerCase().includes(q) ||
        node.role.toLowerCase().includes(q) ||
        node.details.toLowerCase().includes(q)
    );

    return {
      cases: matchedCases,
      news: matchedNews,
      suspects: matchedSuspects
    };
  };

  const results = getResults();
  const hasResults = results.cases.length > 0 || results.news.length > 0 || results.suspects.length > 0;

  const handlePresetClick = (term) => {
    setQuery(term);
  };

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600">
          Advanced Search Engine
        </h2>
        <p className="text-xs font-mono text-red-500/70 mt-1">
          Universal index queries on suspects, incident logs, FIR registers, and district alerts.
        </p>
      </div>

      {/* Main search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query database (e.g. 'Vikram Raj', 'FIR/2026/MNG/1020', 'stampede')..."
          className="w-full bg-white border-2 border-red-500/20 rounded-xl px-12 py-3.5 font-mono text-sm text-red-950 placeholder-red-500/35 focus:outline-none focus:border-red-500 focus:shadow-neon-red/10 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggested Search Presets */}
      <div className="flex flex-wrap gap-2 items-center font-mono text-xs text-gray-400 font-bold">
        <span>PRESETS:</span>
        {["Vikram Raj", "FIR/2025/BLR/0412", "stampede", "mangaluru"].map((term, i) => (
          <button
            key={i}
            onClick={() => handlePresetClick(term)}
            className="text-[11px] font-mono border border-red-500/20 hover:border-red-500 text-red-600/85 hover:text-red-600 bg-red-50/10 hover:bg-red-500/5 rounded px-2.5 py-1 transition-all cursor-pointer font-bold"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Search results catalog */}
      {query && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Dossiers column */}
          <div className="glass-panel rounded-xl p-4 border border-red-500/10 flex flex-col justify-between h-[360px] overflow-y-auto scrollbar-thin bg-white">
            <div>
              <span className="text-[10px] font-mono text-red-600 uppercase block mb-3 border-b border-red-500/10 pb-1.5 font-bold">
                📂 Dossiers & Case Files ({results.cases.length})
              </span>
              <div className="space-y-2">
                {results.cases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedResult({ type: "case", data: c })}
                    className="p-2.5 rounded bg-red-50/5 border border-red-500/5 hover:border-red-500/30 cursor-pointer flex justify-between items-center text-xs font-mono group"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-red-700 group-hover:underline">{c.firNumber}</span>
                      <p className="text-gray-500 text-[10px] leading-tight truncate max-w-[150px] font-normal">{c.title}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* News column */}
          <div className="glass-panel rounded-xl p-4 border border-red-500/10 flex flex-col justify-between h-[360px] overflow-y-auto scrollbar-thin bg-white">
            <div>
              <span className="text-[10px] font-mono text-red-600 uppercase block mb-3 border-b border-red-500/10 pb-1.5 font-bold">
                📰 Intelligence Briefs ({results.news.length})
              </span>
              <div className="space-y-2">
                {results.news.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => setSelectedResult({ type: "news", data: n })}
                    className="p-2.5 rounded bg-red-50/5 border border-red-500/5 hover:border-red-500/30 cursor-pointer flex justify-between items-center text-xs font-mono group"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-gray-800 group-hover:underline truncate block max-w-[150px]">{n.title}</span>
                      <p className="text-gray-400 text-[10px] font-normal">{n.city} • {n.date}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suspects column */}
          <div className="glass-panel rounded-xl p-4 border border-red-500/10 flex flex-col justify-between h-[360px] overflow-y-auto scrollbar-thin bg-white">
            <div>
              <span className="text-[10px] font-mono text-red-600 uppercase block mb-3 border-b border-red-500/10 pb-1.5 font-bold">
                👤 Criminal Dossiers ({results.suspects.length})
              </span>
              <div className="space-y-2">
                {results.suspects.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedResult({ type: "suspect", data: s })}
                    className="p-2.5 rounded bg-red-50/5 border border-red-500/5 hover:border-red-500/30 cursor-pointer flex justify-between items-center text-xs font-mono group"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-gray-900 group-hover:underline">{s.id}</span>
                      <p className="text-gray-500 text-[10px] font-normal">{s.role}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* No results placeholder */}
      {query && !hasResults && (
        <div className="py-16 text-center glass-panel rounded-xl border border-red-500/10 bg-white">
          <p className="font-mono text-xs text-red-500">
            No registers match current database parameters.
          </p>
        </div>
      )}

      {/* Result Display Overlay drawer */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-950/45 backdrop-blur-md flex justify-end"
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white border-l border-red-500/20 p-6 overflow-y-auto relative h-screen shadow-2xl flex flex-col justify-between scrollbar-thin font-mono"
            >
              <div className="space-y-6">
                
                {/* Header controls */}
                <div className="flex justify-between items-center border-b border-red-500/10 pb-4">
                  <div>
                    <span className="text-[10px] text-red-500 font-bold block">RESULT DRILL DOWN</span>
                    <h3 className="text-base font-bold text-gray-950 uppercase">{selectedResult.type} Parameters</h3>
                  </div>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="w-8 h-8 rounded border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Case File rendering */}
                {selectedResult.type === "case" && (
                  <div className="space-y-4 text-xs text-gray-700">
                    <div>
                      <span className="text-gray-400 block font-bold">FIR # / ID:</span>
                      <p className="text-red-700 font-extrabold">{selectedResult.data.firNumber} / {selectedResult.data.id}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">Title:</span>
                      <p className="text-gray-900 font-extrabold">{selectedResult.data.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">Prime Suspect:</span>
                      <p className="text-red-950 font-extrabold">{selectedResult.data.suspect}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">Assigned Officer:</span>
                      <p className="text-red-950 font-extrabold">{selectedResult.data.assignedOfficer}</p>
                    </div>
                    <div className="p-3 border border-red-500/15 bg-red-50/15 rounded">
                      <span className="text-red-650 font-bold block mb-1">Dossier Notes:</span>
                      <p className="text-gray-500 leading-relaxed font-normal">{selectedResult.data.notes[0].text}</p>
                    </div>
                  </div>
                )}

                {/* News Article rendering */}
                {selectedResult.type === "news" && (
                  <div className="space-y-4 text-xs text-gray-700">
                    <div>
                      <span className="text-gray-400 block font-bold">Title:</span>
                      <p className="text-gray-950 font-extrabold">{selectedResult.data.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">AI Summary:</span>
                      <p className="text-gray-550 leading-relaxed mt-1 p-2 bg-red-50/10 border border-red-500/20 rounded font-normal">{selectedResult.data.summary}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">Casualties:</span>
                      <p className="text-red-950 font-extrabold">{selectedResult.data.casualties}</p>
                    </div>
                  </div>
                )}

                {/* Suspect profile rendering */}
                {selectedResult.type === "suspect" && (
                  <div className="space-y-4 text-xs text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-red-500/30 rounded flex items-center justify-center text-red-500 bg-red-50/30">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] block font-bold">NAME</span>
                        <p className="text-sm font-bold text-gray-950 uppercase">{selectedResult.data.id}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">Vocal Role / Affiliation:</span>
                      <p className="text-red-950 font-extrabold">{selectedResult.data.role} (Group {selectedResult.data.group})</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">Intelligence Details:</span>
                      <p className="text-gray-550 leading-relaxed mt-1 p-2.5 bg-red-50/5 border border-red-500/5 rounded font-normal">{selectedResult.data.details}</p>
                    </div>
                  </div>
                )}

              </div>

              <div className="mt-8 pt-4 border-t border-red-500/10 flex justify-end">
                <button
                  onClick={() => setSelectedResult(null)}
                  className="px-4 py-2 border border-red-500/20 hover:border-red-500 text-red-650 text-red-600 text-xs rounded transition-all cursor-pointer font-bold"
                >
                  Clear Screen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
