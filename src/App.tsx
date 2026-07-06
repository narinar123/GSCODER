import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "./pages/LoginPage";
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

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
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
    </BrowserRouter>
  );
}
