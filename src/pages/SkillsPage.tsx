import { useState } from "react";
import { Search, Plus, Download, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const skills = [
  { name: "deep-research", desc: "Conduct systematic deep research on technical topics with source verification", downloads: "20.9K", official: true },
  { name: "qoderwork-ppt", desc: "Generate QoderWork-style presentations. Automatically matches brand guidelines", downloads: "16.9K", official: true },
  { name: "drafter-diagram", desc: "Generate technical diagrams using HTML/CSS in Flat Engineering Blueprint style", downloads: "15.5K", official: true },
  { name: "quickbi-smartq-chat", desc: "Super data analysis skill. Users can intelligently match and analyze Excel data", downloads: "12.8K", official: true },
  { name: "notion-infographic", desc: "Batch generate Notion-style relaxed hand-drawn infographic series from content", downloads: "8.5K", official: true },
  { name: "general-ppt", desc: "Use this skill any time a .pptx file is involved in any way — as input, output, …", downloads: "7.8K", official: true },
  { name: "tailored-resume-gen", desc: "Analyzes job descriptions and generates tailored resumes that match requirements", downloads: "5K", official: true },
  { name: "cloudflare-deploy", desc: "Deploy applications and infrastructure to Cloudflare using Workers, Pages, and R2", downloads: "3.7K", official: true },
  { name: "weekly-report-writer", desc: "Create weekly reports with Obsidian integration for knowledge management", downloads: "2.9K", official: true },
  { name: "analytics-data-analysis", desc: "Implement analytics, data analysis, and visualization best practices", downloads: "15.5K", official: false },
  { name: "content-research-writer", desc: "Assists in writing high-quality content by conducting research and adding citations", downloads: "10.7K", official: false },
  { name: "frontend-design", desc: "Create distinctive, production-grade frontend interfaces with high design standards", downloads: "9.8K", official: false },
];

export default function SkillsPage() {
  const [tab, setTab] = useState<"market" | "installed" | "custom">("market");
  const [search, setSearch] = useState("");
  const [installedSkills, setInstalledSkills] = useState<string[]>([]);

  const filtered = skills.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (tab === "installed") return installedSkills.includes(s.name);
    return true;
  });

  const toggleInstall = (name: string) => {
    setInstalledSkills((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Skills & MCP Servers</h1>
          <p className="text-sm text-muted-foreground mt-1">Install and manage skills to extend AI capabilities</p>
        </div>
        <AddMCPDialog />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl border border-border">
          {(["market", "installed", "custom"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "market" ? "Market" : t === "installed" ? `Installed ${installedSkills.length}` : "Custom MCP"}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-56 h-8 text-xs bg-secondary border-border rounded-xl"
          />
        </div>
      </div>

      {tab === "custom" ? (
        <CustomMCPSection />
      ) : (
        <>
          {tab === "market" && filtered.some((s) => s.official) && (
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Official Selection</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.filter((s) => s.official).map((skill) => (
                  <SkillCard key={skill.name} skill={skill} installed={installedSkills.includes(skill.name)} onToggle={() => toggleInstall(skill.name)} />
                ))}
              </div>
            </div>
          )}
          {filtered.some((s) => !s.official) && (
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Community</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.filter((s) => !s.official).map((skill) => (
                  <SkillCard key={skill.name} skill={skill} installed={installedSkills.includes(skill.name)} onToggle={() => toggleInstall(skill.name)} />
                ))}
              </div>
            </div>
          )}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No skills found</div>
          )}
        </>
      )}
    </div>
  );
}

function SkillCard({ skill, installed, onToggle }: { skill: typeof skills[0]; installed: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-2xl bg-card p-5 hover:border-primary/30 transition-all group">
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
          <ExternalLink className="w-4 h-4" />
        </div>
        <button
          onClick={onToggle}
          className={`p-1.5 rounded-lg transition-all ${
            installed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
          }`}
        >
          <Plus className={`w-3.5 h-3.5 transition-transform ${installed ? "rotate-45" : ""}`} />
        </button>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-foreground truncate">{skill.name}</h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{skill.desc}</p>
      <div className="mt-3 flex items-center gap-1 text-muted-foreground">
        <Download className="w-3 h-3" />
        <span className="text-[10px]">{skill.downloads}</span>
      </div>
    </div>
  );
}

function AddMCPDialog() {
  const [json, setJson] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs gap-1.5 rounded-xl">
          <Plus className="w-3.5 h-3.5" /> Add MCP Server
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle>Add Custom MCP Server</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Server URL</label>
            <Input placeholder="https://mcp.example.com" className="bg-secondary border-border text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">JSON Manifest (optional)</label>
            <Textarea
              placeholder='{"name": "my-server", "tools": [...]}'
              value={json}
              onChange={(e) => setJson(e.target.value)}
              className="bg-secondary border-border text-sm font-mono min-h-[120px]"
            />
          </div>
          <Button className="w-full rounded-xl">Connect Server</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CustomMCPSection() {
  return (
    <div className="border border-border rounded-2xl bg-card p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-secondary mx-auto flex items-center justify-center text-muted-foreground">
        <ExternalLink className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">No custom MCP servers yet</h3>
      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
        Add a custom MCP server manually or import from JSON manifest to extend agent capabilities.
      </p>
    </div>
  );
}
