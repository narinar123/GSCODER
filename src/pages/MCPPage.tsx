import { useState } from "react";
import { Plus, Server, Search, MoreHorizontal, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const mcpServers = [
  { name: "Filesystem", desc: "Read/write local filesystem access", status: true, calls: 4521 },
  { name: "GitHub", desc: "Repository management, PRs, issues", status: true, calls: 2890 },
  { name: "Database", desc: "PostgreSQL, MongoDB, Redis access", status: true, calls: 3456 },
  { name: "Slack", desc: "Channel messaging, thread management", status: true, calls: 1234 },
  { name: "Notion", desc: "Page CRUD, database queries", status: false, calls: 567 },
  { name: "Figma", desc: "Design file access, component inspection", status: false, calls: 89 },
  { name: "Browser", desc: "Web browsing, scraping, screenshots", status: true, calls: 2341 },
  { name: "Playwright", desc: "Browser automation, E2E testing", status: false, calls: 178 },
  { name: "Docker", desc: "Container management, image builds", status: true, calls: 890 },
  { name: "Terminal", desc: "Shell command execution", status: true, calls: 5678 },
];

export default function MCPPage() {
  const [servers, setServers] = useState(mcpServers);
  const [search, setSearch] = useState("");

  const toggleServer = (name: string) => {
    setServers((s) => s.map((srv) => srv.name === name ? { ...srv, status: !srv.status } : srv));
  };

  const filtered = servers.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">MCP Servers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Model Context Protocol server management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 rounded-xl text-xs"><Terminal className="w-3.5 h-3.5" /> Import JSON</Button>
          <Button size="sm" className="gap-1.5 rounded-xl text-xs"><Plus className="w-3.5 h-3.5" /> Add Server</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Servers", val: servers.length },
          { label: "Active", val: servers.filter((s) => s.status).length },
          { label: "Total Calls", val: servers.reduce((a, s) => a + s.calls, 0).toLocaleString() },
          { label: "Avg Latency", val: "42ms" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-xl bg-card px-4 py-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search servers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-8 text-xs bg-secondary border-border rounded-xl" />
      </div>

      <div className="space-y-2">
        {filtered.map((srv, i) => (
          <motion.div
            key={srv.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-4 border border-border rounded-xl bg-card px-4 py-3 hover:border-primary/30 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{srv.name}</p>
              <p className="text-[10px] text-muted-foreground">{srv.desc} · {srv.calls.toLocaleString()} calls</p>
            </div>
            <Switch checked={srv.status} onCheckedChange={() => toggleServer(srv.name)} />
            <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
