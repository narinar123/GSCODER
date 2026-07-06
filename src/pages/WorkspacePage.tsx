import { useState } from "react";
import {
  MessageCircle, Bot, Search, Code2, Palette, BarChart3, Zap,
  Plus, Paperclip, Mic, Send, MapPin, Cloud, Sparkles, Image,
  FileText, Database, Globe, Terminal, Cpu, Brain, Rocket,
  Shield, Wifi, Video, Mail, Phone, Calendar, Lock, Activity,
  Monitor, Wrench, Clock, Hash, Layers, GitBranch, Box, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const modes = [
  { icon: MessageCircle, label: "Chat" },
  { icon: Bot, label: "Agents" },
  { icon: Search, label: "Research" },
  { icon: Code2, label: "Code" },
  { icon: Palette, label: "Design" },
  { icon: BarChart3, label: "Analyze" },
  { icon: Zap, label: "Automate" },
  { icon: Sparkles, label: "Generate" },
  { icon: Image, label: "Vision" },
];

const quickActions = [
  "Build a SaaS boilerplate",
  "Create a landing page",
  "Analyze a document",
  "Write SQL query",
  "Generate marketing copy",
  "Setup employee onboarding",
  "Create automation workflow",
  "Design a dashboard",
];

const techStack = [
  { name: "Next.js", abbr: "NX" },
  { name: "React", abbr: "Re" },
  { name: "TypeScript", abbr: "TS" },
  { name: "Node.js", abbr: "No" },
  { name: "Python", abbr: "Py" },
  { name: "FastAPI", abbr: "FA" },
  { name: "TensorFlow", abbr: "TF" },
  { name: "PyTorch", abbr: "PT" },
  { name: "LangChain", abbr: "LC" },
  { name: "OpenAI", abbr: "OA" },
  { name: "Hugging Face", abbr: "HF" },
  { name: "Vercel", abbr: "Vc" },
  { name: "Docker", abbr: "Dk" },
  { name: "PostgreSQL", abbr: "PG" },
  { name: "Redis", abbr: "Rd" },
  { name: "GraphQL", abbr: "GQ" },
];

const aiSkillCategories = [
  {
    title: "AI & ML",
    skills: ["LLM Chat", "Text Generation", "Image Generation", "Speech-to-Text", "Text-to-Speech", "Embeddings", "RAG Pipeline", "Fine-Tuning", "Sentiment Analysis", "NER"],
  },
  {
    title: "Automation",
    skills: ["Workflow Builder", "Triggers", "Scheduled Tasks", "Webhooks", "API Chaining", "Data Pipeline", "ETL Process", "Auto-Reporting"],
  },
  {
    title: "Marketing",
    skills: ["SEO Analysis", "Ad Copy", "Social Media", "Email Campaign", "Content Calendar", "A/B Testing", "Analytics", "Lead Scoring"],
  },
  {
    title: "Development",
    skills: ["Code Review", "API Builder", "DB Schema", "Testing", "CI/CD", "Deployment", "Monitoring", "Documentation"],
  },
];

const agentApps = [
  { icon: Brain, label: "Memory" },
  { icon: Calendar, label: "Calendar" },
  { icon: Mail, label: "Email" },
  { icon: Video, label: "Meetings" },
  { icon: FileText, label: "Notes" },
  { icon: Database, label: "Knowledge" },
  { icon: Globe, label: "Browser" },
  { icon: Phone, label: "Phone" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: MessageCircle, label: "Slack" },
  { icon: Terminal, label: "Terminal" },
  { icon: Cpu, label: "Compute" },
  { icon: Shield, label: "Security" },
  { icon: Wifi, label: "Network" },
  { icon: Activity, label: "Activity" },
  { icon: Zap, label: "Triggers" },
  { icon: Monitor, label: "SaaS" },
  { icon: Lock, label: "Access" },
  { icon: Wrench, label: "Tools" },
  { icon: Clock, label: "Schedule" },
  { icon: Hash, label: "Tags" },
  { icon: Layers, label: "Layers" },
  { icon: GitBranch, label: "Git" },
  { icon: Box, label: "Packages" },
  { icon: Share2, label: "Share" },
  { icon: Rocket, label: "Deploy" },
  { icon: Image, label: "Vision" },
  { icon: Sparkles, label: "Gen AI" },
];

export default function WorkspacePage() {
  const [activeMode, setActiveMode] = useState("Chat");
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); setPrompt(""); }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Mode Selector */}
      <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-2xl border border-border overflow-x-auto">
        {modes.map((m) => (
          <button
            key={m.label}
            onClick={() => setActiveMode(m.label)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap ${
              activeMode === m.label
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <m.icon className="w-3.5 h-3.5" />
            {m.label}
          </button>
        ))}
      </div>

      {/* Prompt Engine */}
      <PromptEngine
        prompt={prompt}
        setPrompt={setPrompt}
        isProcessing={isProcessing}
        onSubmit={handleSubmit}
      />

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <motion.button
            key={action}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPrompt(action)}
            className="px-3.5 py-2 rounded-xl border border-border bg-secondary/40 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            {action}
          </motion.button>
        ))}
      </div>

      {/* Agent Apps Grid */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Agent Apps & Services</p>
        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-9 xl:grid-cols-10 gap-2">
          {agentApps.map((app, i) => (
            <motion.button
              key={app.label + i}
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl border border-border bg-secondary/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            >
              <app.icon className="w-4 h-4" />
              <span className="text-[8px] font-medium truncate w-full text-center">{app.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Technology Stack</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/40 text-xs font-medium text-foreground hover:border-primary/30 transition-colors"
            >
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                {tech.abbr}
              </div>
              {tech.name}
            </div>
          ))}
        </div>
      </div>

      {/* AI Skills Categories */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">AI Skills & Capabilities</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {aiSkillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              className="border border-border rounded-2xl bg-card overflow-hidden"
            >
              <button
                onClick={() => setExpandedCat(expandedCat === cat.title ? null : cat.title)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors"
              >
                <span className="text-xs font-semibold text-foreground">{cat.title}</span>
                <span className="text-[10px] text-muted-foreground">{cat.skills.length} skills</span>
              </button>
              <AnimatePresence>
                {expandedCat === cat.title && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-medium text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PromptEngine({
  prompt,
  setPrompt,
  isProcessing,
  onSubmit,
}: {
  prompt: string;
  setPrompt: (v: string) => void;
  isProcessing: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="border border-border rounded-2xl bg-card overflow-hidden focus-within:border-primary/50 transition-colors">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your idea. AI will handle the rest..."
          className="w-full bg-transparent px-5 pt-5 pb-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none min-h-[110px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSubmit();
          }}
        />
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border">
          <div className="flex items-center gap-1">
            {[Plus, Bot, Paperclip, MapPin, Cloud, Image, Mic].map((Icon, i) => (
              <button key={i} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          <Button
            size="icon"
            onClick={onSubmit}
            disabled={!prompt.trim() || isProcessing}
            className="w-9 h-9 rounded-full bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-primary/20 bg-primary/5 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium">Agent processing your request...</span>
            </div>
            <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-bar rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
