import { CalendarDays, Users, DollarSign, PieChart, UserPlus, FileSpreadsheet, ListTodo, MessageCircle, FileDown, ArrowUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Legend, LineChart, Line, Area, AreaChart } from "recharts";
import StatCard from "../StatCard";
import { toast } from "sonner";

const revenueData = [
  { month: "Jan", revenue: 25000 },
  { month: "Feb", revenue: 32000 },
  { month: "Mar", revenue: 28000 },
  { month: "Apr", revenue: 45000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 52000 },
];

const budgetData = [
  { name: "Venue", value: 35, color: "#7C3AED" },
  { name: "Catering", value: 28, color: "#2563EB" },
  { name: "Decoration", value: 20, color: "#8B5CF6" },
  { name: "Photography", value: 12, color: "#3B82F6" },
  { name: "Entertainment", value: 5, color: "#A78BFA" },
];

const activities = [
  { icon: UserPlus, text: "New client added: Johnson Wedding", time: "2 minutes ago" },
  { icon: FileSpreadsheet, text: "Invoice paid: Corporate Gala", time: "1 hour ago" },
  { icon: ListTodo, text: "Task completed: Venue booking for Smith Event", time: "3 hours ago" },
  { icon: MessageCircle, text: "New message from vendor: Photography confirmation", time: "5 hours ago" },
  { icon: FileDown, text: "Report exported: Budget summary", time: "Yesterday" },
];

const upcomingEvents = [
  { day: "15", month: "JUN", name: "Johnson Wedding", location: "Grand Hotel" },
  { day: "18", month: "JUN", name: "Corporate Gala", location: "Convention Center" },
  { day: "22", month: "JUN", name: "Smith Birthday", location: "Private Venue" },
  { day: "25", month: "JUN", name: "Tech Conference", location: "Expo Center" },
  { day: "28", month: "JUN", name: "Charity Dinner", location: "Ritz Carlton" },
];

export default function DashboardSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Welcome back, Sarah</h1>
        <button
          onClick={() => toast.success("Quick action menu opened")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150"
        >
          + Quick Action
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Upcoming Events" value="12" change="↑ +2" changeLabel="from last month" positive icon={CalendarDays} />
        <StatCard title="Active Clients" value="24" change="↑ +5" changeLabel="new this month" positive icon={Users} />
        <StatCard title="Revenue (MTD)" value="$48.5k" change="↑ +15%" changeLabel="vs last month" positive icon={DollarSign} />
        <StatCard title="Budget Progress" value="68%" change="$32.5k spent" changeLabel="of $47.8k total" icon={PieChart} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Revenue Overview</h3>
            <div className="flex gap-1">
              <button className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium">Monthly</button>
              <button className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs font-medium hover:text-foreground transition-colors">Quarterly</button>
              <button className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs font-medium hover:text-foreground transition-colors">Yearly</button>
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
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "6px",
                  fontSize: 13,
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#7C3AED" fill="url(#revenueGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Budget Distribution</h3>
            <div className="flex gap-1">
              <button className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium">By Category</button>
              <button className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs font-medium hover:text-foreground transition-colors">By Event</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RPieChart>
              <Pie data={budgetData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" stroke="hsl(0, 0%, 100%)" strokeWidth={2}>
                {budgetData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "6px",
                  fontSize: 13,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
            </RPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-0">
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-border last:border-b-0">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Upcoming Events</h3>
          <div className="space-y-2">
            {upcomingEvents.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-md">
                <div className="text-center min-w-[40px]">
                  <div className="text-lg font-bold text-gradient">{e.day}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{e.month}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.location}</p>
                </div>
                <span className="text-[11px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full whitespace-nowrap">Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
