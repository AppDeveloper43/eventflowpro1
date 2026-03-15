import { useState } from "react";
import { Mail, Phone, DollarSign, Star, Link, Edit, StickyNote, Plus } from "lucide-react";
import { toast } from "sonner";

const categories = ["All Vendors", "Caterers", "Photographers", "Decorators", "DJs", "Florists", "Venues"];

const vendors = [
  { name: "Elite Catering", category: "Caterer", email: "info@elitecatering.com", phone: "+1 (555) 111-2222", pricing: "$$$ - Premium", rating: "4.8 (24 reviews)", availability: "Weekends" },
  { name: "Capture Moments", category: "Photographer", email: "hello@capturemoments.com", phone: "+1 (555) 222-3333", pricing: "$$ - Moderate", rating: "4.9 (56 reviews)", availability: "Mon-Sat" },
  { name: "Grand Hotel", category: "Venue", email: "events@grandhotel.com", phone: "+1 (555) 333-4444", pricing: "$$$$ - Luxury", rating: "4.7 (89 reviews)", availability: "Capacity: 300 guests" },
];

export default function VendorsSection() {
  const [activeCategory, setActiveCategory] = useState("All Vendors");

  const filtered = activeCategory === "All Vendors"
    ? vendors
    : vendors.filter((v) => v.category.toLowerCase().includes(activeCategory.toLowerCase().replace(/s$/, "")));

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Vendor Management</h1>
        <button
          onClick={() => toast.success("Adding vendor")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Vendor
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((vendor, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-foreground">{vendor.name}</span>
              <span className="bg-muted text-muted-foreground text-xs px-2.5 py-0.5 rounded-full">{vendor.category}</span>
            </div>
            <div className="border-t border-b border-border py-3 my-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="w-4 h-4 text-primary" /> {vendor.email}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4 text-primary" /> {vendor.phone}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><DollarSign className="w-4 h-4 text-primary" /> {vendor.pricing}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Star className="w-4 h-4 text-primary" /> {vendor.rating}</div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Available: {vendor.availability}</p>
            <div className="flex justify-end gap-1.5">
              {[Link, Edit, StickyNote].map((Icon, j) => (
                <button
                  key={j}
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
    </div>
  );
}
