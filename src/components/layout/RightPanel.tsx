import { X, Brain, Calendar, Mail, Video, ListTodo, FileText, FolderOpen, Globe, MessageCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const quickApps = [
  { icon: Brain, label: "Memory" },
  { icon: Calendar, label: "Calendar" },
  { icon: Mail, label: "Email" },
  { icon: Video, label: "Meetings" },
  { icon: ListTodo, label: "Tasks" },
  { icon: FileText, label: "Notes" },
  { icon: FolderOpen, label: "Files" },
  { icon: Globe, label: "Browser" },
  { icon: MessageCircle, label: "WhatsApp" },
];

export default function RightPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="w-72 border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Agent Controls</span>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted text-muted-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 border-b border-border space-y-3">
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">AI Agent Type</label>
        <Select defaultValue="general">
          <SelectTrigger className="bg-secondary border-border text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Assistant</SelectItem>
            <SelectItem value="code">Code Agent</SelectItem>
            <SelectItem value="research">Research Agent</SelectItem>
            <SelectItem value="design">Design Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">Open Apps</p>
        <div className="grid grid-cols-3 gap-2">
          {quickApps.map((app) => (
            <button
              key={app.label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-secondary/50 hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-primary"
            >
              <app.icon className="w-4 h-4" />
              <span className="text-[9px] uppercase tracking-wider font-medium">{app.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-2">Active Integrations</p>
        <div className="flex gap-1.5">
          {["Slack", "Git", "GD"].map((name) => (
            <div key={name} className="px-2 py-1 rounded-lg bg-muted text-[9px] font-medium text-muted-foreground flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
