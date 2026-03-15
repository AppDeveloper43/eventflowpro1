import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  positive?: boolean;
  icon: LucideIcon;
}

export default function StatCard({ title, value, change, changeLabel, positive, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 card-hover group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" />
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="w-10 h-10 rounded-md bg-gradient-primary flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gradient mb-1">{value}</div>
      {change && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className={positive ? "text-success font-medium" : "text-destructive font-medium"}>{change}</span>
          {changeLabel && <span>{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
