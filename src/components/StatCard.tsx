import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  positive?: boolean;
  icon: LucideIcon;
  gradient?: "primary" | "gold" | "rose";
}

export default function StatCard({ title, value, change, changeLabel, positive, icon: Icon, gradient = "primary" }: StatCardProps) {
  const gradientClass = {
    primary: "bg-gradient-primary",
    gold: "bg-gradient-gold",
    rose: "bg-gradient-rose",
  }[gradient];

  return (
    <div className="bg-card border border-border rounded-xl p-5 card-hover group relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${gradientClass} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={`w-10 h-10 rounded-lg ${gradientClass} flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
      <div className="text-2xl font-display font-bold text-foreground mb-1">{value}</div>
      {change && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className={positive ? "text-success font-medium" : positive === false ? "text-destructive font-medium" : "font-medium"}>{change}</span>
          {changeLabel && <span>{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
