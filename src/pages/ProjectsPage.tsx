import { useState } from "react";
import { Plus, MoreHorizontal, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const projects = [
  { name: "GSQoderAI Platform", desc: "Main AI agent platform build", status: "active", agents: 6, tasks: 45, progress: 72 },
  { name: "Marketing Website", desc: "Company landing page redesign", status: "active", agents: 3, tasks: 18, progress: 89 },
  { name: "Mobile App v2", desc: "React Native mobile application", status: "active", agents: 4, tasks: 32, progress: 45 },
  { name: "API Gateway", desc: "Unified API gateway service", status: "paused", agents: 2, tasks: 12, progress: 60 },
  { name: "Data Pipeline", desc: "Real-time analytics pipeline", status: "active", agents: 3, tasks: 22, progress: 34 },
  { name: "Customer Portal", desc: "Self-service client dashboard", status: "completed", agents: 5, tasks: 38, progress: 100 },
];

const statusConfig: Record<string, { dot: string; label: string }> = {
  active: { dot: "bg-success", label: "Active" },
  paused: { dot: "bg-warning", label: "Paused" },
  completed: { dot: "bg-primary", label: "Completed" },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{projects.length} projects</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl text-xs"><Plus className="w-3.5 h-3.5" /> New Project</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="border border-border rounded-2xl bg-card p-5 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <FolderKanban className="w-4 h-4 text-primary" />
              </div>
              <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">{p.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">{p.desc}</p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">{p.agents} agents · {p.tasks} tasks</span>
                <span className="text-foreground font-medium">{p.progress}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-bar rounded-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[p.status].dot}`} />
              <span className="text-[10px] text-muted-foreground">{statusConfig[p.status].label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
