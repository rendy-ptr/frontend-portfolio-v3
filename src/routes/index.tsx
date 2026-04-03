import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../components/Navbar";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Overview from "../pages/dashboard/pages/Overview";
import ProjectsManager from "../pages/dashboard/pages/ProjectsManager";
import ExperienceManager from "../pages/dashboard/pages/ExperienceManager";
import MessagesPage from "../pages/dashboard/pages/MessagesPage";
import HomePage from "@/pages/HomePage";

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
