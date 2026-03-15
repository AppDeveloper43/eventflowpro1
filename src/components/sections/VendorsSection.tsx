import { useState } from "react";
import { Mail, Phone, DollarSign, Star, Link, Edit, StickyNote, Plus, Store } from "lucide-react";
import { toast } from "sonner";

const categories = ["Sab Vendors", "Caterers", "Photographers", "Decorators", "DJ/Sound", "Mehndi Artists", "Makeup Artists", "Venues/Halls", "Florists", "Transport"];

export default function VendorsSection() {
  const [activeCategory, setActiveCategory] = useState("Sab Vendors");

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Vendor Management</h1>
        <button
          onClick={() => toast.success("Vendor add ho raha hai")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Naya Vendor
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              activeCategory === cat
                ? "bg-gradient-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-10 text-center">
        <Store className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">Abhi koi vendor add nahi hua.</p>
        <p className="text-sm text-muted-foreground mt-1">"Naya Vendor" button se apne caterers, photographers, decorators waghaira add karein.</p>
      </div>
    </div>
  );
}
