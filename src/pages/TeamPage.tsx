import { Plus, Shield, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const members = [
  { name: "Praveen K", email: "praveen@gsgroups.net", role: "Admin", status: "online" },
  { name: "Alice Chen", email: "alice@gsgroups.net", role: "Member", status: "online" },
  { name: "Rahul M", email: "rahul@gsgroups.net", role: "Member", status: "offline" },
  { name: "Sara J", email: "sara@gsgroups.net", role: "Member", status: "online" },
  { name: "Mike T", email: "mike@gsgroups.net", role: "Viewer", status: "offline" },
  { name: "Priya S", email: "priya@gsgroups.net", role: "Member", status: "online" },
];

const roleStyle: Record<string, string> = {
  Admin: "bg-chart-2/10 text-chart-2",
  Member: "bg-info/10 text-info",
  Viewer: "bg-muted text-muted-foreground",
};

export default function TeamPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Team Workspace</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{members.length} members · RBAC enabled</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl text-xs">
          <Plus className="w-3.5 h-3.5" /> Invite
        </Button>
      </div>

      {/* Security badges */}
      <div className="flex flex-wrap gap-2">
        {["RBAC", "SSO", "OAuth 2.0", "MFA", "API Keys", "Audit Logs", "Encryption", "Secrets Vault"].map((f) => (
          <div
            key={f}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-secondary/40 text-[10px] font-medium text-muted-foreground"
          >
            <Shield className="w-3 h-3 text-primary" /> {f}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {members.map((m, i) => (
          <motion.div
            key={m.email}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 border border-border rounded-xl bg-card px-5 py-3 hover:border-primary/30 transition-all group"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${
                  m.status === "online" ? "bg-success" : "bg-muted-foreground"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-[10px] text-muted-foreground">{m.email}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${roleStyle[m.role]}`}>{m.role}</span>
            <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
