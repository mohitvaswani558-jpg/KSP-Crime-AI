import React, { useState } from "react";
import { Search, Filter, ShieldAlert, X, FileText, UserPlus, Clock, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { casesData } from "../data/mockData";

export default function CaseManagement() {
  const [cases, setCases] = useState(casesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeCaseId, setActiveCaseId] = useState(null);

  const [newNoteText, setNewNoteText] = useState("");

  const handleAddNote = (caseId) => {
    if (!newNoteText.trim()) return;

    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            notes: [
              ...c.notes,
              {
                date: new Date().toISOString().replace("T", " ").substring(0, 16),
                author: c.assignedOfficer,
                text: newNoteText
              }
            ]
          };
        }
        return c;
      })
    );
    setNewNoteText("");
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.suspect.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? c.city === selectedCity : true;
    const matchesCategory = selectedCategory ? c.category === selectedCategory : true;
    return matchesSearch && matchesCity && matchesCategory;
  });

  const activeCase = cases.find((c) => c.id === activeCaseId);

  return (
    <div className="space-y-6 relative text-gray-700">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600">
          FIR & Case Management
        </h2>
        <p className="text-xs font-mono text-red-500/70 mt-1">
          Authorized criminal registers, dossier archives, and evidence pipelines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-red-50/10 p-3 rounded-lg border border-red-500/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/50" />
          <input
            type="text"
            placeholder="Search FIR, Suspect..."
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

      {/* Case Dossiers Table */}
      <div className="glass-panel rounded-xl border border-red-500/10 overflow-hidden shadow bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-xs text-left">
            <thead>
              <tr className="bg-red-50/20 border-b border-red-500/15 text-red-600 font-bold uppercase tracking-wider">
                <th className="p-4">FIR Reference</th>
                <th className="p-4">Incident Case</th>
                <th className="p-4">Suspect Profile</th>
                <th className="p-4">Investigator</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setActiveCaseId(c.id)}
                  className="hover:bg-red-500/5 cursor-pointer transition-colors group"
                >
                  <td className="p-4 font-bold text-red-650 text-red-600">{c.firNumber}</td>
                  <td className="p-4">
                    <span className="font-bold text-gray-900 block">{c.title}</span>
                    <span className="text-[10px] text-gray-500">{c.city} • {c.date}</span>
                  </td>
                  <td className="p-4 text-gray-600">{c.suspect}</td>
                  <td className="p-4 text-gray-600">{c.assignedOfficer}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${
                      c.status === "Closed"
                        ? "bg-green-500/10 border-green-500/35 text-green-700"
                        : "bg-red-500/10 border-red-500/35 text-red-700 animate-pulse"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-red-600 group-hover:underline text-[10px] uppercase font-bold flex items-center justify-end gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Mapped
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCases.length === 0 && (
            <div className="py-16 text-center">
              <ShieldAlert className="w-10 h-10 text-red-500/40 mx-auto mb-3" />
              <p className="font-mono text-sm text-red-500">
                No police registers match current filter query.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Case Details Drawer */}
      <AnimatePresence>
        {activeCaseId && activeCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-950/45 backdrop-blur-md flex justify-end"
            onClick={() => setActiveCaseId(null)}
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
                  <div className="font-mono">
                    <span className="text-[10px] text-red-500 font-bold block">CASE FILE: {activeCase.id}</span>
                    <h3 className="text-lg font-bold text-gray-950">{activeCase.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveCaseId(null)}
                    className="w-8 h-8 rounded border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Milestones status progression */}
                <div className="space-y-3 font-mono">
                  <span className="text-red-600 font-bold text-xs uppercase block">🔍 System Progression Track</span>
                  <div className="grid grid-cols-5 gap-1.5 text-center relative py-2">
                    {activeCase.progression.map((step, idx) => (
                      <div key={idx} className="space-y-2 relative">
                        {/* Connecting Line */}
                        {idx < 4 && (
                          <div className={`absolute top-3.5 left-1/2 w-full h-[2.5px] z-0 ${
                            step.active && activeCase.progression[idx+1].active
                              ? "bg-red-500"
                              : "bg-gray-200"
                          }`} />
                        )}

                        <div className={`w-8 h-8 rounded-full border mx-auto flex items-center justify-center z-10 relative bg-white ${
                          step.active 
                            ? "border-red-500 text-red-650 text-red-600 shadow-neon-red/10 font-bold"
                            : "border-gray-200 text-gray-400"
                        }`}>
                          {step.active ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span className={`text-[9px] block leading-tight font-bold ${step.active ? "text-red-700" : "text-gray-400"}`}>
                          {step.stage}
                          <span className="block text-[8px] opacity-40 font-normal mt-0.5">{step.date}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case parameters */}
                <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-b border-red-500/10 py-4">
                  <div>
                    <span className="text-gray-400 block font-bold">👤 Prime Suspect:</span>
                    <span className="text-red-950 font-extrabold">{activeCase.suspect}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-bold">👮 Assigned Officer:</span>
                    <span className="text-red-950 font-extrabold">{activeCase.assignedOfficer}</span>
                  </div>
                </div>

                {/* Evidence locker */}
                <div className="space-y-2 font-mono">
                  <span className="text-red-600 font-bold text-xs uppercase block">📁 Digital Evidence Locker</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCase.evidence.map((ev) => (
                      <div key={ev.id} className="p-3 bg-red-55/20 bg-red-50/20 border border-red-500/10 rounded flex justify-between items-center text-xs">
                        <div>
                          <span className="text-red-900 font-bold block">{ev.name}</span>
                          <span className="text-[10px] text-gray-500">{ev.type}</span>
                        </div>
                        <span className="text-[10px] text-red-500 bg-red-50/50 px-2 py-0.5 rounded border border-red-500/10">
                          {ev.size}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Notes */}
                <div className="space-y-3 font-mono">
                  <span className="text-red-600 font-bold text-xs uppercase block">✍️ Investigation Notes Log</span>
                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                    {activeCase.notes.map((n, index) => (
                      <div key={index} className="p-3 rounded bg-red-50/10 border border-red-500/5 text-[11px] leading-relaxed relative">
                        <div className="flex justify-between text-[10px] text-red-500/70 mb-1 border-b border-red-500/5 pb-1">
                          <span className="font-bold flex items-center gap-1"><UserPlus className="w-3 h-3" /> {n.author}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {n.date}</span>
                        </div>
                        <p className="text-gray-650 text-gray-650 text-gray-600">{n.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Add investigation logs to FIR dossier..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="flex-1 bg-white border border-red-500/20 rounded px-3 py-2 text-xs text-red-950 placeholder-red-500/30 focus:outline-none focus:border-red-500 focus:shadow-neon-red/10 transition-all"
                    />
                    <button
                      onClick={() => handleAddNote(activeCase.id)}
                      className="px-4 bg-red-600 border border-red-600 text-white font-bold text-xs rounded hover:bg-red-500 transition-all flex items-center justify-center cursor-pointer hover:shadow-neon-red"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-red-500/10 flex justify-end">
                <button
                  onClick={() => setActiveCaseId(null)}
                  className="px-5 py-2 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 font-mono text-xs rounded transition-all cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
