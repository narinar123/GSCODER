import { useState } from "react";
import { Search, Check, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const integrations = [
  { name: "Slack", desc: "Team messaging & notifications", cat: "communication", connected: true },
  { name: "GitHub", desc: "Code repositories & CI/CD", cat: "development", connected: true },
  { name: "Notion", desc: "Docs, wikis & knowledge base", cat: "productivity", connected: false },
  { name: "Google Drive", desc: "Cloud file storage", cat: "storage", connected: true },
  { name: "Figma", desc: "UI/UX design collaboration", cat: "design", connected: false },
  { name: "Linear", desc: "Issue tracking & planning", cat: "development", connected: false },
  { name: "Vercel", desc: "Frontend deployment platform", cat: "development", connected: true },
  { name: "Zapier", desc: "Workflow automation", cat: "automation", connected: false },
  { name: "Microsoft Teams", desc: "Enterprise communication", cat: "communication", connected: false },
  { name: "Discord", desc: "Community chat", cat: "communication", connected: false },
  { name: "Jira", desc: "Project management", cat: "development", connected: false },
  { name: "Confluence", desc: "Team documentation", cat: "productivity", connected: false },
  { name: "Airtable", desc: "Database spreadsheet", cat: "productivity", connected: false },
  { name: "PostgreSQL", desc: "Relational database", cat: "database", connected: true },
  { name: "MongoDB", desc: "NoSQL document DB", cat: "database", connected: false },
  { name: "OpenAI", desc: "GPT & DALL-E API", cat: "ai", connected: true },
  { name: "Anthropic", desc: "Claude AI models", cat: "ai", connected: true },
  { name: "Hugging Face", desc: "Open-source ML models", cat: "ai", connected: false },
  { name: "LangChain", desc: "LLM framework", cat: "ai", connected: false },
  { name: "Pinecone", desc: "Vector database", cat: "ai", connected: false },
  { name: "Stripe", desc: "Payment processing", cat: "finance", connected: true },
  { name: "Twilio", desc: "SMS & voice API", cat: "communication", connected: false },
  { name: "SendGrid", desc: "Email delivery", cat: "communication", connected: false },
  { name: "AWS S3", desc: "Object storage", cat: "storage", connected: false },
  { name: "Supabase", desc: "Backend-as-a-service", cat: "database", connected: false },
  { name: "Firebase", desc: "Google app platform", cat: "database", connected: false },
  { name: "Redis", desc: "In-memory data store", cat: "database", connected: false },
  { name: "Docker", desc: "Container platform", cat: "development", connected: false },
  { name: "Kubernetes", desc: "Container orchestration", cat: "development", connected: false },
  { name: "FastAPI", desc: "Python web framework", cat: "development", connected: true },
  { name: "n8n", desc: "Workflow automation", cat: "automation", connected: false },
  { name: "Make", desc: "Visual automation", cat: "automation", connected: false },
  { name: "WhatsApp", desc: "Business messaging", cat: "communication", connected: false },
  { name: "Telegram", desc: "Bot & messaging API", cat: "communication", connected: false },
  { name: "Google Analytics", desc: "Web analytics", cat: "analytics", connected: false },
  { name: "Mixpanel", desc: "Product analytics", cat: "analytics", connected: false },
  { name: "Segment", desc: "Customer data platform", cat: "analytics", connected: false },
  { name: "HubSpot", desc: "CRM & marketing", cat: "marketing", connected: false },
  { name: "Mailchimp", desc: "Email marketing", cat: "marketing", connected: false },
  { name: "Salesforce", desc: "Enterprise CRM", cat: "marketing", connected: false },
];

const categories = ["all", "ai", "development", "communication", "database", "automation", "marketing", "analytics", "productivity", "storage", "design", "finance"];

export default function IntegrationsPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = integrations.filter((i) => {
    if (tab === "connected" && !i.connected) return false;
    if (tab !== "all" && tab !== "connected" && i.cat !== tab) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Integrations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {integrations.length} services • {integrations.filter((i) => i.connected).length} connected
        </p>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-1 p-1 bg-secondary/50 rounded-xl border border-border">
          {["all", "connected", ...categories.filter((c) => c !== "all")].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-56 h-8 text-xs bg-secondary border-border rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((integ, i) => (
          <motion.div
            key={integ.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="group border border-border rounded-2xl bg-card p-4 hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                {integ.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex items-center gap-1.5">
                {integ.connected && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-[9px] font-medium">
                    <Check className="w-2.5 h-2.5" /> On
                  </div>
                )}
                <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
            <h3 className="mt-2.5 text-xs font-semibold text-foreground">{integ.name}</h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">{integ.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
