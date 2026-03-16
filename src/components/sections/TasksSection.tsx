import { useState } from "react";
import { Plus, ListTodo, X, Trash2, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  completed: boolean;
  assignedTo: string;
}

const priorityStyles: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
};

const taskCategories = ["Venue", "Catering", "Decor", "Photography", "Mehndi", "Makeup", "Dress", "Cards", "Transport", "Entertainment", "Other"];

function daysUntil(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { text: `${Math.abs(diff)} din late`, overdue: true };
  if (diff === 0) return { text: "Aaj!", overdue: false };
  return { text: `${diff} din baqi`, overdue: false };
}

export default function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = tasks.filter((t) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return t.completed;
    if (activeFilter === "pending") return !t.completed;
    if (activeFilter === "overdue") return !t.completed && t.dueDate && new Date(t.dueDate) < new Date();
    if (activeFilter === "high") return t.priority === "high" && !t.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const overdueTasks = tasks.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length;
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const task: Task = {
      id: Date.now(),
      title: fd.get("title") as string,
      category: fd.get("category") as string,
      priority: (fd.get("priority") as Task["priority"]) || "medium",
      dueDate: fd.get("dueDate") as string,
      completed: false,
      assignedTo: fd.get("assignedTo") as string,
    };
    setTasks([task, ...tasks]);
    setShowModal(false);
    toast.success("Task add ho gayi!");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task delete ho gayi!");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-gradient">Task & Timeline Planner</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Nayi Task
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 wedding-shadow">
          <p className="text-xs text-muted-foreground font-medium">Total Tasks</p>
          <p className="text-xl font-display font-bold text-foreground">{totalTasks}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 wedding-shadow">
          <p className="text-xs text-muted-foreground font-medium">Completed</p>
          <p className="text-xl font-display font-bold text-success">{completedTasks}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 wedding-shadow">
          <p className="text-xs text-muted-foreground font-medium">Overdue</p>
          <p className="text-xl font-display font-bold text-destructive">{overdueTasks}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 wedding-shadow">
          <p className="text-xs text-muted-foreground font-medium">Progress</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-display font-bold text-foreground">{completionPct}%</p>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "Sab Tasks" },
          { key: "pending", label: "Pending" },
          { key: "completed", label: "Completed" },
          { key: "overdue", label: "Overdue" },
          { key: "high", label: "High Priority" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === f.key ? "bg-gradient-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center wedding-shadow">
          <ListTodo className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">Koi task nahi mili.</p>
          <p className="text-sm text-muted-foreground mt-1">Tasks add karein: Venue book karna, Caterer finalize, etc.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((task) => {
            const due = task.dueDate ? daysUntil(task.dueDate) : null;
            return (
              <div key={task.id} className={`bg-card border border-border rounded-xl p-4 flex items-center gap-4 wedding-shadow transition-all duration-200 hover:border-primary/30 ${task.completed ? "opacity-60" : ""}`}>
                <button onClick={() => toggleTask(task.id)} className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-medium text-foreground ${task.completed ? "line-through" : ""}`}>{task.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}>{task.priority}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{task.category}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    {task.dueDate && (
                      <span className={`flex items-center gap-1 ${due?.overdue ? "text-destructive font-medium" : ""}`}>
                        {due?.overdue ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {task.dueDate} — {due?.text}
                      </span>
                    )}
                    {task.assignedTo && <span>→ {task.assignedTo}</span>}
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-background border border-border rounded-xl p-6 max-w-md w-[90%] wedding-shadow" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-display font-bold text-gradient">Nayi Task</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Task Title</label>
                <input name="title" required placeholder="e.g. Venue booking confirm karna" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
                  <select name="category" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                    {taskCategories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Priority</label>
                  <select name="priority" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                    <option value="high">High</option>
                    <option value="medium" selected>Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Due Date</label>
                  <input name="dueDate" type="date" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Assigned To</label>
                  <input name="assignedTo" placeholder="Name" className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 shadow-md">
                Task Save Karein
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
