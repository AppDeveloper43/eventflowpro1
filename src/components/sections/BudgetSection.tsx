import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function BudgetSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Budget Management</h1>
        <button
          onClick={() => toast.success("Expense add ho raha hai")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Expense Add Karein
        </button>
      </div>

      {/* Empty state charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Overall Budget Status</h3>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground text-sm">Abhi koi budget data nahi — pehla expense add karein.</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Budget Breakdown</h3>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground text-sm">Expenses add honay ke baad yahan breakdown dikhay ga.</p>
          </div>
        </div>
      </div>

      {/* Empty expense table */}
      <div className="bg-card border border-border rounded-lg p-5 overflow-x-auto">
        <h3 className="font-semibold text-foreground mb-4">Expense Tracking</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Category", "Item", "Budgeted", "Actual", "Farq", "Status", ""].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="py-8 text-center text-muted-foreground">
                Abhi koi expense record nahi hai. Pehla expense add karein.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Common categories:</span>
          {["Venue/Hall", "Catering", "Decor/Flowers", "Photography", "DJ/Sound", "Mehndi Artist", "Dulhan Makeup", "Cards/Invites", "Transport"].map((c) => (
            <span key={c} className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
