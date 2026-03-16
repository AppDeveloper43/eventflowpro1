import { useState } from "react";
import { Mail, Phone, Star, Plus, X, Trash2, Edit2, Store, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Vendor {
  id: number;
  name: string;
  category: string;
  phone: string;
  email: string;
  city: string;
  rate: number;
  rating: number;
  notes: string;
}

const categories = ["Caterer", "Photographer", "Videographer", "Decorator", "DJ/Sound", "Mehndi Artist", "Makeup Artist", "Venue/Hall", "Florist", "Transport", "Card Printer", "Lighting", "Tent/Marquee", "Other"];

function formatPKR(n: number) {
  return "PKR " + n.toLocaleString("en-PK");
}

export default function VendorsSection() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all" ? vendors : vendors.filter((v) => v.category === activeCategory);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const vendor: Vendor = {
      id: editingId ?? Date.now(),
      name: fd.get("name") as string,
      category: fd.get("category") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      city: fd.get("city") as string,
      rate: Number(fd.get("rate")) || 0,
      rating: Number(fd.get("rating")) || 0,
      notes: fd.get("notes") as string,
    };
    if (editingId) {
      setVendors(vendors.map((v) => (v.id === editingId ? vendor : v)));
      toast.success("Vendor update ho gaya!");
    } else {
      setVendors([vendor, ...vendors]);
      toast.success("Vendor add ho gaya!");
    }
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setVendors(vendors.filter((v) => v.id !== id));
    toast.success("Vendor delete ho gaya!");
  };

  const editingVendor = editingId ? vendors.find((v) => v.id === editingId) : null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-gradient">Vendor Management</h1>
        <button
          onClick={() => { setEditingId(null); setShowModal(true); }}
          className="bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Naya Vendor
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {["all", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? "bg-gradient-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {cat === "all" ? "Sab" : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center wedding-shadow">
          <Store className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">Abhi koi vendor nahi hai.</p>
          <p className="text-sm text-muted-foreground mt-1">"Naya Vendor" se add karein.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <div key={v.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover wedding-shadow">
              <div className="h-1.5 bg-gradient-gold" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg">{v.name}</h3>
                    <span className="text-xs font-medium text-secondary">{v.category}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < v.rating ? "text-secondary fill-secondary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5 py-3 border-t border-b border-border/50 my-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 text-primary" /> {v.phone || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3.5 h-3.5 text-primary" /> {v.email || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {v.city || "—"}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display font-bold text-foreground">{formatPKR(v.rate)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingId(v.id); setShowModal(true); }} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(v.id)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
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
              <h2 className="text-lg font-display font-bold text-gradient">{editingId ? "Vendor Edit" : "Naya Vendor"}</h2>
              <button onClick={() => { setShowModal(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { name: "name", label: "Vendor Name", type: "text", placeholder: "Studio XYZ", def: editingVendor?.name },
                { name: "phone", label: "Phone", type: "tel", placeholder: "0300-1234567", def: editingVendor?.phone },
                { name: "email", label: "Email", type: "email", placeholder: "vendor@email.com", def: editingVendor?.email },
                { name: "city", label: "City", type: "text", placeholder: "Lahore", def: editingVendor?.city },
                { name: "rate", label: "Rate (PKR)", type: "number", placeholder: "150000", def: editingVendor?.rate },
                { name: "rating", label: "Rating (1-5)", type: "number", placeholder: "4", def: editingVendor?.rating },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} defaultValue={f.def || ""} required={f.name === "name"} min={f.name === "rating" ? 1 : undefined} max={f.name === "rating" ? 5 : undefined}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
                <select name="category" defaultValue={editingVendor?.category || ""} className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Notes</label>
                <textarea name="notes" rows={2} defaultValue={editingVendor?.notes || ""} placeholder="Experience, speciality..." className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 shadow-md">
                {editingId ? "Update Karein" : "Vendor Save Karein"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
