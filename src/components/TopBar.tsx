import { Search, Bell, Settings } from "lucide-react";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-xl border border-border wedding-shadow">
      <div className="flex items-center gap-3 bg-muted px-4 py-2.5 rounded-lg w-80">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Events, clients, vendors talaash karein..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200">
          <Settings className="w-4 h-4" />
        </button>
        <button className="relative w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold cursor-pointer shadow-md">
          SP
        </div>
      </div>
    </div>
  );
}
