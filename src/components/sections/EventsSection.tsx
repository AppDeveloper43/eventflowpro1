import { CalendarDays, MapPin, Users, Plus } from "lucide-react";
import { toast } from "sonner";

const events = [
  { name: "Johnson Wedding", status: "Confirmed", date: "June 15, 2024", daysLeft: 12, location: "Grand Hotel, Ballroom", guests: 150, budget: "$35,000", spent: 75 },
  { name: "Corporate Gala", status: "Confirmed", date: "July 20, 2024", daysLeft: 47, location: "Convention Center", guests: 300, budget: "$75,000", spent: 45 },
  { name: "Tech Conference", status: "Confirmed", date: "August 25, 2024", daysLeft: 83, location: "Expo Center", guests: 500, budget: "$120,000", spent: 25 },
];

const tags = ["Budget", "Vendors", "Tasks", "Guests", "Documents"];

export default function EventsSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gradient">Event Management</h1>
        <button
          onClick={() => toast.success("Creating new event")}
          className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-150 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map((event, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-foreground">{event.name}</span>
              <span className="text-xs font-medium text-success bg-success/10 px-2.5 py-0.5 rounded-full">{event.status}</span>
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>{event.date}</span>
                <span className="ml-auto text-xs font-medium text-primary">{event.daysLeft} days left</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" /> {event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" /> {event.guests} guests
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {tags.map((t) => (
                <span key={t} className="bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs">{t}</span>
              ))}
            </div>
            <div className="w-full bg-muted h-2 rounded-full mb-2">
              <div className="bg-gradient-primary h-full rounded-full transition-all" style={{ width: `${event.spent}%` }} />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Budget: {event.budget}</span>
              <span className="font-medium text-primary">{event.spent}% spent</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
