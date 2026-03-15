import { useState } from "react";
import { Plus, ListTodo } from "lucide-react";
import { toast } from "sonner";

const filters = ["Sab Tasks", "Meri Tasks", "Aanay Wali", "Overdue", "Completed"];

const timeline = [
  { week: "Week 1", dates: "", task: "—", event: "Koi task nahi" },
  { week: "Week 2", dates: "", task: "—", event: "Koi task nahi" },
  { week: "Week 3", dates: "", task: "—", event: "Koi task nahi" },
  { week: "Week 4", dates: "", task: "—", event: "Koi task nahi" },
];

export default function TasksSection() {
  const [activeFilter, setActiveFilter] = useState("Sab Tasks");

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Task & Timeline Planner</h1>
        <button
          onClick={() => toast.success("Nayi task create ho rahi hai")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nayi Task
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-150 ${
              activeFilter === f
                ? "bg-gradient-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Empty task list */}
      <div className="bg-card border border-border rounded-lg p-10 text-center mb-6">
        <ListTodo className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">Abhi koi task nahi hai.</p>
        <p className="text-sm text-muted-foreground mt-1">Tasks add karein jaise: Venue book karna, Caterer finalize karna, Mehndi artist se baat karna, etc.</p>
      </div>

      {/* Timeline */}
      <h3 className="font-semibold text-foreground mb-3">Timeline View</h3>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {timeline.map((t, i) => (
            <div key={i} className="min-w-[190px] flex-shrink-0">
              <div className="bg-muted p-3 rounded-md mb-2">
                <p className="font-semibold text-sm text-foreground">{t.week}</p>
                <p className="text-xs text-muted-foreground">{t.dates || "—"}</p>
              </div>
              <div className="bg-muted p-3 rounded-md border border-dashed border-border">
                <p className="text-sm text-muted-foreground">{t.task}</p>
                <p className="text-xs text-muted-foreground">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
