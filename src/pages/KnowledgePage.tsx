import { useState } from "react";
import { Plus, FileText, Globe, Database, Upload, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const sources = [
  { title: "Product Requirements Doc", type: "PDF", chunks: 245, status: "indexed", size: "2.4 MB" },
  { title: "API Documentation", type: "Document", chunks: 189, status: "indexed", size: "1.1 MB" },
  { title: "Company Handbook", type: "PDF", chunks: 312, status: "indexed", size: "4.7 MB" },
  { title: "gsgroups.net", type: "Website", chunks: 78, status: "indexed", size: "890 KB" },
  { title: "Design System Repo", type: "GitHub", chunks: 156, status: "processing", size: "12 MB" },
  { title: "Marketing Wiki", type: "Notion", chunks: 0, status: "processing", size: "3.2 MB" },
  { title: "Customer FAQ", type: "Plain Text", chunks: 45, status: "indexed", size: "120 KB" },
  { title: "Sales Playbook", type: "PDF", chunks: 167, status: "indexed", size: "5.1 MB" },
];

const typeIcons: Record<string, typeof FileText> = { PDF: FileText, Document: FileText, Website: Globe, GitHub: Database, Notion: Database, "Plain Text": FileText };
const statusStyle: Record<string, string> = {
  indexed: "bg-success/10 text-success",
  processing: "bg-warning/10 text-warning",
  failed: "bg-destructive/10 text-destructive",
};

export default function KnowledgePage() {
  const [search, setSearch] = useState("");

  const filtered = sources.filter((s) =>
    !search || s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{sources.reduce((a, s) => a + s.chunks, 0)} chunks indexed · RAG enabled</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 rounded-xl text-xs"><Upload className="w-3.5 h-3.5" /> Upload</Button>
          <Button size="sm" className="gap-1.5 rounded-xl text-xs"><Plus className="w-3.5 h-3.5" /> Add Source</Button>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 border border-dashed border-border rounded-2xl bg-secondary/20 text-center">
        <Upload className="w-5 h-5 text-muted-foreground" />
        <div className="flex-1 text-left">
          <p className="text-xs font-medium text-foreground">Drop files here or click to upload</p>
          <p className="text-[10px] text-muted-foreground">PDF, DOCX, TXT, or paste a URL</p>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search knowledge..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-8 text-xs bg-secondary border-border rounded-xl" />
      </div>

      <div className="space-y-2">
        {filtered.map((src, i) => {
          const Icon = typeIcons[src.type] || FileText;
          return (
            <motion.div
              key={src.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 border border-border rounded-xl bg-card px-4 py-3 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{src.title}</p>
                <p className="text-[10px] text-muted-foreground">{src.type} · {src.size} · {src.chunks} chunks</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${statusStyle[src.status]}`}>{src.status}</span>
              <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground transition-all">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
