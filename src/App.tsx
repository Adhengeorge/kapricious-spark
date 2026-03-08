import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import CulturalRegister from "./pages/CulturalRegister";
import TopHeader from "./components/TopHeader";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import FlagshipEventDetail from "./pages/FlagshipEventDetail";
import Register from "./pages/Register";
import Certificate from "./pages/Certificate";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DepartmentEvents from "./pages/DepartmentEvents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main className="lg:pl-24">
            
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:eventId" element={<FlagshipEventDetail />} />
              <Route path="/events/:eventId" element={<EventDetail />} />
              <Route path="/departments/:deptId" element={<DepartmentEvents />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cultural-register" element={<CulturalRegister />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
