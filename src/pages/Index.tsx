import { useState } from "react";
import AppSidebar, { type Section } from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import DashboardSection from "@/components/sections/DashboardSection";
import ClientsSection from "@/components/sections/ClientsSection";
import EventsSection from "@/components/sections/EventsSection";
import BudgetSection from "@/components/sections/BudgetSection";
import VendorsSection from "@/components/sections/VendorsSection";
import TasksSection from "@/components/sections/TasksSection";
import PlaceholderSection from "@/components/sections/PlaceholderSection";

const placeholders: Record<string, { title: string; description: string }> = {
  guests: { title: "Mehmaan Management", description: "Mehmaan ki list, RSVPs, seating arrangement aur khaane ki preferences manage karein." },
  documents: { title: "Documents Center", description: "Contracts, proposals, floor plans aur sab event documents yahan rakhein." },
  invoices: { title: "Invoice Management", description: "Invoices banayein, bhejein aur payment status track karein — sab events ke liye." },
  calendar: { title: "Event Calendar", description: "Sab events, deadlines aur milestones ek calendar view mein dekhein." },
  analytics: { title: "Analytics & Reports", description: "Revenue, client acquisition aur event performance ki detailed analytics." },
  templates: { title: "Event Templates", description: "Pakistani shaadi ke liye ready-made templates: Mehndi, Baraat, Walima, Nikkah waghaira." },
  team: { title: "Team Management", description: "Team members, roles, assignments aur collaboration manage karein." },
  portal: { title: "Client Portal", description: "Clients ke liye dedicated portal jahan woh event progress dekh sakein aur baat kar sakein." },
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />;
      case "clients":
        return <ClientsSection />;
      case "events":
        return <EventsSection />;
      case "budget":
        return <BudgetSection />;
      case "vendors":
        return <VendorsSection />;
      case "tasks":
        return <TasksSection />;
      default:
        const ph = placeholders[activeSection];
        return ph ? <PlaceholderSection title={ph.title} description={ph.description} /> : null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 ml-[260px] p-6 transition-all duration-150">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        {renderSection()}
      </main>
    </div>
  );
}
