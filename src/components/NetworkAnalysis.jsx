import React, { useEffect, useRef, useState } from "react";
import { User, Cpu, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { networkData } from "../data/mockData";

export default function NetworkAnalysis() {
  const canvasRef = useRef(null);
  const [selectedSuspect, setSelectedSuspect] = useState(networkData.nodes[0]); // default to Rohan Kamath
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 600);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener("resize", handleResize);

    const nodePositions = {
      "Rohan Kamath": { x: width * 0.25, y: height * 0.3 },
      "Vikram Raj": { x: width * 0.5, y: height * 0.35 },
      "Dinesh Mehta": { x: width * 0.2, y: height * 0.7 },
      "Karthik Shetty": { x: width * 0.75, y: height * 0.3 },
      "Suresh Gowda": { x: width * 0.8, y: height * 0.7 },
      "Manoj Swamy": { x: width * 0.5, y: height * 0.75 }
    };

    const linkParticles = networkData.links.map((link) => ({
      source: link.source,
      target: link.target,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.005
    }));

    const handleMouseClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (const node of networkData.nodes) {
        const pos = nodePositions[node.id];
        if (!pos) continue;

        const dx = clickX - pos.x;
        const dy = clickY - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= node.size) {
          setSelectedSuspect(node);
          return;
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let foundHover = null;
      for (const node of networkData.nodes) {
        const pos = nodePositions[node.id];
        if (!pos) continue;

        const dx = mouseX - pos.x;
        const dy = mouseY - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= node.size) {
          foundHover = node.id;
          break;
        }
      }
      setHoveredNode(foundHover);
    };

    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Links
      networkData.links.forEach((link) => {
        const pSource = nodePositions[link.source];
        const pTarget = nodePositions[link.target];
        if (!pSource || !pTarget) return;

        const isHighlighted = selectedSuspect
          ? selectedSuspect.id === link.source || selectedSuspect.id === link.target
          : false;

        ctx.beginPath();
        ctx.moveTo(pSource.x, pSource.y);
        ctx.lineTo(pTarget.x, pTarget.y);
        ctx.strokeStyle = isHighlighted 
          ? "rgba(220, 38, 38, 0.6)" 
          : "rgba(220, 38, 38, 0.12)";
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.shadowBlur = isHighlighted ? 8 : 0;
        ctx.shadowColor = "#dc2626";
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (isHighlighted) {
          const midX = (pSource.x + pTarget.x) / 2;
          const midY = (pSource.y + pTarget.y) / 2;
          ctx.font = "bold 9px Space Grotesk";
          ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
          ctx.textAlign = "center";
          ctx.fillText(link.label, midX, midY - 6);
        }
      });

      // 2. Draw link particles
      linkParticles.forEach((part) => {
        const pSource = nodePositions[part.source];
        const pTarget = nodePositions[part.target];
        if (!pSource || !pTarget) return;

        part.progress += part.speed;
        if (part.progress >= 1) part.progress = 0;

        const partX = pSource.x + (pTarget.x - pSource.x) * part.progress;
        const partY = pSource.y + (pTarget.y - pSource.y) * part.progress;

        ctx.beginPath();
        ctx.arc(partX, partY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#dc2626";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#dc2626";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Draw Nodes
      networkData.nodes.forEach((node) => {
        const pos = nodePositions[node.id];
        if (!pos) return;

        const isSelected = selectedSuspect && selectedSuspect.id === node.id;
        const isHovered = hoveredNode === node.id;
        const size = node.size;

        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, size + 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(220, 38, 38, 0.35)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isSelected 
          ? "#dc2626" 
          : node.group === 1 
            ? "rgba(239, 68, 68, 0.35)" 
            : "rgba(185, 28, 28, 0.35)";
        ctx.strokeStyle = isSelected 
          ? "#ffffff" 
          : node.group === 1 
            ? "#ef4444" 
            : "#b91c1c";
        ctx.lineWidth = 2;
        ctx.shadowBlur = isSelected || isHovered ? 12 : 0;
        ctx.shadowColor = isSelected ? "#dc2626" : node.group === 1 ? "#ef4444" : "#b91c1c";
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.font = "bold 10px Space Grotesk";
        ctx.fillStyle = isSelected ? "#dc2626" : "rgba(31, 41, 55, 0.85)";
        ctx.textAlign = "center";
        ctx.fillText(node.id, pos.x, pos.y + size + 14);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleMouseClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedSuspect, hoveredNode]);

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600">
          Criminal Network Analysis
        </h2>
        <p className="text-xs font-mono text-red-500/70 mt-1">
          AI relationship mapping and spatial affiliation tracking of regional crime organizations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Canvas Network Plot */}
        <div className="lg:col-span-2 glass-panel rounded-xl border border-red-500/10 overflow-hidden relative bg-white">
          <div className="absolute top-3 left-3 font-mono text-[9px] text-red-600/40">
            SYS: DYNAMIC_FORCE_SIMULATOR_ACTIVE
          </div>
          <div className="absolute top-3 right-3 font-mono text-[9px] text-red-600/40">
            CLICK NODES TO DRILL DOSSIER
          </div>
          <canvas ref={canvasRef} className="w-full block" />
        </div>

        {/* Suspect Dossier Panel */}
        <div className="space-y-4 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedSuspect && (
              <motion.div
                key={selectedSuspect.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="glass-panel rounded-xl p-5 border border-red-500/15 flex-1 flex flex-col justify-between bg-red-50/5"
              >
                <div className="space-y-4 font-mono">
                  {/* Title and Avatar */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded border border-red-500/30 bg-red-50/50 flex items-center justify-center text-red-600 shrink-0 shadow-inner">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block font-bold">SUBJECT DOSSIER</span>
                      <h4 className="text-sm font-bold text-gray-900 uppercase">{selectedSuspect.id}</h4>
                    </div>
                  </div>

                  {/* Param grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-red-500/10 py-3">
                    <div>
                      <span className="text-gray-400 block">Affiliation:</span>
                      <span className="text-red-950 font-bold">Group {selectedSuspect.group}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Vocal Role:</span>
                      <span className="text-red-950 font-bold block truncate">{selectedSuspect.role}</span>
                    </div>
                  </div>

                  {/* Active cases matches */}
                  <div>
                    <span className="text-red-600 font-bold text-xs uppercase block mb-1">🔍 Intelligence Summary:</span>
                    <p className="text-[11px] text-gray-500 leading-relaxed p-2 bg-white border border-red-500/5 rounded">
                      {selectedSuspect.details}
                    </p>
                  </div>

                  {/* Tactical Threat status */}
                  <div className="p-3 bg-red-50/50 border border-red-500/20 rounded flex items-center gap-3 text-red-700 text-xs">
                    <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                    <div>
                      <span className="font-bold block uppercase">Surveillance Profile</span>
                      <p className="text-[10px] text-red-650/80">Cross-border financial routing flagged under AML protocols.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-red-500/5 flex items-center justify-between text-[10px] font-mono text-red-500 font-bold">
                  <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 animate-spin" /> RELATIONAL INDEX</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> SECURE_SEC</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
