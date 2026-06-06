import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, MicOff, Terminal, Bot, User, RefreshCw, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { newsArticles, casesData } from "../data/mockData";

export default function AIChatAssistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "KSP Intelligence Assistant operational. System ready to parse incident reports, FIR registries, and regional threat matrices. What intelligence query do you want to run?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setQuery("");

    setIsTyping(true);
    setTimeout(() => {
      processQuery(text);
    }, 1500);
  };

  const processQuery = (userInput) => {
    const input = userInput.toLowerCase();
    let responseText = "";
    let extraData = null;

    if (input.includes("4 june 2025") || input.includes("rcb") || input.includes("stampede")) {
      const article = newsArticles.find(a => a.id === "art-1");
      const caseDetails = casesData.find(c => c.id === "FIR-128/2025");
      
      responseText = `**INTEL RETRIEVAL: Chinnaswamy Stadium Incident (04-June-2025)**\n\nFollowing RCB's victory parade, severe crowd congestion occurred near MG Road. KSP's Automated Crowd Sensors triggered alerts after density crossed safety limits.`;
      extraData = {
        title: article.title,
        status: caseDetails.status,
        officer: caseDetails.assignedOfficer,
        location: article.location,
        casualties: article.casualties,
        timeline: article.timeline,
        evidence: caseDetails.evidence
      };
    } else if (input.includes("hubballi") || input.includes("cyber")) {
      const article = newsArticles.find(a => a.id === "art-2");
      responseText = `**INTEL RETRIEVAL: Hubballi Carding & Phishing Raid**\n\nKSP Cyber division intercepted an unauthorized call center network routing VoIP traffic. Forensic mirrors match known digital fraud signatures.`;
      extraData = {
        title: article.title,
        status: article.investigationStatus,
        location: article.location,
        casualties: article.casualties,
        timeline: article.timeline
      };
    } else if (input.includes("mangaluru") || input.includes("drugs") || input.includes("smuggling")) {
      const article = newsArticles.find(a => a.id === "art-3");
      responseText = `**INTEL RETRIEVAL: Narcotics Seizure (Mangaluru Port)**\n\nAI routing anomalies flagged synthetic compounds smuggled in cargo container 4B. Narcotic investigation currently at Trial stage.`;
      extraData = {
        title: article.title,
        status: article.investigationStatus,
        location: article.location,
        casualties: article.casualties,
        timeline: article.timeline
      };
    } else if (input.includes("cases") || input.includes("fir")) {
      responseText = `**DATABASE INDEX: Active Cases**\n\nCurrently tracking ${casesData.length} critical FIR files under electronic surveillance:\n\n` + 
        casesData.map(c => `• **${c.firNumber}**: ${c.title} (${c.status})`).join("\n");
    } else {
      responseText = `**KSP COPS Search Engine returned 0 exact directory matches.**\n\nI have run a semantic vector search on the broader intelligence network for: *"${userInput}"*.\n\n*Suggestion:* Try clicking one of the tactical presets below (like the **4 June 2025 Bengaluru news** check) to view structured incident timelines, casualties, and evidence lockers.`;
    }

    const botMsg = {
      id: Date.now() + 1,
      sender: "bot",
      text: responseText,
      data: extraData,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  const triggerVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    
    setTimeout(() => {
      setIsListening(false);
      const voicePrompts = [
        "4 June 2025 Bengaluru news",
        "Show me Hubballi cybercrime statistics",
        "Inspect active drug cases in Mangaluru"
      ];
      const randomPrompt = voicePrompts[Math.floor(Math.random() * voicePrompts.length)];
      setQuery(randomPrompt);
      handleSend(randomPrompt);
    }, 3200);
  };

  return (
    <div className="glass-panel rounded-xl border border-red-500/20 shadow-sm w-full flex flex-col h-[650px] overflow-hidden scanlines bg-white/80">
      
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-red-500/10 px-4 py-3 bg-red-50/30">
        <div className="flex items-center gap-2 font-mono text-xs text-red-600">
          <Bot className="w-4 h-4 text-red-500 animate-pulse" />
          <span>KSP CONVERSATIONAL INTELLIGENCE // AGENT_01</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-red-500">
          <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>COGNITIVE NLP GRID: ACTIVE</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && (
              <div className="w-8 h-8 rounded-full border border-red-500/30 flex items-center justify-center bg-red-50/50 text-red-600 shrink-0">
                <Bot className="w-4.5 h-4.5" />
              </div>
            )}
            
            <div className="max-w-[85%] space-y-2">
              <div
                className={`p-3.5 rounded-lg border leading-relaxed text-[13px] ${
                  msg.sender === "user"
                    ? "bg-red-500/10 border-red-400/20 text-red-950 shadow-sm"
                    : "bg-white border-red-500/10 text-gray-700 shadow-sm"
                }`}
              >
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} className={line.startsWith("**") ? "text-red-600 font-bold mt-1" : "mt-0.5"}>
                    {line.replace(/\*\*/g, "")}
                  </p>
                ))}

                {/* Structured UI response block */}
                {msg.data && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded border border-red-500/20 bg-red-50/30 space-y-3 font-mono text-xs text-gray-700"
                  >
                    <div className="flex justify-between items-center border-b border-red-500/10 pb-2">
                      <span className="font-bold text-red-700 uppercase">{msg.data.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        msg.data.status === "RESOLVED" || msg.data.status === "Closed"
                          ? "bg-green-500/10 text-green-700 border border-green-500/35"
                          : "bg-red-500/10 text-red-700 border border-red-500/35 animate-pulse"
                      }`}>
                        STATUS: {msg.data.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400">📍 Location:</span>
                        <p className="text-red-950 font-bold">{msg.data.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">⚠️ Incident Scale:</span>
                        <p className="text-red-950 font-bold">{msg.data.casualties}</p>
                      </div>
                      {msg.data.officer && (
                        <div className="col-span-2">
                          <span className="text-gray-400">👮 Assignee:</span>
                          <p className="text-red-950 font-bold">{msg.data.officer}</p>
                        </div>
                      )}
                    </div>

                    {msg.data.timeline && (
                      <div className="mt-2 border-t border-red-500/10 pt-2">
                        <span className="text-red-700 font-bold block mb-1">⏱️ Incident Timeline Log:</span>
                        <div className="space-y-1.5 pl-1.5 border-l border-red-500/20">
                          {msg.data.timeline.map((item, idx) => (
                            <div key={idx} className="text-[11px] leading-tight">
                              <span className="text-red-600 font-bold">[{item.time}]</span> {item.event}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.data.evidence && (
                      <div className="mt-2 border-t border-red-500/10 pt-2">
                        <span className="text-red-700 font-bold block mb-1">📁 Digital Evidence Locker:</span>
                        <div className="flex flex-wrap gap-2">
                          {msg.data.evidence.map((item, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white border border-red-500/10 rounded text-[10px] text-red-950 flex items-center gap-1.5">
                              📄 {item.name} ({item.size})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 block px-1">{msg.timestamp}</span>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full border border-red-400/30 flex items-center justify-center bg-red-500/10 text-red-600 shrink-0">
                <User className="w-4.5 h-4.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full border border-red-500/30 flex items-center justify-center bg-red-50/50 text-red-500 shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-lg border bg-white border-red-500/15 text-red-600 font-mono text-xs flex items-center gap-2 shadow-sm">
              <span className="typing-cursor">Querying decentralized police database registers</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested prompts presets */}
      <div className="px-4 py-2 border-t border-red-500/10 bg-red-50/5 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] text-red-500 font-mono">INTEL PRESETS:</span>
        <button
          onClick={() => handleSend("4 June 2025 Bengaluru news")}
          className="text-[11px] font-mono text-red-600 border border-red-500/20 hover:border-red-500 bg-red-50/20 hover:bg-red-500/10 rounded-full px-3 py-1 transition-all cursor-pointer"
        >
          🔍 4 June 2025 Bengaluru
        </button>
        <button
          onClick={() => handleSend("Identify active fraud rings in Hubballi")}
          className="text-[11px] font-mono text-red-600 border border-red-500/20 hover:border-red-500 bg-red-50/20 hover:bg-red-500/10 rounded-full px-3 py-1 transition-all cursor-pointer"
        >
          🔍 Hubballi fraud syndicate
        </button>
        <button
          onClick={() => handleSend("List all open FIR files")}
          className="text-[11px] font-mono text-red-600 border border-red-500/20 hover:border-red-500 bg-red-50/20 hover:bg-red-500/10 rounded-full px-3 py-1 transition-all cursor-pointer"
        >
          📂 All FIRs
        </button>
      </div>

      {/* Voice Recording Hologram Overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-10 border border-red-500/20"
          >
            <div className="relative mb-6">
              <span className="absolute -inset-4 rounded-full border border-red-500/20 animate-ping" />
              <span className="absolute -inset-8 rounded-full border border-red-500/10 animate-ping" style={{ animationDelay: "0.5s" }} />
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center text-red-500 shadow-neon-red">
                <Mic className="w-7 h-7 animate-pulse" />
              </div>
            </div>
            <p className="font-mono text-sm text-red-700 font-bold tracking-widest uppercase mb-1">
              Voice Wave Transmission Active
            </p>
            <p className="font-mono text-xs text-red-600/60 mb-6">
              Listening for police dispatch vocal commands...
            </p>
            
            <div className="flex gap-1 h-8 items-end">
              {[...Array(12)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="w-1 bg-red-500 rounded-full"
                  animate={{
                    height: [8, Math.random() * 28 + 8, 8]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + idx * 0.05,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <button
              onClick={() => setIsListening(false)}
              className="mt-8 px-4 py-1.5 rounded-lg border border-red-500/20 font-mono text-xs text-red-500 hover:bg-red-500/5 cursor-pointer"
            >
              Cancel Audio Feed
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex border-t border-red-500/10 bg-red-50/20 p-3 items-center gap-2"
      >
        <button
          type="button"
          onClick={triggerVoiceSearch}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
            isListening
              ? "bg-red-600 text-white shadow-neon-red"
              : "border border-red-500/20 hover:border-red-400 text-red-500 hover:bg-red-500/5"
          }`}
        >
          {isListening ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI assistant, e.g. '4 June 2025 Bengaluru news'..."
          className="flex-1 bg-white border border-red-500/20 rounded-lg px-4 py-2 font-mono text-[13px] text-red-950 placeholder-red-500/30 focus:outline-none focus:border-red-500 focus:shadow-neon-red/10 transition-all"
        />

        <button
          type="submit"
          className="w-10 h-10 rounded-lg bg-red-600 border border-red-600 hover:bg-red-500 hover:border-red-500 text-white flex items-center justify-center transition-all cursor-pointer hover:shadow-neon-red"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
}
