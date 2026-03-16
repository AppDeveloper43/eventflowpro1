import { useState } from "react";
import { Mail, Phone, CalendarDays, Users, Eye, Edit2, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  budget: number;
  status: "confirmed" | "negotiation" | "inquiry" | "completed";
  notes: string;
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  negotiation: "bg-info/10 text-info",
  inquiry: "bg-warning/10 text-warning",
  completed: "bg-muted text-muted-foreground",
};

function formatPKR(n: number) {
  return "PKR " + n.toLocaleString("en-PK");
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewingClient, setViewingClient] = useState<Client | null>(null);

  const filtered = clients.filter((c) => statusFilter === "all" || c.status === statusFilter);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const client: Client = {
      id: editingId ?? Date.now(),
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      eventType: fd.get("eventType") as string,
      eventDate: fd.get("eventDate") as string,
      guests: Number(fd.get("guests")) || 0,
      budget: Number(fd.get("budget")) || 0,
      status: (fd.get("status") as Client["status"]) || "inquiry",
      notes: fd.get("notes") as string,
    };
    if (editingId) {
      setClients(clients.map((c) => (c.id === editingId ? client : c)));
      toast.success("Client update ho gaya!");
    } else {
      setClients([client, ...clients]);
      toast.success("Client add ho gaya!");
    }
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter((c) => c.id !== id));
    toast.success("Client delete ho gaya!");
  };

  const editingClient = editingId ? clients.find((c) => c.id === editingId) : null;

  // Summary
  const totalClients = clients.length;
  const totalRevenue = clients.reduce((s, c) => s + c.budget, 0);
  const confirmedCount = clients.filter((c) => c.status === "confirmed").length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-gradient">Client Management</h1>
        <button
          onClick={() => { setEditingId(null); setShowModal(true); }}
          className="bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Naya Client
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 wedding-shadow">
          <p className="text-xs text-muted-foreground font-medium">Total Clients</p>
          <p className="text-xl font-display font-bold text-foreground">{totalClients}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 wedding-shadow">
          <p className="text-xs text-muted-foreground font-medium">Confirmed</p>
          <p className="text-xl font-display font-bold text-success">{confirmedCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 wedding-shadow">
          <p className="text-xs text-muted-foreground font-medium">Total Revenue</p>
          <p className="text-xl font-display font-bold text-foreground">{formatPKR(totalRevenue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "inquiry", "negotiation", "confirmed", "completed"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 capitalize ${statusFilter === s ? "bg-gradient-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {s === "all" ? "Sab" : s}
          </button>
        ))}
      </div>

      {/* Client cards */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center wedding-shadow">
          <Users className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">Abhi koi client nahi hai.</p>
          <p className="text-sm text-muted-foreground mt-1">"Naya Client" button dabayein.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((client) => (
            <div key={client.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover wedding-shadow group">
              <div className="h-1.5 bg-gradient-primary" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-semibold text-foreground text-lg">{client.name}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[client.status]}`}>
                    {client.status}
                  </span>
                </div>
                <div className="border-t border-b border-border/50 py-3 my-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" /> {client.email || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" /> {client.phone || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4 text-primary" /> {client.eventType} — {client.eventDate || "TBD"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" /> {client.guests} mehmaan
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display font-bold text-foreground">{formatPKR(client.budget)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => setViewingClient(client)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { setEditingId(client.id); setShowModal(true); }} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(client.id)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewingClient && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setViewingClient(null)}>
          <div className="bg-background border border-border rounded-xl p-6 max-w-md w-[90%] wedding-shadow" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-gradient">{viewingClient.name}</h2>
              <button onClick={() => setViewingClient(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <p><strong className="text-foreground">Email:</strong> <span className="text-muted-foreground">{viewingClient.email || "—"}</span></p>
              <p><strong className="text-foreground">Phone:</strong> <span className="text-muted-foreground">{viewingClient.phone || "—"}</span></p>
              <p><strong className="text-foreground">Event:</strong> <span className="text-muted-foreground">{viewingClient.eventType} — {viewingClient.eventDate}</span></p>
              <p><strong className="text-foreground">Guests:</strong> <span className="text-muted-foreground">{viewingClient.guests}</span></p>
              <p><strong className="text-foreground">Budget:</strong> <span className="text-muted-foreground">{formatPKR(viewingClient.budget)}</span></p>
              <p><strong className="text-foreground">Status:</strong> <span className={`capitalize ${statusStyles[viewingClient.status]} px-2 py-0.5 rounded-full text-xs`}>{viewingClient.status}</span></p>
              {viewingClient.notes && <p><strong className="text-foreground">Notes:</strong> <span className="text-muted-foreground">{viewingClient.notes}</span></p>}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => { setShowModal(false); setEditingId(null); }}>
          <div className="bg-background border border-border rounded-xl p-6 max-w-md w-[90%] max-h-[85vh] overflow-y-auto wedding-shadow" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-display font-bold text-gradient">{editingId ? "Client Edit Karein" : "Naya Client"}</h2>
              <button onClick={() => { setShowModal(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { name: "name", label: "Poora Naam", type: "text", placeholder: "Ahmed Ali", def: editingClient?.name },
                { name: "email", label: "Email", type: "email", placeholder: "ahmed@email.com", def: editingClient?.email },
                { name: "phone", label: "Phone", type: "tel", placeholder: "0300-1234567", def: editingClient?.phone },
                { name: "eventDate", label: "Event Date", type: "date", placeholder: "", def: editingClient?.eventDate },
                { name: "guests", label: "Mehmaan", type: "number", placeholder: "500", def: editingClient?.guests },
                { name: "budget", label: "Budget (PKR)", type: "number", placeholder: "2000000", def: editingClient?.budget },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} defaultValue={f.def || ""} required={f.name === "name"}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Event Type</label>
                <select name="eventType" defaultValue={editingClient?.eventType || "Nikkah"} className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                  {["Nikkah", "Mehndi", "Baraat", "Walima", "Dholki", "Engagement", "Corporate", "Birthday", "Other"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                <select name="status" defaultValue={editingClient?.status || "inquiry"} className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                  <option value="inquiry">Inquiry</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Notes</label>
                <textarea name="notes" rows={2} defaultValue={editingClient?.notes || ""} placeholder="Koi detail..." className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 shadow-md">
                {editingId ? "Update Karein" : "Client Save Karein"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
