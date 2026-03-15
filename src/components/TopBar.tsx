import { Search, Bell } from "lucide-react";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-3 bg-muted px-3 py-2 rounded-md w-80">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Events, clients, vendors talaash karein..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors duration-150">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold cursor-pointer">
          EP
        </div>
      </div>
    </div>
  );
}
