import { useState } from "react";
import { Mail, Phone, CalendarDays, Users, Eye, Edit, Calendar, Paperclip, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  event: string;
  guests: number;
  status: "confirmed" | "negotiation" | "inquiry" | "completed";
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  negotiation: "bg-info/10 text-info",
  inquiry: "bg-warning/10 text-warning",
  completed: "bg-muted text-muted-foreground",
};

const statusLabelsUrdu: Record<string, string> = {
  confirmed: "Confirmed",
  negotiation: "Negotiation",
  inquiry: "Inquiry",
  completed: "Completed",
};

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = clients.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (typeFilter !== "all" && !c.event.toLowerCase().includes(typeFilter)) return false;
    return true;
  });

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newClient: Client = {
      id: Date.now(),
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      event: `${fd.get("eventType")} - ${fd.get("eventDate")}`,
      guests: Number(fd.get("guests")) || 0,
      status: (fd.get("status") as Client["status"]) || "inquiry",
    };
    setClients([newClient, ...clients]);
    setShowModal(false);
    toast.success("Client successfully add ho gaya!");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Client Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Naya Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground"
        >
          <option value="all">Sab Status</option>
          <option value="inquiry">Inquiry</option>
          <option value="negotiation">Negotiation</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground"
        >
          <option value="all">Sab Event Types</option>
          <option value="nikkah">Nikkah</option>
          <option value="mehndi">Mehndi</option>
          <option value="baraat">Baraat</option>
          <option value="walima">Walima</option>
          <option value="dholki">Dholki</option>
          <option value="corporate">Corporate Event</option>
          <option value="birthday">Birthday</option>
        </select>
      </div>

      {/* Clients Grid */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-10 text-center">
          <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">Abhi koi client nahi hai.</p>
          <p className="text-sm text-muted-foreground mt-1">Pehla client add karne ke liye "Naya Client" button dabayein.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((client) => (
            <div key={client.id} className="bg-card border border-border rounded-lg p-5 card-hover">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">{client.name}</span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${statusStyles[client.status]}`}>
                  {statusLabelsUrdu[client.status]}
                </span>
              </div>
              <div className="border-t border-b border-border py-3 my-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" /> {client.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" /> {client.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-primary" /> {client.event}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" /> {client.guests} mehmaan
                </div>
              </div>
              <div className="flex justify-end gap-1.5">
                {[Eye, Edit, Calendar, Paperclip].map((Icon, i) => (
                  <button
                    key={i}
                    onClick={() => toast.info("Action triggered")}
                    className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-gradient-primary hover:text-primary-foreground hover:border-primary transition-all duration-150"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-[90%] max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gradient">Naya Client Add Karein</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddClient} className="space-y-4">
              {[
                { name: "name", label: "Poora Naam", type: "text", placeholder: "Ahmed Ali" },
                { name: "email", label: "Email", type: "email", placeholder: "ahmed@email.com" },
                { name: "phone", label: "Phone Number", type: "tel", placeholder: "0300-1234567" },
                { name: "eventDate", label: "Event Ki Tareekh", type: "date", placeholder: "" },
                { name: "guests", label: "Mehmaan Ki Tadaad", type: "number", placeholder: "500" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.name === "name"}
                    className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Event Type</label>
                <select name="eventType" className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground">
                  <option>Nikkah</option>
                  <option>Mehndi</option>
                  <option>Baraat</option>
                  <option>Walima</option>
                  <option>Dholki</option>
                  <option>Engagement (Mangni)</option>
                  <option>Corporate Event</option>
                  <option>Birthday Party</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                <select name="status" className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground">
                  <option value="inquiry">Inquiry</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Notes</label>
                <textarea name="notes" rows={3} placeholder="Koi aur details..." className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                Client Save Karein
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
