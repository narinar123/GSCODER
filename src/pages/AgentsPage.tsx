import { useState } from "react";
import { Search, Plus, Sparkles, Zap, Brain, MoreHorizontal, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const agents = [
  { name: "CEO Agent", role: "ceo", desc: "Strategic planning, decision-making, company vision", status: "active", model: "GPT-5", tasks: 142, colorIdx: 0 },
  { name: "Product Manager", role: "pm", desc: "Requirements, roadmap, user stories, PRDs", status: "active", model: "Claude 4", tasks: 238, colorIdx: 1 },
  { name: "UX Designer", role: "ux", desc: "User flows, wireframes, usability testing", status: "idle", model: "Gemini", tasks: 95, colorIdx: 2 },
  { name: "UI Designer", role: "ui", desc: "Visual design, design systems, components", status: "active", model: "Claude 4", tasks: 167, colorIdx: 3 },
  { name: "Frontend Developer", role: "frontend", desc: "React, Next.js, TypeScript, UI implementation", status: "running", model: "GPT-5", tasks: 312, colorIdx: 4 },
  { name: "Backend Developer", role: "backend", desc: "APIs, databases, microservices, FastAPI", status: "running", model: "DeepSeek V3", tasks: 287, colorIdx: 0 },
  { name: "Full Stack Engineer", role: "fullstack", desc: "End-to-end development, architecture", status: "active", model: "GPT-5", tasks: 405, colorIdx: 1 },
  { name: "DevOps Engineer", role: "devops", desc: "CI/CD, Docker, Kubernetes, infrastructure", status: "active", model: "Claude 4", tasks: 189, colorIdx: 2 },
  { name: "QA Engineer", role: "qa", desc: "Testing, automation, quality assurance", status: "idle", model: "Gemini", tasks: 156, colorIdx: 3 },
  { name: "Security Engineer", role: "security", desc: "Security audits, vulnerability scanning, RBAC", status: "active", model: "GPT-5", tasks: 78, colorIdx: 4 },
  { name: "Research Agent", role: "research", desc: "Deep research, analysis, data gathering", status: "active", model: "Claude 4", tasks: 234, colorIdx: 0 },
  { name: "SEO Agent", role: "seo", desc: "SEO optimization, keyword research, rankings", status: "idle", model: "Gemini", tasks: 67, colorIdx: 1 },
  { name: "Marketing Agent", role: "marketing", desc: "Campaigns, copy, social media, ads", status: "active", model: "GPT-5", tasks: 198, colorIdx: 2 },
  { name: "Sales Agent", role: "sales", desc: "Lead generation, outreach, CRM management", status: "active", model: "Claude 4", tasks: 145, colorIdx: 3 },
  { name: "Customer Support", role: "support", desc: "Tickets, responses, knowledge base, FAQs", status: "running", model: "GPT-5", tasks: 523, colorIdx: 4 },
  { name: "Data Analyst", role: "analyst", desc: "Data analysis, visualization, reporting", status: "active", model: "DeepSeek V3", tasks: 176, colorIdx: 0 },
  { name: "Content Writer", role: "writer", desc: "Blog posts, documentation, technical writing", status: "idle", model: "Claude 4", tasks: 289, colorIdx: 1 },
  { name: "Social Media Manager", role: "social", desc: "Content scheduling, engagement, analytics", status: "active", model: "Gemini", tasks: 134, colorIdx: 2 },
];

const chartColorClasses = [
  "bg-chart-1/15 text-chart-1",
  "bg-chart-2/15 text-chart-2",
  "bg-chart-3/15 text-chart-3",
  "bg-chart-4/15 text-chart-4",
  "bg-chart-5/15 text-chart-5",
];

const statusColors: Record<string, string> = {
  active: "bg-success/15 text-success",
  idle: "bg-muted text-muted-foreground",
  running: "bg-primary/15 text-primary",
};

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[0] | null>(null);

  const filtered = agents.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter !== "all" && a.status !== filter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">AI Agents</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {agents.length} agents • {agents.filter((a) => a.status === "running").length} running
          </p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl text-xs">
          <Plus className="w-3.5 h-3.5" /> Create Agent
        </Button>
      </div>

      {/* Multi-Agent Pipeline */}
      <div className="border border-border rounded-2xl bg-card p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3">
          Multi-Agent Pipeline
        </p>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {["User Request", "Product Manager", "UX Designer", "Frontend Agent", "Backend Agent", "QA Agent", "Deploy Agent"].map(
            (step, i) => (
              <div key={step} className="flex items-center gap-2 shrink-0">
                <div
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-medium whitespace-nowrap ${
                    i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {i < 6 && <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />}
              </div>
            )
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl border border-border">
          {["all", "active", "running", "idle"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all ${
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-56 h-8 text-xs bg-secondary border-border rounded-xl"
          />
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => setSelectedAgent(agent)}
            className="group border border-border rounded-2xl bg-card p-4 hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${chartColorClasses[agent.colorIdx]}`}>
                <Brain className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${statusColors[agent.status]}`}>
                  {agent.status}
                </span>
                <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">{agent.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{agent.desc}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {agent.model}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {agent.tasks} tasks
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agent Detail Drawer */}
      {selectedAgent && <AgentDrawer agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
    </div>
  );
}

function AgentDrawer({ agent, onClose }: { agent: (typeof agents)[0]; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        className="relative w-full max-w-md bg-card border-l border-border h-full overflow-y-auto p-6 space-y-6"
      >
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${chartColorClasses[agent.colorIdx]}`}>
            <Brain className="w-6 h-6" />
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted text-muted-foreground">
            ✕
          </button>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">{agent.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">{agent.desc}</p>
        </div>
        <div className="space-y-4">
          {[
            { label: "Status", value: agent.status },
            { label: "Model", value: agent.model },
            { label: "Tasks Completed", value: agent.tasks.toString() },
          ].map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-foreground capitalize">{item.value}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">System Prompt</p>
          <div className="bg-secondary rounded-xl p-3 text-xs text-muted-foreground font-mono leading-relaxed border border-border">
            You are a {agent.name}. Your role is: {agent.desc}. Execute tasks with precision, maintain context, collaborate
            with other agents, and report progress.
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Connected Tools</p>
          <div className="flex flex-wrap gap-1.5">
            {["Code Gen", "Search", "Browser", "File I/O", "API", "Memory", "Database"].map((tool) => (
              <span
                key={tool}
                className="px-2 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-medium text-primary"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 rounded-xl text-xs" size="sm">
            Run Agent
          </Button>
          <Button variant="outline" className="flex-1 rounded-xl text-xs" size="sm">
            Configure
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
