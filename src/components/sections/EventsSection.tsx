import { CalendarDays, MapPin, Users, Plus } from "lucide-react";
import { toast } from "sonner";

const tags = ["Budget", "Vendors", "Tasks", "Mehmaan", "Documents"];

export default function EventsSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Event Management</h1>
        <button
          onClick={() => toast.success("Naya event create ho raha hai")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Naya Event
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-10 text-center">
        <CalendarDays className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">Abhi koi event nahi hai.</p>
        <p className="text-sm text-muted-foreground mt-1">Pehla event add karne ke liye "Naya Event" button dabayein.</p>
        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          {["Nikkah", "Mehndi", "Baraat", "Walima", "Dholki", "Engagement"].map((t) => (
            <span key={t} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
