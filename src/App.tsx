import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/hooks/useI18n";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import AlertsPage from "./pages/AlertsPage";
import DevicePage from "./pages/DevicePage";
import ApiKeysPage from "./pages/ApiKeysPage";
import ChatPage from "./pages/ChatPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<PatientProfile />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/device" element={<DevicePage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
