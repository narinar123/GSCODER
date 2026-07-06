import { ExternalLink, MoreHorizontal, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const deployments = [
  { name: "gsqoder-ai-v2.4.1", project: "GSQoderAI Platform", env: "Production", status: "live", url: "gsqoder.ai", sha: "a3f9c2d", time: "2 min ago" },
  { name: "gsqoder-ai-v2.4.0", project: "GSQoderAI Platform", env: "Staging", status: "live", url: "staging.gsqoder.ai", sha: "b7e1f4a", time: "1 hour ago" },
  { name: "marketing-v1.8.0", project: "Marketing Website", env: "Production", status: "live", url: "gsgroups.net", sha: "c9d2e5b", time: "3 hours ago" },
  { name: "mobile-api-v0.9.2", project: "Mobile App v2", env: "Development", status: "building", url: "dev-api.gsqoder.ai", sha: "d1f3a6c", time: "5 min ago" },
  { name: "gsqoder-ai-v2.3.9", project: "GSQoderAI Platform", env: "Production", status: "rolled_back", url: "-", sha: "e4g7h8i", time: "Yesterday" },
  { name: "portal-v1.2.0", project: "Customer Portal", env: "Production", status: "live", url: "portal.gsgroups.net", sha: "f5h8i9j", time: "2 days ago" },
];

const envStyle: Record<string, string> = {
  Production: "text-success",
  Staging: "text-warning",
  Development: "text-info",
};
const statusStyle: Record<string, string> = {
  live: "bg-success/10 text-success",
  building: "bg-warning/10 text-warning",
  failed: "bg-destructive/10 text-destructive",
  rolled_back: "bg-muted text-muted-foreground",
};

export default function DeploymentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Deployments</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {deployments.filter((d) => d.status === "live").length} live deployments
        </p>
      </div>

      <div className="space-y-2">
        {deployments.map((dep, i) => (
          <motion.div
            key={dep.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 border border-border rounded-xl bg-card px-5 py-4 hover:border-primary/30 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Rocket className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{dep.name}</p>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${statusStyle[dep.status]}`}>
                  {dep.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {dep.project} · <span className={envStyle[dep.env]}>{dep.env}</span> · {dep.time}
              </p>
            </div>
            <code className="text-[10px] font-mono text-muted-foreground hidden sm:block">{dep.sha}</code>
            {dep.url !== "-" && (
              <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
            <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
