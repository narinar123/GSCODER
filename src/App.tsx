import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginPage from "./pages/LoginPage";
import MarketingPage from "./pages/MarketingPage";
import PaymentPage from "./pages/PaymentPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import WorkspacePage from "./pages/WorkspacePage";
import ChatPage from "./pages/ChatPage";
import AgentsPage from "./pages/AgentsPage";
import ProjectsPage from "./pages/ProjectsPage";
import KnowledgePage from "./pages/KnowledgePage";
import TasksPage from "./pages/TasksPage";
import AutomationsPage from "./pages/AutomationsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import MCPPage from "./pages/MCPPage";
import DeploymentsPage from "./pages/DeploymentsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ModelsPage from "./pages/ModelsPage";
import TeamPage from "./pages/TeamPage";
import SkillsPage from "./pages/SkillsPage";
import SettingsPage from "./pages/SettingsPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src="/favicon.png" alt="GSQoderAI logo" className="w-10 h-10 rounded-xl animate-pulse" />
          <p className="text-sm text-muted-foreground">Loading GSQoderAI...</p>
        </div>
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MarketingPage />} />
      <Route path="/pricing" element={<MarketingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/activate" element={<PaymentPage />} />
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<WorkspacePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="agents" element={<AgentsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="automation" element={<AutomationsPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="mcp" element={<MCPPage />} />
        <Route path="deployments" element={<DeploymentsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="models" element={<ModelsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
