import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  TrendingUp,
  Store,
  ListTodo,
  UserCheck,
  FileText,
  FileSpreadsheet,
  Calendar,
  BarChart3,
  Copy,
  UsersRound,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Section =
  | "dashboard"
  | "clients"
  | "events"
  | "budget"
  | "vendors"
  | "tasks"
  | "guests"
  | "documents"
  | "invoices"
  | "calendar"
  | "analytics"
  | "templates"
  | "team"
  | "portal";

const mainNav = [
  { id: "dashboard" as Section, label: "Dashboard", icon: LayoutDashboard },
  { id: "clients" as Section, label: "Clients", icon: Users },
  { id: "events" as Section, label: "Events", icon: CalendarDays },
  { id: "budget" as Section, label: "Budget", icon: TrendingUp },
  { id: "vendors" as Section, label: "Vendors", icon: Store },
  { id: "tasks" as Section, label: "Tasks", icon: ListTodo },
  { id: "guests" as Section, label: "Guests", icon: UserCheck },
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
      className={`fixed top-0 left-0 h-screen border-r border-border bg-background flex flex-col transition-all duration-150 z-30 ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-8 h-8 rounded-md bg-gradient-primary flex items-center justify-center flex-shrink-0">
          <CalendarDays className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-lg font-bold text-gradient">EventFlow Pro</span>}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-gradient-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        <div className="my-4 h-px bg-border" />

        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-gradient-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-4 border-t border-border text-muted-foreground hover:text-foreground transition-colors duration-150"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}

export type { Section };
