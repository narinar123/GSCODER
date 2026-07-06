import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import RightPanel from "./RightPanel";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileNav(false)}
            />
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
            >
              <Sidebar collapsed={false} onToggle={() => setMobileNav(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden flex items-center gap-2 px-4 py-3 border-b border-border">
          <button onClick={() => setMobileNav(true)} className="p-1.5 rounded-lg hover:bg-muted text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold tracking-wider text-foreground flex-1">GSQODER.AI</span>
          <button
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
          >
            {rightPanelOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <div className="hidden md:block">
          <TopBar onToggleRight={() => setRightPanelOpen(!rightPanelOpen)} />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {rightPanelOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden hidden md:block"
          >
            <RightPanel onClose={() => setRightPanelOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
