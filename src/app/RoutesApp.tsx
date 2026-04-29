import { Route, Routes, Navigate } from "react-router";
import { AppShell } from "./layout/AppShell";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { ResearchPage } from "../pages/ResearchPage";
import { Resilience360Page } from "../pages/Resilience360Page";
import { PlatformAccessPage } from "../pages/PlatformAccessPage";

export default function RoutesApp() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="resilience360" element={<Resilience360Page />} />
        <Route path="login" element={<PlatformAccessPage />} />
        <Route path="signup" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}
