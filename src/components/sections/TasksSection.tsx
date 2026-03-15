import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: number;
  text: string;
  due: string;
  priority: string;
  status: "in-progress" | "overdue" | "completed";
  assignee: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: "Book venue for Johnson Wedding", due: "Due: June 1, 2024 · High priority", priority: "high", status: "in-progress", assignee: "You", completed: false },
  { id: 2, text: "Confirm catering for Corporate Gala", due: "Due: June 5, 2024 · Medium priority", priority: "medium", status: "in-progress", assignee: "Sarah", completed: false },
  { id: 3, text: "Arrange decoration for Smith Birthday", due: "Due: June 3, 2024 · Low priority", priority: "low", status: "overdue", assignee: "Mike", completed: false },
  { id: 4, text: "Send contracts to vendors", due: "Completed: May 28, 2024", priority: "medium", status: "completed", assignee: "You", completed: true },
];

const statusStyles: Record<string, string> = {
  "in-progress": "bg-warning/10 text-warning",
  overdue: "bg-destructive/10 text-destructive",
  completed: "bg-success/10 text-success",
};

const statusLabels: Record<string, string> = {
  "in-progress": "In Progress",
  overdue: "Overdue",
  completed: "Completed",
};

const timeline = [
  { week: "Week 1", dates: "Jun 1 - Jun 7", task: "Venue Booking", event: "Johnson Wedding" },
  { week: "Week 2", dates: "Jun 8 - Jun 14", task: "Catering Confirmation", event: "Corporate Gala" },
  { week: "Week 3", dates: "Jun 15 - Jun 21", task: "Decoration Setup", event: "Johnson Wedding" },
  { week: "Week 4", dates: "Jun 22 - Jun 28", task: "Final Walkthrough", event: "Multiple Events" },
];

const filters = ["All Tasks", "My Tasks", "Upcoming", "Overdue", "Completed"];

export default function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState("All Tasks");

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => {
      if (t.id === id) {
        const completed = !t.completed;
        return { ...t, completed, status: completed ? "completed" : "in-progress" };
      }
      return t;
    }));
    toast.success("Task updated");
  };

  const filtered = tasks.filter((t) => {
    if (activeFilter === "My Tasks") return t.assignee === "You";
    if (activeFilter === "Overdue") return t.status === "overdue";
    if (activeFilter === "Completed") return t.completed;
    if (activeFilter === "Upcoming") return !t.completed && t.status !== "overdue";
    return true;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Task & Timeline Planner</h1>
        <button
          onClick={() => toast.success("Creating new task")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Task
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

      {/* Task list */}
      <div className="bg-card border border-border rounded-lg p-5 mb-6">
        {filtered.map((task) => (
          <div key={task.id} className="flex items-center gap-3 py-3 border-b border-border last:border-b-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4 accent-primary rounded"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.text}</p>
              <p className="text-xs text-muted-foreground">{task.due}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${statusStyles[task.status]}`}>
              {statusLabels[task.status]}
            </span>
            <span className="bg-muted text-muted-foreground text-xs px-2.5 py-0.5 rounded-full whitespace-nowrap">
              {task.assignee}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <h3 className="font-semibold text-foreground mb-3">Timeline View</h3>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {timeline.map((t, i) => (
            <div key={i} className="min-w-[190px] flex-shrink-0">
              <div className="bg-muted p-3 rounded-md mb-2">
                <p className="font-semibold text-sm text-foreground">{t.week}</p>
                <p className="text-xs text-muted-foreground">{t.dates}</p>
              </div>
              <div className="bg-gradient-primary p-3 rounded-md">
                <p className="font-semibold text-sm text-primary-foreground">{t.task}</p>
                <p className="text-xs text-primary-foreground/70">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
