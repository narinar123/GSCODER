import { useState, useMemo } from "react";
import {
  Search, Plus, Play, Pause, ChevronRight, MoreHorizontal,
  Zap, Code2, Globe, Megaphone, Users, HeadphonesIcon, BookOpen,
  Server, Bot, ArrowRight, Brain, Shield, Eye, Sparkles,
  CheckCircle2, Clock, AlertCircle, X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// ── Workflow Templates ──────────────────────────────────────
interface Workflow {
  id: string;
  name: string;
  desc: string;
  category: string;
  steps: string[];
  agents?: string[];
  trigger: string;
  status: "active" | "paused" | "draft" | "template";
  runs: number;
  memory?: boolean;
  approval?: boolean;
}

const categories = [
  { id: "all", label: "All", icon: Zap, count: 0 },
  { id: "development", label: "Development", icon: Code2, count: 40 },
  { id: "ai_agents", label: "AI Agents", icon: Bot, count: 25 },
  { id: "marketing", label: "Marketing", icon: Megaphone, count: 20 },
  { id: "sales", label: "Sales", icon: Users, count: 15 },
  { id: "support", label: "Support", icon: HeadphonesIcon, count: 15 },
  { id: "research", label: "Research", icon: BookOpen, count: 15 },
  { id: "automation", label: "Automation", icon: Zap, count: 10 },
  { id: "devops", label: "DevOps", icon: Server, count: 10 },
];

const workflows: Workflow[] = [
  // ── Development ───────────────
  { id: "w1", name: "AI SaaS Builder", desc: "Build complete SaaS application with multi-agent collaboration", category: "development", steps: ["Requirements", "PRD", "UI Design", "DB Design", "API Gen", "Frontend Gen", "Testing", "Deployment"], agents: ["Product Manager", "UX Designer", "Frontend Dev", "Backend Dev", "QA Engineer", "DevOps"], trigger: "user_prompt", status: "active", runs: 1247, memory: true, approval: true },
  { id: "w2", name: "Website Builder", desc: "Full website from business analysis to deployment", category: "development", steps: ["Business Analysis", "Sitemap", "Wireframe", "Content", "Design", "Development", "SEO", "Deploy"], trigger: "user_prompt", status: "active", runs: 892 },
  { id: "w3", name: "Landing Page Generator", desc: "High-converting landing page creation pipeline", category: "development", steps: ["Offer Analysis", "Copywriting", "Hero Gen", "Sections", "CTA Gen", "SEO", "Publish"], trigger: "user_prompt", status: "active", runs: 2341 },
  { id: "w4", name: "Code Review Agent", desc: "Automated code review with security & performance checks", category: "development", steps: ["Clone Repo", "Scan Code", "Find Bugs", "Security Review", "Perf Review", "Report"], trigger: "github_push", status: "active", runs: 3456 },
  { id: "w5", name: "GitHub Repository Agent", desc: "Repository management, docs, issues, and PRs", category: "development", steps: ["Clone Repo", "Read Codebase", "Generate Docs", "Open Issues", "Create PRs"], trigger: "manual", status: "active", runs: 567 },
  { id: "w6", name: "Bug Fix Agent", desc: "Automated bug reproduction, analysis and fix", category: "development", steps: ["Reproduce", "Analyze Logs", "Identify Issue", "Generate Fix", "Test Fix", "Deploy Fix"], trigger: "jira_ticket", status: "active", runs: 789 },
  { id: "w7", name: "OpenCode Style Generator", desc: "Multi-agent code generation with architect pattern", category: "development", steps: ["Plan", "Generate", "Review", "Test", "Deploy"], agents: ["Architect", "Frontend", "Backend", "QA"], trigger: "user_prompt", status: "active", runs: 1023 },
  { id: "w8", name: "Repository Refactor", desc: "Claude Code style repository analysis & refactoring", category: "development", steps: ["Read Repository", "Analyze Structure", "Refactor", "Update Tests", "Create PR"], trigger: "manual", status: "template", runs: 0 },
  { id: "w9", name: "API Generator", desc: "Generate REST/GraphQL APIs from specifications", category: "development", steps: ["Parse Spec", "Generate Models", "Generate Routes", "Auth Layer", "Docs", "Test"], trigger: "user_prompt", status: "active", runs: 445 },
  { id: "w10", name: "Database Designer", desc: "Design database schema from requirements", category: "development", steps: ["Analyze Requirements", "ER Diagram", "Schema Gen", "Migrations", "Seed Data"], trigger: "user_prompt", status: "active", runs: 334 },
  { id: "w11", name: "Component Library Builder", desc: "Generate design system components", category: "development", steps: ["Design Tokens", "Base Components", "Composite", "Docs", "Storybook", "Publish"], trigger: "manual", status: "template", runs: 0 },
  { id: "w12", name: "Mobile App Generator", desc: "React Native / Flutter app from specs", category: "development", steps: ["Platform Selection", "UI Kit", "Navigation", "Screens", "API Integration", "Build"], trigger: "user_prompt", status: "active", runs: 278 },
  { id: "w13", name: "Microservice Scaffolder", desc: "Generate microservice boilerplate with Docker", category: "development", steps: ["Service Design", "Generate Code", "Docker Setup", "API Gateway", "Deploy"], trigger: "manual", status: "template", runs: 0 },
  { id: "w14", name: "Test Suite Generator", desc: "Generate comprehensive test suites", category: "development", steps: ["Analyze Code", "Unit Tests", "Integration Tests", "E2E Tests", "Coverage Report"], trigger: "github_push", status: "active", runs: 1567 },
  // ── AI Agents ─────────────────
  { id: "w20", name: "Multi-Agent Execution", desc: "Coordinated multi-agent task execution", category: "ai_agents", steps: ["Task Decomposition", "Agent Assignment", "Parallel Exec", "Merge Results", "Review", "Deliver"], agents: ["PM", "UX", "UI", "Frontend", "Backend", "QA", "DevOps"], trigger: "user_prompt", status: "active", runs: 2100, memory: true, approval: true },
  { id: "w21", name: "Super Agent", desc: "Autonomous agent with all capabilities", category: "ai_agents", steps: ["Understand", "Plan", "Research", "Execute", "Review", "Deliver"], agents: ["CEO", "PM", "Researcher", "Designer", "Developer", "QA", "DevOps", "Marketing"], trigger: "user_prompt", status: "active", runs: 890, memory: true },
  { id: "w22", name: "RAG Pipeline", desc: "Document upload → chunking → embedding → retrieval", category: "ai_agents", steps: ["Upload Document", "Chunking", "Embedding", "Vector Storage", "Retrieval", "Response Gen"], trigger: "webhook", status: "active", runs: 4521 },
  { id: "w23", name: "MCP Execution", desc: "Model Context Protocol server orchestration", category: "ai_agents", steps: ["Tool Selection", "Permission Check", "Execution", "Logging", "Audit"], trigger: "agent_call", status: "active", runs: 8900 },
  { id: "w24", name: "Agentic Browser", desc: "Autonomous web browsing and data extraction", category: "ai_agents", steps: ["Open Browser", "Navigate", "Extract Data", "Fill Forms", "Download", "Submit"], trigger: "user_prompt", status: "active", runs: 567 },
  { id: "w25", name: "Agent Memory Manager", desc: "Persistent memory across agent sessions", category: "ai_agents", steps: ["Load Context", "Process Input", "Update Memory", "Prune Old", "Sync Shared"], trigger: "automatic", status: "active", runs: 12400 },
  { id: "w26", name: "LLM Router", desc: "Intelligent model selection based on task", category: "ai_agents", steps: ["Classify Task", "Select Model", "Cost Check", "Route", "Fallback"], trigger: "automatic", status: "active", runs: 45000 },
  { id: "w27", name: "Agent Training Pipeline", desc: "Fine-tune agents on custom data", category: "ai_agents", steps: ["Collect Data", "Format", "Fine-tune", "Evaluate", "Deploy Model"], trigger: "manual", status: "template", runs: 0 },
  { id: "w28", name: "Vision Analysis Agent", desc: "Image and document visual analysis", category: "ai_agents", steps: ["Upload Image", "OCR", "Object Detection", "Analysis", "Report"], trigger: "user_prompt", status: "active", runs: 345 },
  // ── Marketing ─────────────────
  { id: "w30", name: "SEO Optimizer", desc: "Full SEO workflow from research to monitoring", category: "marketing", steps: ["Keyword Research", "Content Gap", "Content Gen", "Optimization", "Rank Monitor"], trigger: "schedule", status: "active", runs: 1890 },
  { id: "w31", name: "Social Media Manager", desc: "Trend research to post scheduling", category: "marketing", steps: ["Research Trends", "Generate Posts", "Generate Images", "Schedule", "Analytics"], trigger: "cron", status: "active", runs: 2340 },
  { id: "w32", name: "Content Creation Pipeline", desc: "Research → outline → draft → publish", category: "marketing", steps: ["Research", "Outline", "Draft", "Optimize", "Publish"], trigger: "manual", status: "active", runs: 1567 },
  { id: "w33", name: "Email Campaign Builder", desc: "Design and send email campaigns", category: "marketing", steps: ["Segment Audience", "Write Copy", "Design Template", "A/B Test", "Send", "Analytics"], trigger: "manual", status: "active", runs: 445 },
  { id: "w34", name: "Ad Campaign Generator", desc: "Generate ad creatives and copy", category: "marketing", steps: ["Audience Research", "Copy Variants", "Creative Gen", "Platform Setup", "Launch", "Optimize"], trigger: "manual", status: "template", runs: 0 },
  { id: "w35", name: "Competitor Analysis", desc: "Deep competitor research and comparison", category: "marketing", steps: ["Find Competitors", "Crawl Sites", "Extract Features", "Pricing Analysis", "Comparison", "Report"], trigger: "user_prompt", status: "active", runs: 678 },
  { id: "w36", name: "Brand Voice Generator", desc: "Create consistent brand messaging", category: "marketing", steps: ["Analyze Brand", "Define Voice", "Create Guidelines", "Generate Templates", "Review"], trigger: "manual", status: "template", runs: 0 },
  // ── Sales ──────────────────────
  { id: "w40", name: "Lead Generation", desc: "Find, enrich, score and outreach leads", category: "sales", steps: ["Find Leads", "Enrich Data", "Score Leads", "Outreach", "CRM Update"], trigger: "schedule", status: "active", runs: 3400 },
  { id: "w41", name: "Sales Outreach", desc: "Personalized cold outreach automation", category: "sales", steps: ["Research Prospect", "Personalize Email", "Send Sequence", "Follow Up", "Book Meeting"], trigger: "cron", status: "active", runs: 2100 },
  { id: "w42", name: "Proposal Generator", desc: "Auto-generate sales proposals", category: "sales", steps: ["Gather Requirements", "Pricing Calc", "Draft Proposal", "Design", "Send"], trigger: "manual", status: "active", runs: 234 },
  { id: "w43", name: "CRM Enrichment", desc: "Enrich CRM contacts with AI", category: "sales", steps: ["Scan CRM", "Find Data", "Enrich Profiles", "Score", "Update CRM"], trigger: "schedule", status: "active", runs: 8900 },
  // ── Support ────────────────────
  { id: "w50", name: "Customer Support Agent", desc: "AI-powered ticket resolution", category: "support", steps: ["Ticket Analysis", "Knowledge Search", "Response Gen", "Escalation", "Resolution"], trigger: "webhook", status: "active", runs: 12300 },
  { id: "w51", name: "Knowledge Base Builder", desc: "Auto-generate support docs", category: "support", steps: ["Analyze Tickets", "Find Patterns", "Draft Articles", "Review", "Publish"], trigger: "schedule", status: "active", runs: 567 },
  { id: "w52", name: "Feedback Analyzer", desc: "Analyze customer feedback at scale", category: "support", steps: ["Collect Feedback", "Sentiment Analysis", "Categorize", "Prioritize", "Report"], trigger: "webhook", status: "active", runs: 2340 },
  // ── Research ───────────────────
  { id: "w60", name: "Deep Research Agent", desc: "Systematic deep research with citations", category: "research", steps: ["Search", "Crawl", "Extract", "Analyze", "Summarize", "Report"], trigger: "user_prompt", status: "active", runs: 4500 },
  { id: "w61", name: "Market Research", desc: "Industry and market analysis", category: "research", steps: ["Define Scope", "Data Collection", "Analysis", "Trends", "Forecast", "Report"], trigger: "manual", status: "active", runs: 345 },
  { id: "w62", name: "Academic Paper Analyzer", desc: "Parse and summarize research papers", category: "research", steps: ["Upload Paper", "Parse", "Extract Key Points", "Cross-Reference", "Summary"], trigger: "user_prompt", status: "active", runs: 789 },
  { id: "w63", name: "Patent Search", desc: "Search and analyze patents", category: "research", steps: ["Define Query", "Search Patents", "Analyze Claims", "Prior Art", "Report"], trigger: "manual", status: "template", runs: 0 },
  // ── Automation ──────────────────
  { id: "w70", name: "Zapier-Style Automation", desc: "If-this-then-that automation chains", category: "automation", steps: ["Define Trigger", "Map Data", "Execute Action", "Log", "Monitor"], trigger: "webhook", status: "active", runs: 23400 },
  { id: "w71", name: "Data Sync Pipeline", desc: "Sync data between platforms", category: "automation", steps: ["Source Connect", "Transform", "Validate", "Sync", "Verify"], trigger: "cron", status: "active", runs: 15600 },
  { id: "w72", name: "Notification Engine", desc: "Multi-channel notification routing", category: "automation", steps: ["Event Trigger", "Route", "Template", "Send", "Track"], trigger: "webhook", status: "active", runs: 45000 },
  // ── DevOps ─────────────────────
  { id: "w80", name: "Deployment Pipeline", desc: "Build → Docker → Test → Deploy → Monitor", category: "devops", steps: ["Build", "Dockerize", "Test", "Deploy", "Verify", "Monitor"], trigger: "github_push", status: "active", runs: 5670 },
  { id: "w81", name: "Infrastructure Setup", desc: "Provision cloud infrastructure with IaC", category: "devops", steps: ["Design Infra", "Generate Terraform", "Plan", "Apply", "Verify"], trigger: "manual", status: "active", runs: 234 },
  { id: "w82", name: "Security Scan Pipeline", desc: "Continuous security scanning", category: "devops", steps: ["Dep Scan", "SAST", "DAST", "Container Scan", "Report", "Alert"], trigger: "cron", status: "active", runs: 3400 },
  { id: "w83", name: "Incident Response", desc: "Automated incident detection and response", category: "devops", steps: ["Detect", "Classify", "Alert", "Diagnose", "Remediate", "Postmortem"], trigger: "webhook", status: "active", runs: 123 },
];

// update "all" count
categories[0].count = workflows.length;

const triggerLabels: Record<string, string> = {
  user_prompt: "User Prompt", github_push: "GitHub Push", manual: "Manual", webhook: "Webhook",
  schedule: "Schedule", cron: "Cron", jira_ticket: "Jira Ticket", agent_call: "Agent Call",
  automatic: "Automatic", stripe_event: "Stripe Event",
};

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  active: { color: "text-success bg-success/10", icon: CheckCircle2 },
  paused: { color: "text-warning bg-warning/10", icon: Pause },
  draft: { color: "text-muted-foreground bg-muted", icon: Clock },
  template: { color: "text-primary bg-primary/10", icon: Sparkles },
};

