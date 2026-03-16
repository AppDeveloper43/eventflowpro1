import { CalendarDays, Users, DollarSign, PieChart, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "../StatCard";

const emptyRevenue = [
  { month: "Jan", revenue: 0 },
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 0 },
  { month: "Apr", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "Jun", revenue: 0 },
];

export default function DashboardSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gradient">Assalam-o-Alaikum! ✨</h1>
          <p className="text-sm text-muted-foreground mt-1">Aapka Shaadi Planner Dashboard</p>
        </div>
        <button className="bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-200 shadow-md flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Naya Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Aanay Wale Events" value="0" icon={CalendarDays} gradient="primary" />
        <StatCard title="Active Clients" value="0" icon={Users} gradient="rose" />
        <StatCard title="Revenue (MTD)" value="PKR 0" icon={DollarSign} gradient="gold" />
        <StatCard title="Budget Progress" value="0%" change="PKR 0 spent" changeLabel="of PKR 0 total" icon={PieChart} gradient="primary" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5 wedding-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Revenue Overview</h3>
            <div className="flex gap-1">
              <button className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium">Monthly</button>
              <button className="bg-muted text-muted-foreground px-3 py-1 rounded-lg text-xs font-medium hover:text-foreground transition-colors">Quarterly</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={emptyRevenue}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B1A3A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#C07840" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(340, 10%, 45%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(340, 10%, 45%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(30, 25%, 98%)", border: "1px solid hsl(30, 15%, 88%)", borderRadius: 8, fontSize: 13 }} />
              <Area type="monotone" dataKey="revenue" stroke="#8B1A3A" fill="url(#revenueGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 wedding-shadow">
          <h3 className="font-display font-semibold text-foreground mb-4">Budget Distribution</h3>
          <div className="flex items-center justify-center h-[260px]">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Koi budget data nahi hai abhi.</p>
              <p className="text-xs text-muted-foreground mt-1">Pehla event ya expense add karein!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 wedding-shadow">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="flex items-center justify-center py-10">
            <div className="text-center">
              <CalendarDays className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Koi recent activity nahi.</p>
              <p className="text-xs text-muted-foreground mt-1">Naya event ya client add karein.</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 wedding-shadow">
          <h3 className="font-display font-semibold text-foreground mb-4">Aanay Wale Events</h3>
          <div className="flex items-center justify-center py-10">
            <div className="text-center">
              <Sparkles className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Koi upcoming event nahi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
