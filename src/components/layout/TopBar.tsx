import { Bell, PanelRight, Search, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopBar({ onToggleRight }: { onToggleRight: () => void }) {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Good morning, Praveen 👋</h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary border border-border text-muted-foreground text-xs cursor-pointer hover:border-primary/30 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="ml-4 px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">⌘K</kbd>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Wifi className="w-4 h-4 text-success" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleRight}>
          <PanelRight className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
