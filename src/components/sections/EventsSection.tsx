import { useState } from "react";
import { CalendarDays, MapPin, Users, Plus, X, Trash2, Edit2, Clock } from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: number;
  name: string;
  type: string;
  date: string;
  venue: string;
  guests: number;
  budget: number;
  status: "planning" | "confirmed" | "completed" | "cancelled";
  notes: string;
}

const eventTypes = ["Nikkah", "Mehndi", "Baraat", "Walima", "Dholki", "Engagement (Mangni)", "Corporate Event", "Birthday Party", "Other"];
const statusStyles: Record<string, string> = {
  planning: "bg-warning/10 text-warning",
  confirmed: "bg-success/10 text-success",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

function formatPKR(n: number) {
  return "PKR " + n.toLocaleString("en-PK");
}

function daysUntil(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "Guzar chuka";
  if (diff === 0) return "Aaj hai!";
  return `${diff} din baqi`;
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState("all");

  const filtered = filterType === "all" ? events : events.filter((e) => e.type === filterType);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const ev: Event = {
      id: editingId ?? Date.now(),
      name: fd.get("name") as string,
      type: fd.get("type") as string,
      date: fd.get("date") as string,
      venue: fd.get("venue") as string,
      guests: Number(fd.get("guests")) || 0,
      budget: Number(fd.get("budget")) || 0,
      status: (fd.get("status") as Event["status"]) || "planning",
      notes: fd.get("notes") as string,
    };
    if (editingId) {
      setEvents(events.map((ex) => (ex.id === editingId ? ev : ex)));
      toast.success("Event update ho gaya!");
    } else {
      setEvents([ev, ...events]);
      toast.success("Event add ho gaya!");
    }
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.success("Event delete ho gaya!");
  };

  const editingEvent = editingId ? events.find((e) => e.id === editingId) : null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-gradient">Event Management</h1>
        <button
          onClick={() => { setEditingId(null); setShowModal(true); }}
          className="bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Naya Event
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {["all", ...eventTypes].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${filterType === t ? "bg-gradient-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {t === "all" ? "Sab Events" : t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center wedding-shadow">
          <CalendarDays className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">Abhi koi event nahi hai.</p>
          <p className="text-sm text-muted-foreground mt-1">Pehla event add karne ke liye "Naya Event" button dabayein.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((ev) => (
            <div key={ev.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover wedding-shadow group">
              <div className="h-2 bg-gradient-primary" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg">{ev.name}</h3>
                    <span className="text-xs font-medium text-secondary">{ev.type}</span>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[ev.status]}`}>
                    {ev.status}
                  </span>
                </div>
                <div className="space-y-2 py-3 border-t border-b border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4 text-primary" /> {ev.date}
                    <span className="ml-auto text-xs font-medium text-secondary">
                      <Clock className="w-3 h-3 inline mr-1" />{daysUntil(ev.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" /> {ev.venue || "Venue set nahi hua"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" /> {ev.guests} mehmaan
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display font-bold text-foreground">{formatPKR(ev.budget)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingId(ev.id); setShowModal(true); }} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => { setShowModal(false); setEditingId(null); }}>
          <div className="bg-background border border-border rounded-xl p-6 max-w-md w-[90%] max-h-[85vh] overflow-y-auto wedding-shadow" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-display font-bold text-gradient">{editingId ? "Event Edit Karein" : "Naya Event Banayein"}</h2>
              <button onClick={() => { setShowModal(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { name: "name", label: "Event Name", type: "text", placeholder: "Ahmed & Ayesha ki Baraat", def: editingEvent?.name },
                { name: "date", label: "Event Date", type: "date", placeholder: "", def: editingEvent?.date },
                { name: "venue", label: "Venue", type: "text", placeholder: "Royal Palm, Lahore", def: editingEvent?.venue },
                { name: "guests", label: "Expected Mehmaan", type: "number", placeholder: "500", def: editingEvent?.guests },
                { name: "budget", label: "Budget (PKR)", type: "number", placeholder: "2500000", def: editingEvent?.budget },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} defaultValue={f.def || ""} required={f.name === "name"}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Event Type</label>
                <select name="type" defaultValue={editingEvent?.type || ""} className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                  {eventTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                <select name="status" defaultValue={editingEvent?.status || "planning"} className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                  <option value="planning">Planning</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Notes</label>
                <textarea name="notes" rows={2} defaultValue={editingEvent?.notes || ""} placeholder="Koi detail..." className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 shadow-md">
                {editingId ? "Update Karein" : "Event Save Karein"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
