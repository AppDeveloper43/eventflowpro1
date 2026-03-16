import { useState } from "react";
import {
  LayoutDashboard, Users, CalendarDays, TrendingUp, Store, ListTodo,
  UserCheck, FileText, FileSpreadsheet, Calendar, BarChart3, Copy,
  UsersRound, UserCircle, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";

type Section =
  | "dashboard" | "clients" | "events" | "budget" | "vendors" | "tasks"
  | "guests" | "documents" | "invoices" | "calendar" | "analytics"
  | "templates" | "team" | "portal";

const mainNav = [
  { id: "dashboard" as Section, label: "Dashboard", icon: LayoutDashboard },
  { id: "clients" as Section, label: "Clients", icon: Users },
  { id: "events" as Section, label: "Events", icon: CalendarDays },
  { id: "budget" as Section, label: "Budget", icon: TrendingUp },
  { id: "vendors" as Section, label: "Vendors", icon: Store },
  { id: "tasks" as Section, label: "Tasks", icon: ListTodo },
  { id: "guests" as Section, label: "Mehmaan", icon: UserCheck },
  { id: "documents" as Section, label: "Documents", icon: FileText },
  { id: "invoices" as Section, label: "Invoices", icon: FileSpreadsheet },
  { id: "calendar" as Section, label: "Calendar", icon: Calendar },
  { id: "analytics" as Section, label: "Analytics", icon: BarChart3 },
];

const secondaryNav = [
  { id: "templates" as Section, label: "Templates", icon: Copy },
  { id: "team" as Section, label: "Team", icon: UsersRound },
  { id: "portal" as Section, label: "Client Portal", icon: UserCircle },
];

interface AppSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-sidebar flex flex-col transition-all duration-200 z-30 ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-lg">
          <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-lg font-display font-bold text-sidebar-foreground">Shaadi</span>
            <span className="text-lg font-display font-bold text-sidebar-primary">Planner</span>
          </div>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        <div className="my-4 h-px bg-sidebar-border" />

        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-4 border-t border-sidebar-border text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors duration-200"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}

export type { Section };
