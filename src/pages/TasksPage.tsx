import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const tasks = [
  { title: "Build agent orchestration layer", status: "in_progress", priority: "urgent", agent: "Backend Developer", project: "GSQoderAI" },
  { title: "Design agent marketplace UI", status: "in_progress", priority: "high", agent: "UI Designer", project: "GSQoderAI" },
  { title: "Implement RAG pipeline", status: "todo", priority: "high", agent: "Full Stack Engineer", project: "Data Pipeline" },
  { title: "Write API documentation", status: "review", priority: "medium", agent: "Content Writer", project: "API Gateway" },
  { title: "Security audit - RBAC", status: "in_progress", priority: "urgent", agent: "Security Engineer", project: "GSQoderAI" },
  { title: "SEO optimization pass", status: "done", priority: "medium", agent: "SEO Agent", project: "Marketing Website" },
  { title: "Setup CI/CD pipeline", status: "done", priority: "high", agent: "DevOps Engineer", project: "GSQoderAI" },
  { title: "Create marketing campaign", status: "todo", priority: "medium", agent: "Marketing Agent", project: "Marketing Website" },
  { title: "Mobile responsive testing", status: "todo", priority: "low", agent: "QA Engineer", project: "Mobile App v2" },
  { title: "Customer portal auth flow", status: "done", priority: "high", agent: "Frontend Developer", project: "Customer Portal" },
];

const statuses = ["todo", "in_progress", "review", "done"] as const;
const statusLabels: Record<string, string> = { todo: "To Do", in_progress: "In Progress", review: "In Review", done: "Done" };
const statusDot: Record<string, string> = { todo: "bg-muted-foreground", in_progress: "bg-info", review: "bg-warning", done: "bg-success" };
const priorityStyle: Record<string, string> = {
  urgent: "text-destructive bg-destructive/10",
  high: "text-warning bg-warning/10",
  medium: "text-muted-foreground bg-muted",
  low: "text-muted-foreground/60 bg-muted/50",
};

export default function TasksPage() {
  const [view, setView] = useState<"board" | "list">("board");
  const [search, setSearch] = useState("");

  const filtered = tasks.filter((t) => !search || t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {tasks.length} tasks across {new Set(tasks.map((t) => t.project)).size} projects
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex p-0.5 bg-secondary rounded-lg border border-border">
            {(["board", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded-md text-[10px] font-medium capitalize ${
                  view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <Button size="sm" className="gap-1.5 rounded-xl text-xs">
            <Plus className="w-3.5 h-3.5" /> Add Task
          </Button>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-8 text-xs bg-secondary border-border rounded-xl"
        />
      </div>

      {view === "board" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statuses.map((status) => {
            const items = filtered.filter((t) => t.status === status);
            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className={`w-2 h-2 rounded-full ${statusDot[status]}`} />
                  <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider">
                    {statusLabels[status]}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((task, i) => (
                    <motion.div
                      key={task.title}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border border-border rounded-xl bg-card p-3 hover:border-primary/30 cursor-pointer transition-all"
                    >
                      <p className="text-xs font-medium text-foreground leading-snug">{task.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase ${priorityStyle[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-[9px] text-muted-foreground truncate">{task.agent}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map((task) => (
            <div
              key={task.title}
              className="flex items-center gap-3 border border-border rounded-xl bg-card px-4 py-2.5 hover:border-primary/30 cursor-pointer transition-all"
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${statusDot[task.status]}`} />
              <span className="text-xs font-medium text-foreground flex-1 truncate">{task.title}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase shrink-0 ${priorityStyle[task.priority]}`}
              >
                {task.priority}
              </span>
              <span className="text-[10px] text-muted-foreground shrink-0 w-28 truncate">{task.agent}</span>
              <span className="text-[10px] text-muted-foreground shrink-0 w-24 truncate">{task.project}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
