import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AgentsPage from "./pages/AgentsPage";
import UseCasesPage from "./pages/UseCasesPage";
import PricingPage from "./pages/PricingPage";
import DocsPage from "./pages/DocsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/use-cases" element={<UseCasesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  );
}
