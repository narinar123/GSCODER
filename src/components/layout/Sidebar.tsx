import { NavLink } from "react-router-dom";
import {
  Home, MessageCircle, Bot, FolderKanban, Brain, ListTodo, Zap,
  Puzzle, Server, Rocket, BarChart3, Cpu, Users, Box,
  Settings, ChevronLeft, ChevronRight, ChevronDown
} from "lucide-react";

const LOGO_URL = "https://www.gsgroups.net/gslogo.png";

const navSections = [
  {
    label: "Core",
    items: [
      { to: "/", icon: Home, label: "Home", end: true },
      { to: "/chat", icon: MessageCircle, label: "AI Chat" },
      { to: "/agents", icon: Bot, label: "Agents" },
      { to: "/projects", icon: FolderKanban, label: "Projects" },
    ],
  },
  {
    label: "Work",
    items: [
      { to: "/knowledge", icon: Brain, label: "Knowledge" },
      { to: "/tasks", icon: ListTodo, label: "Tasks" },
      { to: "/automation", icon: Zap, label: "Automations" },
    ],
  },
  {
    label: "Platform",
    items: [
      { to: "/integrations", icon: Puzzle, label: "Integrations" },
      { to: "/mcp", icon: Server, label: "MCP Servers" },
      { to: "/models", icon: Cpu, label: "Models" },
      { to: "/skills", icon: Box, label: "Skills" },
    ],
  },
  {
    label: "Ops",
    items: [
      { to: "/deployments", icon: Rocket, label: "Deployments" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/team", icon: Users, label: "Team" },
    ],
  },
];

interface Props { collapsed: boolean; onToggle: () => void }

export default function Sidebar({ collapsed, onToggle }: Props) {
  return (
    <aside className={`flex flex-col border-r border-border bg-sidebar transition-all duration-200 ${collapsed ? "w-14" : "w-52"} hidden md:flex`}>
      <div className="p-3 flex items-center justify-between border-b border-border">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="GS" className="w-6 h-6 rounded-lg object-contain" />
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground">GSQODER<span className="text-primary">.AI</span></span>
          </div>
        ) : (
          <img src={LOGO_URL} alt="GS" className="w-6 h-6 rounded-lg object-contain mx-auto" />
        )}
        <button onClick={onToggle} className="p-1 rounded-lg hover:bg-sidebar-accent text-muted-foreground shrink-0">
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-3 py-2 border-b border-border">
          <button className="flex items-center gap-2 text-[11px] w-full hover:bg-sidebar-accent rounded-lg px-2 py-1 transition-colors">
            <div className="w-4 h-4 rounded gradient-border flex items-center justify-center text-[6px] text-white font-bold">G</div>
            <span className="font-medium text-foreground text-[11px]">GS Groups</span>
            <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground" />
          </button>
        </div>
      )}

      <nav className="flex-1 py-1 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-1">
            {!collapsed && (
              <p className="px-4 pt-3 pb-1 text-[8px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">{section.label}</p>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 mx-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-2">
        <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-[9px] font-bold shrink-0">PK</div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-foreground truncate">Praveen K</p>
              <p className="text-[8px] text-muted-foreground uppercase tracking-wider">Admin</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <NavLink to="/settings" className="flex items-center gap-2 px-2 py-1 mt-1 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
            <Settings className="w-3 h-3" /> Settings
          </NavLink>
        )}
      </div>
    </aside>
  );
}