export default function AutomationsPage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Workflow | null>(null);

  const filtered = useMemo(() => workflows.filter((w) => {
    if (cat !== "all" && w.category !== cat) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [cat, search]);

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Workflows & Automations</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {workflows.length} workflow templates · {workflows.filter((w) => w.status === "active").length} active · {workflows.reduce((a, w) => a + w.runs, 0).toLocaleString()} total runs
          </p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl text-xs"><Plus className="w-3.5 h-3.5" /> Create Workflow</Button>
      </div>

      {/* Master Pipeline Preview */}
      <MasterPipeline />

      {/* Category Tabs */}
      <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl border border-border overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all ${
              cat === c.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <c.icon className="w-3 h-3" />
            {c.label}
            <span className={`ml-0.5 ${cat === c.id ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>{c.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search workflows..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-8 text-xs bg-secondary border-border rounded-xl" />
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((wf, i) => (
          <WorkflowCard key={wf.id} wf={wf} index={i} onSelect={() => setSelected(wf)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground text-sm">No workflows match your filters</div>
      )}

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && <WorkflowDrawer wf={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ── Master Pipeline ──────────────────────────── */
function MasterPipeline() {
  const pipelineSteps = ["User Request", "Product Manager", "UX Designer", "Frontend Agent", "Backend Agent", "QA Agent", "DevOps Agent", "Live"];
  return (
    <div className="border border-border rounded-2xl bg-card p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Master Multi-Agent Pipeline</p>
        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
          <Brain className="w-3 h-3 text-primary" /> Shared Memory
          <Shield className="w-3 h-3 text-primary ml-2" /> Human Approval
          <Eye className="w-3 h-3 text-primary ml-2" /> Observable
        </div>
      </div>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {pipelineSteps.map((step, i) => (
          <div key={step} className="flex items-center gap-1.5 shrink-0">
            <div className={`px-3 py-1.5 rounded-lg border text-[9px] font-medium whitespace-nowrap transition-all ${
              i === 0 ? "border-primary bg-primary/10 text-primary" :
              i === pipelineSteps.length - 1 ? "border-success/30 bg-success/10 text-success" :
              "border-border bg-secondary/50 text-muted-foreground"
            }`}>
              {step}
            </div>
            {i < pipelineSteps.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground/50 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Workflow Card ─────────────────────────────── */
function WorkflowCard({ wf, index, onSelect }: { wf: Workflow; index: number; onSelect: () => void }) {
  const sc = statusConfig[wf.status];
  const StatusIcon = sc.icon;
  const catInfo = categories.find((c) => c.id === wf.category);
  const CatIcon = catInfo?.icon || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.015 }}
      onClick={onSelect}
      className="border border-border rounded-2xl bg-card p-4 hover:border-primary/30 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <CatIcon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-semibold ${sc.color}`}>
            <StatusIcon className="w-2.5 h-2.5" /> {wf.status}
          </span>
          <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <h3 className="mt-2.5 text-xs font-semibold text-foreground">{wf.name}</h3>
      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{wf.desc}</p>

      {/* Mini step pipeline */}
      <div className="flex items-center gap-0.5 mt-3 overflow-hidden">
        {wf.steps.slice(0, 5).map((step, i) => (
          <div key={i} className="flex items-center gap-0.5 shrink-0">
            <div className="px-1.5 py-0.5 rounded bg-secondary text-[7px] font-medium text-muted-foreground truncate max-w-[64px]">{step}</div>
            {i < Math.min(wf.steps.length, 5) - 1 && <ChevronRight className="w-2 h-2 text-muted-foreground/40 shrink-0" />}
          </div>
        ))}
        {wf.steps.length > 5 && <span className="text-[7px] text-muted-foreground ml-0.5">+{wf.steps.length - 5}</span>}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border text-[9px] text-muted-foreground">
        <span>{triggerLabels[wf.trigger] || wf.trigger}</span>
        <span>{wf.runs > 0 ? `${wf.runs.toLocaleString()} runs` : "Template"}</span>
      </div>
    </motion.div>
  );
}

/* ── Workflow Drawer ───────────────────────────── */
function WorkflowDrawer({ wf, onClose }: { wf: Workflow; onClose: () => void }) {
  const sc = statusConfig[wf.status];
  const StatusIcon = sc.icon;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: 420 }}
        animate={{ x: 0 }}
        exit={{ x: 420 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-md bg-card border-l border-border h-full overflow-y-auto"
      >
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-sm font-bold text-foreground truncate">{wf.name}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Meta */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${sc.color}`}>
              <StatusIcon className="w-3 h-3" /> {wf.status}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-secondary text-[10px] font-medium text-muted-foreground">{triggerLabels[wf.trigger]}</span>
            {wf.memory && <span className="px-2.5 py-1 rounded-full bg-primary/10 text-[10px] font-medium text-primary">Memory</span>}
            {wf.approval && <span className="px-2.5 py-1 rounded-full bg-primary/10 text-[10px] font-medium text-primary">Approval</span>}
          </div>

          <p className="text-sm text-muted-foreground">{wf.desc}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Runs", val: wf.runs.toLocaleString() },
              { label: "Steps", val: wf.steps.length.toString() },
              { label: "Agents", val: (wf.agents?.length || 0).toString() },
            ].map((s) => (
              <div key={s.label} className="border border-border rounded-xl px-3 py-2.5 bg-secondary/30">
                <p className="text-[8px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <p className="text-base font-bold text-foreground">{s.val}</p>
              </div>
            ))}
          </div>

          {/* Pipeline Steps */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3">Execution Pipeline</p>
            <div className="space-y-0">
              {wf.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center text-[8px] font-bold text-primary">{i + 1}</div>
                    {i < wf.steps.length - 1 && <div className="w-px h-6 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-medium text-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agents */}
          {wf.agents && wf.agents.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-2">Assigned Agents</p>
              <div className="flex flex-wrap gap-1.5">
                {wf.agents.map((agent) => (
                  <span key={agent} className="px-2.5 py-1 rounded-lg bg-secondary border border-border text-[10px] font-medium text-foreground">{agent}</span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1 rounded-xl text-xs gap-1.5" size="sm">
              <Play className="w-3 h-3" /> {wf.status === "template" ? "Use Template" : "Run Now"}
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl text-xs" size="sm">Configure</Button>
          </div>

          {/* JSON Preview */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-2">Schema</p>
            <pre className="bg-background rounded-xl border border-border p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto leading-relaxed">
{JSON.stringify({
  id: wf.id,
  name: wf.name,
  trigger: { type: wf.trigger },
  steps: wf.steps,
  agents: wf.agents || [],
  memory: wf.memory || false,
  approval_required: wf.approval || false,
  status: wf.status,
}, null, 2)}
            </pre>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
