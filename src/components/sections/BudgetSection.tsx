import { Plus, Edit } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";

const barData = [
  { name: "Budgeted", value: 47800, color: "#7C3AED" },
  { name: "Actual", value: 32500, color: "#2563EB" },
  { name: "Remaining", value: 15300, color: "#A78BFA" },
];

const pieData = [
  { name: "Venue", value: 35, color: "#7C3AED" },
  { name: "Catering", value: 25, color: "#2563EB" },
  { name: "Decoration", value: 15, color: "#8B5CF6" },
  { name: "Photography", value: 10, color: "#3B82F6" },
  { name: "Entertainment", value: 8, color: "#A78BFA" },
  { name: "Misc", value: 7, color: "#60A5FA" },
];

const expenses = [
  { category: "Venue", item: "Grand Hotel", budgeted: "$15,000", actual: "$14,500", variance: "+$500", variancePositive: true, status: "Paid" },
  { category: "Catering", item: "Elite Catering", budgeted: "$12,000", actual: "$12,800", variance: "-$800", variancePositive: false, status: "Pending" },
  { category: "Decoration", item: "Floral Dreams", budgeted: "$8,000", actual: "$7,200", variance: "+$800", variancePositive: true, status: "Paid" },
  { category: "Photography", item: "Capture Moments", budgeted: "$5,000", actual: "$5,000", variance: "$0", variancePositive: true, status: "Paid" },
];

export default function BudgetSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Budget Management</h1>
        <button
          onClick={() => toast.success("Adding expense")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Overall Budget Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220,13%,91%)", borderRadius: 6, fontSize: 13 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {barData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Budget Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" stroke="#fff" strokeWidth={2}>
                {pieData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220,13%,91%)", borderRadius: 6, fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-card border border-border rounded-lg p-5 overflow-x-auto">
        <h3 className="font-semibold text-foreground mb-4">Expense Tracking</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Category", "Item", "Budgeted", "Actual", "Variance", "Status", ""].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, i) => (
              <tr key={i} className="border-b border-border last:border-b-0">
                <td className="py-3 px-4 text-foreground">{exp.category}</td>
                <td className="py-3 px-4 text-foreground">{exp.item}</td>
                <td className="py-3 px-4 text-foreground">{exp.budgeted}</td>
                <td className="py-3 px-4 text-foreground">{exp.actual}</td>
                <td className={`py-3 px-4 font-medium ${exp.variancePositive ? "text-success" : "text-destructive"}`}>{exp.variance}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${exp.status === "Paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {exp.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => toast.info("Editing expense")} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
