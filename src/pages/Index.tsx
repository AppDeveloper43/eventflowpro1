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
  guests: { title: "Guest Management", description: "Manage guest lists, RSVPs, seating arrangements and dietary preferences." },
  documents: { title: "Document Center", description: "Store and manage contracts, proposals, floor plans and all event documents." },
  invoices: { title: "Invoice Management", description: "Create, send and track invoices and payment status for all events." },
  calendar: { title: "Event Calendar", description: "View all events, deadlines and milestones in a unified calendar view." },
  analytics: { title: "Analytics & Reports", description: "Detailed analytics on revenue, client acquisition, and event performance." },
  templates: { title: "Event Templates", description: "Pre-built templates for weddings, corporate events, conferences and more." },
  team: { title: "Team Management", description: "Manage team members, roles, assignments and collaboration." },
  portal: { title: "Client Portal", description: "A dedicated portal for clients to view event progress and communicate." },
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
