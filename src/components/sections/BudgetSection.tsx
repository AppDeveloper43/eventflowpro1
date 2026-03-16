import { useState } from "react";
import { Plus, Trash2, Edit2, X, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Expense {
  id: number;
  category: string;
  item: string;
  budgeted: number;
  actual: number;
  paid: boolean;
}

const defaultCategories = [
  "Venue/Hall", "Catering", "Decor/Flowers", "Photography/Video", "DJ/Sound",
  "Mehndi Artist", "Dulhan Makeup", "Cards/Invites", "Transport", "Dulhan Dress",
  "Dulha Sherwani", "Jewellery", "Lighting", "Stage Setup", "Gifts/Favours",
];

const categoryColors: Record<string, string> = {
  "Venue/Hall": "#8B1A3A", "Catering": "#C07840", "Decor/Flowers": "#D4956A",
  "Photography/Video": "#6B2D3E", "DJ/Sound": "#A0522D", "Mehndi Artist": "#CD853F",
  "Dulhan Makeup": "#BC5C6E", "Cards/Invites": "#B8860B", "Transport": "#8B6914",
  "Dulhan Dress": "#922B3E", "Dulha Sherwani": "#7A4B2A", "Jewellery": "#DAA520",
  "Lighting": "#9B4D3A", "Stage Setup": "#704214", "Gifts/Favours": "#C9956B",
};

function formatPKR(n: number) {
  return "PKR " + n.toLocaleString("en-PK");
}

export default function BudgetSection() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const totalBudgeted = expenses.reduce((s, e) => s + e.budgeted, 0);
  const totalActual = expenses.reduce((s, e) => s + e.actual, 0);
  const totalDiff = totalBudgeted - totalActual;
  const budgetUsedPct = totalBudgeted > 0 ? Math.round((totalActual / totalBudgeted) * 100) : 0;
  const totalPaid = expenses.filter((e) => e.paid).reduce((s, e) => s + e.actual, 0);
  const totalUnpaid = totalActual - totalPaid;

  // Chart data grouped by category
  const categoryTotals = expenses.reduce<Record<string, { budgeted: number; actual: number }>>((acc, e) => {
    if (!acc[e.category]) acc[e.category] = { budgeted: 0, actual: 0 };
    acc[e.category].budgeted += e.budgeted;
    acc[e.category].actual += e.actual;
    return acc;
  }, {});
  const chartData = Object.entries(categoryTotals).map(([name, v]) => ({ name, ...v }));

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const expense: Expense = {
      id: editingId ?? Date.now(),
      category: fd.get("category") as string,
      item: fd.get("item") as string,
      budgeted: Number(fd.get("budgeted")) || 0,
      actual: Number(fd.get("actual")) || 0,
      paid: fd.get("paid") === "on",
    };
    if (editingId) {
      setExpenses(expenses.map((ex) => (ex.id === editingId ? expense : ex)));
      toast.success("Expense update ho gaya!");
    } else {
      setExpenses([expense, ...expenses]);
      toast.success("Expense add ho gaya!");
    }
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    toast.success("Expense delete ho gaya!");
  };

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setShowModal(true);
  };

  const editingExpense = editingId ? expenses.find((e) => e.id === editingId) : null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-gradient">Budget Management</h1>
        <button
          onClick={() => { setEditingId(null); setShowModal(true); }}
          className="bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Expense Add Karein
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Budget", value: formatPKR(totalBudgeted), color: "text-foreground" },
          { label: "Total Spent", value: formatPKR(totalActual), color: totalActual > totalBudgeted ? "text-destructive" : "text-foreground" },
          { label: "Bacha Hua", value: formatPKR(Math.max(totalDiff, 0)), color: totalDiff >= 0 ? "text-success" : "text-destructive" },
          { label: "Unpaid Balance", value: formatPKR(totalUnpaid), color: "text-warning" },
        ].map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-4 wedding-shadow">
            <p className="text-xs font-medium text-muted-foreground mb-1">{c.label}</p>
            <p className={`text-xl font-display font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Budget Progress Bar */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6 wedding-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-semibold text-foreground">Overall Budget Progress</h3>
          <span className="text-sm font-semibold text-muted-foreground">{budgetUsedPct}% used</span>
        </div>
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${budgetUsedPct > 100 ? "bg-destructive" : budgetUsedPct > 80 ? "bg-warning" : "bg-gradient-primary"}`}
            style={{ width: `${Math.min(budgetUsedPct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{formatPKR(totalActual)} spent</span>
          <span>{formatPKR(totalBudgeted)} total</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5 wedding-shadow">
          <h3 className="font-display font-semibold text-foreground mb-4">Category Breakdown</h3>
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px]">
              <p className="text-muted-foreground text-sm">Expenses add karein taake chart dikhe.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fill: "hsl(340, 10%, 45%)", fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                <YAxis tick={{ fill: "hsl(340, 10%, 45%)", fontSize: 11 }} />
                <Tooltip
                  formatter={(val: number) => formatPKR(val)}
                  contentStyle={{ background: "hsl(30, 25%, 98%)", border: "1px solid hsl(30, 15%, 88%)", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="budgeted" name="Budgeted" radius={[4, 4, 0, 0]}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={categoryColors[d.name] || "#8B1A3A"} opacity={0.4} />
                  ))}
                </Bar>
                <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={categoryColors[d.name] || "#8B1A3A"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="bg-card border border-border rounded-xl p-5 wedding-shadow">
          <h3 className="font-display font-semibold text-foreground mb-4">Category Allocation</h3>
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px]">
              <p className="text-muted-foreground text-sm">Expenses add honay ke baad allocation dikhe ga.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {chartData.map((d) => {
                const pct = totalBudgeted > 0 ? Math.round((d.budgeted / totalBudgeted) * 100) : 0;
                const overBudget = d.actual > d.budgeted;
                return (
                  <div key={d.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{d.name}</span>
                      <span className={`text-xs ${overBudget ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                        {formatPKR(d.actual)} / {formatPKR(d.budgeted)} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${overBudget ? "bg-destructive" : "bg-gradient-primary"}`}
                        style={{ width: `${d.budgeted > 0 ? Math.min((d.actual / d.budgeted) * 100, 100) : 0}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-x-auto wedding-shadow">
        <h3 className="font-display font-semibold text-foreground mb-4">Expense Details</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Category", "Item", "Budgeted", "Actual", "Farq", "Status", "Paid", ""].map((h) => (
                <th key={h} className="text-left py-3 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-muted-foreground">
                  <DollarSign className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
                  Abhi koi expense nahi hai. Pehla expense add karein.
                </td>
              </tr>
            ) : (
              expenses.map((exp) => {
                const diff = exp.budgeted - exp.actual;
                const overBudget = diff < 0;
                return (
                  <tr key={exp.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: categoryColors[exp.category] || "#8B1A3A" }} />
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-foreground">{exp.item}</td>
                    <td className="py-3 px-3">{formatPKR(exp.budgeted)}</td>
                    <td className="py-3 px-3">{formatPKR(exp.actual)}</td>
                    <td className={`py-3 px-3 font-semibold ${overBudget ? "text-destructive" : "text-success"}`}>
                      {overBudget ? "-" : "+"}{formatPKR(Math.abs(diff))}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${overBudget ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
                        {overBudget ? "Over Budget" : "Under Budget"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => setExpenses(expenses.map((e) => e.id === exp.id ? { ...e, paid: !e.paid } : e))}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${exp.paid ? "bg-success border-success text-success-foreground" : "border-border"}`}
                      >
                        {exp.paid && "✓"}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        <button onClick={() => handleEdit(exp)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(exp.id)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {expenses.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-border font-semibold">
                <td className="py-3 px-3" colSpan={2}>Total</td>
                <td className="py-3 px-3">{formatPKR(totalBudgeted)}</td>
                <td className="py-3 px-3">{formatPKR(totalActual)}</td>
                <td className={`py-3 px-3 ${totalDiff < 0 ? "text-destructive" : "text-success"}`}>
                  {totalDiff < 0 ? "-" : "+"}{formatPKR(Math.abs(totalDiff))}
                </td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => { setShowModal(false); setEditingId(null); }}>
          <div className="bg-background border border-border rounded-xl p-6 max-w-md w-[90%] wedding-shadow" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-display font-bold text-gradient">{editingId ? "Expense Edit Karein" : "Naya Expense"}</h2>
              <button onClick={() => { setShowModal(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
                <select name="category" defaultValue={editingExpense?.category || ""} required className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                  <option value="" disabled>Select karein</option>
                  {defaultCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Item / Description</label>
                <input name="item" defaultValue={editingExpense?.item || ""} required placeholder="e.g. Main Hall Booking" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Budgeted (PKR)</label>
                  <input name="budgeted" type="number" min="0" defaultValue={editingExpense?.budgeted || ""} required placeholder="500000" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Actual (PKR)</label>
                  <input name="actual" type="number" min="0" defaultValue={editingExpense?.actual || ""} placeholder="0" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input name="paid" type="checkbox" defaultChecked={editingExpense?.paid || false} className="w-4 h-4 rounded border-border accent-primary" />
                Payment ho chuki hai
              </label>
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-md">
                {editingId ? "Update Karein" : "Expense Save Karein"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
