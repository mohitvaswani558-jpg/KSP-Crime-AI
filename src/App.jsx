import React, { useState } from "react";
import { 
  Home, Bot, Newspaper, Map, BarChart3, FolderOpen, 
  Share2, Cpu, Clock, Radio, Search, Shield, ChevronRight, Menu, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import subcomponents
import ParticleBackground from "./components/ParticleBackground";
import Hero from "./components/Hero";
import AIChatAssistant from "./components/AIChatAssistant";
import NewsIntelligence from "./components/NewsIntelligence";
import CrimeHeatmap from "./components/CrimeHeatmap";
import InvestigationDashboard from "./components/InvestigationDashboard";
import CaseManagement from "./components/CaseManagement";
import NetworkAnalysis from "./components/NetworkAnalysis";
import PatternIntelligence from "./components/PatternIntelligence";
import TimelineVisualization from "./components/TimelineVisualization";
import AlertPanel from "./components/AlertPanel";
import AdvancedSearch from "./components/AdvancedSearch";
import Footer from "./components/Footer";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "hero", label: "Home Base", icon: Home },
    { id: "ai-assistant", label: "AI Assistant", icon: Bot },
    { id: "news", label: "Smart News", icon: Newspaper },
    { id: "heatmap", label: "Crime Heatmap", icon: Map },
    { id: "dashboard", label: "Analytics HUD", icon: BarChart3 },
    { id: "cases", label: "FIR Registry", icon: FolderOpen },
    { id: "network", label: "Network Link", icon: Share2 },
    { id: "patterns", label: "ML Patterns", icon: Cpu },
    { id: "timeline", label: "Chronology", icon: Clock },
    { id: "alerts", label: "Dispatch Ticker", icon: Radio },
    { id: "search", label: "Global Search", icon: Search },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden selection:bg-red-500/20 selection:text-red-700">
      
      {/* 3D Interactive Canvas Background */}
      <ParticleBackground />

      {/* Futuristic CRT Glass Overlay / Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-40 border-[8px] border-red-50/15 shadow-[inset_0_0_100px_rgba(220,38,38,0.02)]" />

      {/* Main Top Header HUD */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/85 backdrop-blur-md border-b border-red-500/10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div 
          onClick={() => scrollToSection("hero")} 
          className="flex items-center gap-2.5 text-red-600 font-bold font-display cursor-pointer hover:opacity-85 transition-opacity"
        >
          <Shield className="w-6 h-6 animate-pulse" />
          <span className="tracking-widest text-sm sm:text-base font-extrabold">
            KSP AI-COPS <span className="text-gray-400 font-normal font-mono text-xs">// SYSTEM V4.9</span>
          </span>
        </div>

        {/* System parameters ticker */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] text-gray-400 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            <span className="text-green-600 font-bold">GRID ONLINE</span>
          </div>
          <span>SECURE CORE: SHIELD_ACTIVE</span>
          <span>UPTIME: 100%</span>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded border border-red-500/20 text-red-500 hover:bg-red-500/10 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-white/95 border-b border-red-500/20 py-4 px-6 flex flex-col gap-3 lg:hidden backdrop-blur-lg shadow-xl font-mono"
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 px-4 py-2.5 rounded text-xs text-left text-red-650 hover:bg-red-500/10 cursor-pointer font-bold"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Sidebar Navigation HUD */}
      <nav className="fixed left-4 top-24 bottom-6 w-14 hover:w-48 bg-white/85 border border-red-500/15 rounded-xl z-20 flex flex-col items-center py-6 gap-5 shadow-sm transition-all duration-300 group hidden lg:flex hover:border-red-500/30 backdrop-blur-md">
        
        {/* Decorative Grid header */}
        <div className="w-8 border-b border-red-500/20 pb-2 mb-2 flex justify-center">
          <div className="grid grid-cols-2 gap-1 opacity-40">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-sm" />
            <span className="w-1.5 h-1.5 bg-red-400 rounded-sm" />
            <span className="w-1.5 h-1.5 bg-red-400 rounded-sm" />
            <span className="w-1.5 h-1.5 bg-red-400 rounded-sm" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col gap-3 w-full px-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-4 py-2 px-2.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 group/btn cursor-pointer w-full text-left"
            >
              <item.icon className="w-4.5 h-4.5 shrink-0 group-hover/btn:scale-110 transition-transform" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:pl-24 pt-24 pb-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section 1: Hero */}
        <motion.div
          id="hero"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="scroll-mt-24"
        >
          <Hero onNavigate={scrollToSection} />
        </motion.div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 2: AI Crime Assistant */}
        <motion.section
          id="ai-assistant"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-650">
                AI Crime Assistant
              </h2>
              <p className="text-xs font-mono text-red-500/70 mt-1">
                Direct cognitive console query interfaces. Run investigations using natural speech or text.
              </p>
            </div>
            <AIChatAssistant />
          </div>
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 3: Smart News Intelligence */}
        <motion.section
          id="news"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <NewsIntelligence />
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 4: Crime Heatmap */}
        <motion.section
          id="heatmap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <CrimeHeatmap />
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 5: Investigation Dashboard */}
        <motion.section
          id="dashboard"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <InvestigationDashboard />
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 6: FIR Management */}
        <motion.section
          id="cases"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <CaseManagement />
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 7: Criminal Network Analysis */}
        <motion.section
          id="network"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <NetworkAnalysis />
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 8: Crime Pattern Intelligence */}
        <motion.section
          id="patterns"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <PatternIntelligence />
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 9: Timeline Visualization */}
        <motion.section
          id="timeline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <TimelineVisualization />
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 10: Real-Time Alerts */}
        <motion.section
          id="alerts"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <div className="max-w-3xl mx-auto">
            <AlertPanel />
          </div>
        </motion.section>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" />

        {/* Section 11: Advanced Search Engine */}
        <motion.section
          id="search"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <div className="max-w-4xl mx-auto">
            <AdvancedSearch />
          </div>
        </motion.section>

      </main>

      {/* Section 12: Footer */}
      <Footer onNavigate={scrollToSection} />

    </div>
  );
}
