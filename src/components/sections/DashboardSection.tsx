import { CalendarDays, Users, DollarSign, PieChart, UserPlus, FileSpreadsheet, ListTodo, MessageCircle, FileDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Legend } from "recharts";
import StatCard from "../StatCard";
import { toast } from "sonner";

const revenueData = [
  { month: "Jan", revenue: 0 },
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 0 },
  { month: "Apr", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "Jun", revenue: 0 },
];

const budgetData = [
  { name: "Venue", value: 0, color: "#7C3AED" },
  { name: "Catering", value: 0, color: "#2563EB" },
  { name: "Decor", value: 0, color: "#8B5CF6" },
  { name: "Photography", value: 0, color: "#3B82F6" },
  { name: "Entertainment", value: 0, color: "#A78BFA" },
];

export default function DashboardSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Assalam-o-Alaikum! 👋</h1>
        <button
          onClick={() => toast.success("Quick action menu opened")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150"
        >
          + Naya Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Aanay Wale Events" value="0" icon={CalendarDays} />
        <StatCard title="Active Clients" value="0" icon={Users} />
        <StatCard title="Revenue (MTD)" value="PKR 0" icon={DollarSign} />
        <StatCard title="Budget Progress" value="0%" change="PKR 0 spent" changeLabel="of PKR 0 total" icon={PieChart} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Revenue Overview</h3>
            <div className="flex gap-1">
              <button className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium">Monthly</button>
              <button className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs font-medium hover:text-foreground transition-colors">Quarterly</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220,13%,91%)", borderRadius: 6, fontSize: 13 }} />
              <Area type="monotone" dataKey="revenue" stroke="#7C3AED" fill="url(#revenueGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Budget Distribution</h3>
          </div>
          <div className="flex items-center justify-center h-[260px]">
            <p className="text-muted-foreground text-sm">Koi budget data nahi hai abhi — pehla event add karein!</p>
          </div>
        </div>
      </div>

      {/* Activity + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="flex items-center justify-center py-10">
            <p className="text-muted-foreground text-sm">Koi recent activity nahi — shuru karne ke liye naya event ya client add karein.</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Aanay Wale Events</h3>
          <div className="flex items-center justify-center py-10">
            <p className="text-muted-foreground text-sm">Koi upcoming event nahi hai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
