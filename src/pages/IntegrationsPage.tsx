import { useState } from "react";
import { Search, Check, ExternalLink, Plus, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Integration {
  name: string;
  desc: string;
  cat: string;
  connected: boolean;
  logo?: string;
  tier?: "free" | "pro" | "enterprise";
}

const integrations: Integration[] = [
  // AI
  { name: "OpenAI", desc: "GPT-4o, DALL-E, Whisper API", cat: "ai", connected: true, tier: "pro" },
  { name: "Anthropic", desc: "Claude 3.5 Sonnet & Haiku", cat: "ai", connected: true, tier: "pro" },
  { name: "Google Gemini", desc: "Gemini 1.5 Flash & Pro", cat: "ai", connected: true, tier: "free" },
  { name: "Hugging Face", desc: "Open-source ML models & Spaces", cat: "ai", connected: false, tier: "free" },
  { name: "LangChain", desc: "LLM framework & agents", cat: "ai", connected: false, tier: "free" },
  { name: "Pinecone", desc: "Vector database for RAG", cat: "ai", connected: false, tier: "pro" },
  { name: "Replicate", desc: "Run AI models in cloud", cat: "ai", connected: false, tier: "pro" },
  { name: "Cohere", desc: "Enterprise LLM API", cat: "ai", connected: false, tier: "enterprise" },
  // Development
  { name: "GitHub", desc: "Code repos, PRs, CI/CD", cat: "development", connected: true, tier: "free" },
  { name: "Vercel", desc: "Frontend deployment & edge", cat: "development", connected: true, tier: "pro" },
  { name: "Docker", desc: "Containers & image registry", cat: "development", connected: false, tier: "free" },
  { name: "Kubernetes", desc: "Container orchestration", cat: "development", connected: false, tier: "enterprise" },
  { name: "FastAPI", desc: "Python web framework", cat: "development", connected: true, tier: "free" },
  { name: "Linear", desc: "Issue tracking & planning", cat: "development", connected: false, tier: "pro" },
  { name: "Jira", desc: "Project management", cat: "development", connected: false, tier: "enterprise" },
  { name: "GitLab", desc: "DevSecOps platform", cat: "development", connected: false, tier: "pro" },
  // Database
  { name: "PostgreSQL", desc: "Relational database", cat: "database", connected: true, tier: "free" },
  { name: "Supabase", desc: "Backend-as-a-service + Postgres", cat: "database", connected: true, tier: "free" },
  { name: "MongoDB", desc: "NoSQL document database", cat: "database", connected: false, tier: "free" },
  { name: "Redis", desc: "In-memory data store & cache", cat: "database", connected: false, tier: "free" },
  { name: "Firebase", desc: "Google app platform & Firestore", cat: "database", connected: false, tier: "free" },
  { name: "PlanetScale", desc: "MySQL-compatible serverless DB", cat: "database", connected: false, tier: "pro" },
  // Communication
  { name: "Slack", desc: "Team messaging & notifications", cat: "communication", connected: true, tier: "pro" },
  { name: "Microsoft Teams", desc: "Enterprise communication", cat: "communication", connected: false, tier: "enterprise" },
  { name: "Discord", desc: "Community chat & bots", cat: "communication", connected: false, tier: "free" },
  { name: "Twilio", desc: "SMS, voice & WhatsApp API", cat: "communication", connected: false, tier: "pro" },
  { name: "SendGrid", desc: "Transactional email delivery", cat: "communication", connected: false, tier: "free" },
  { name: "WhatsApp Business", desc: "Business messaging API", cat: "communication", connected: false, tier: "enterprise" },
  // Automation
  { name: "Zapier", desc: "No-code workflow automation", cat: "automation", connected: false, tier: "pro" },
  { name: "n8n", desc: "Open-source workflow automation", cat: "automation", connected: false, tier: "free" },
  { name: "Make", desc: "Visual automation (Integromat)", cat: "automation", connected: false, tier: "pro" },
  // Analytics
  { name: "Google Analytics", desc: "Web analytics & tracking", cat: "analytics", connected: false, tier: "free" },
  { name: "Mixpanel", desc: "Product & user analytics", cat: "analytics", connected: false, tier: "pro" },
  { name: "Segment", desc: "Customer data platform", cat: "analytics", connected: false, tier: "enterprise" },
  { name: "PostHog", desc: "Open-source product analytics", cat: "analytics", connected: false, tier: "free" },
  // Marketing
  { name: "HubSpot", desc: "CRM, marketing & sales hub", cat: "marketing", connected: false, tier: "pro" },
  { name: "Mailchimp", desc: "Email marketing platform", cat: "marketing", connected: false, tier: "free" },
  { name: "Salesforce", desc: "Enterprise CRM", cat: "marketing", connected: false, tier: "enterprise" },
  // Productivity
  { name: "Notion", desc: "Docs, wikis & databases", cat: "productivity", connected: false, tier: "free" },
  { name: "Airtable", desc: "Spreadsheet-database hybrid", cat: "productivity", connected: false, tier: "pro" },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & ML" },
  { id: "development", label: "Development" },
  { id: "database", label: "Database" },
  { id: "communication", label: "Communication" },
  { id: "automation", label: "Automation" },
  { id: "analytics", label: "Analytics" },
  { id: "marketing", label: "Marketing" },
  { id: "productivity", label: "Productivity" },
  { id: "connected", label: "✓ Connected" },
];

const TIER_STYLES: Record<string, string> = {
  free: "text-success bg-success/10",
  pro: "text-info bg-info/10",
  enterprise: "text-chart-2 bg-chart-2/10",
};

export default function IntegrationsPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connectedList, setConnectedList] = useState<Set<string>>(
    new Set(integrations.filter(i => i.connected).map(i => i.name))
  );
  const [detailInteg, setDetailInteg] = useState<Integration | null>(null);

  const filtered = integrations.filter((i) => {
    if (tab === "connected" && !connectedList.has(i.name)) return false;
    if (tab !== "all" && tab !== "connected" && i.cat !== tab) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) &&
        !i.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleConnect = async (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConnecting(name);
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
    setConnectedList(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
    setConnecting(null);
  };

  const connectedCount = connectedList.size;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Integrations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {integrations.length} services across {CATEGORIES.length - 2} categories • {connectedCount} connected
          </p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl text-xs">
          <Plus className="w-3.5 h-3.5" /> Custom Integration
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {[
          { label: "Total", val: integrations.length },
          { label: "Connected", val: connectedCount },
          { label: "AI Models", val: integrations.filter(i => i.cat === "ai").length },
          { label: "Enterprise", val: integrations.filter(i => i.tier === "enterprise").length },
          { label: "Free Tier", val: integrations.filter(i => i.tier === "free").length },
        ].map(s => (
          <div key={s.label} className="border border-border rounded-xl bg-card px-3 py-2 text-center">
            <p className="text-xs font-bold text-foreground">{s.val}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-1 p-1 bg-secondary/50 rounded-xl border border-border">
          {CATEGORIES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-60 h-8 text-xs bg-secondary border-border rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((integ, i) => {
          const isConnected = connectedList.has(integ.name);
          const isConnecting = connecting === integ.name;
          return (
            <motion.div
              key={integ.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => setDetailInteg(integ)}
              className="group border border-border rounded-2xl bg-card p-4 hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0">
                  {integ.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex items-center gap-1.5">
                  {integ.tier && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${TIER_STYLES[integ.tier]}`}>
                      {integ.tier}
                    </span>
                  )}
                  {isConnected && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-[9px] font-medium">
                      <Check className="w-2.5 h-2.5" /> On
                    </div>
                  )}
                </div>
              </div>
              <h3 className="mt-2.5 text-xs font-semibold text-foreground">{integ.name}</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{integ.desc}</p>
              <button
                onClick={(e) => handleConnect(integ.name, e)}
                disabled={isConnecting}
                className={`mt-3 w-full py-1.5 rounded-xl text-[10px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                  isConnected
                    ? "bg-success/10 text-success hover:bg-destructive/10 hover:text-destructive"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {isConnecting ? (
                  <><Loader2 className="w-3 h-3 animate-spin" /> Connecting...</>
                ) : isConnected ? (
                  <><Check className="w-3 h-3" /> Connected</>
                ) : (
                  <><ExternalLink className="w-3 h-3" /> Connect</>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {detailInteg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setDetailInteg(null)} />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="relative w-full max-w-sm bg-card border-l border-border h-full overflow-y-auto p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {detailInteg.name.slice(0, 2).toUpperCase()}
                </div>
                <button onClick={() => setDetailInteg(null)} className="p-2 rounded-xl hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">{detailInteg.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{detailInteg.desc}</p>
              </div>
              {[
                { label: "Category", value: detailInteg.cat },
                { label: "Tier", value: detailInteg.tier || "free" },
                { label: "Status", value: connectedList.has(detailInteg.name) ? "Connected" : "Not Connected" },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm border-b border-border pb-2">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground capitalize">{item.value}</span>
                </div>
              ))}
              <Button
                onClick={(e) => { handleConnect(detailInteg.name, e as any); }}
                disabled={connecting === detailInteg.name}
                className="w-full rounded-xl text-xs"
              >
                {connectedList.has(detailInteg.name) ? "Disconnect" : "Connect Integration"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
