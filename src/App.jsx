import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Prices from "./pages/Prices";
import News from "./pages/News";
import BitcoinETF from "./pages/BitcoinETF";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [chatopen, setChatOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar onChatClick={() => setChatOpen(true)} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/news" element={<News />} />
              <Route path="/blog/bitcoin-etf" element={<BitcoinETF />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <ChatBot open={chatopen} onClose={() => setChatOpen(false)} />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
