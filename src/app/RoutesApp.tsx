import { Route, Routes } from "react-router";
import { AppShell } from "./layout/AppShell";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { ResearchPage } from "../pages/ResearchPage";
import { Resilience360Page } from "../pages/Resilience360Page";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";

export default function RoutesApp() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="resilience360" element={<Resilience360Page />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}
