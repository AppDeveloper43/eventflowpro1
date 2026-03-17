import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const password = fd.get("password") as string;
    const confirm = fd.get("confirm") as string;

    if (!name || !email || !password) {
      toast.error("Sab fields fill karein!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password kam az kam 6 characters ka hona chahiye!");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords match nahi kar rahe!");
      return;
    }

    // UI only — no backend auth
    localStorage.setItem("sp_logged_in", "true");
    localStorage.setItem("sp_user_email", email);
    localStorage.setItem("sp_user_name", name);
    toast.success("Account ban gaya! Welcome to ShaadiPlanner.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <span className="text-2xl font-display font-bold text-foreground">Shaadi</span>
            <span className="text-2xl font-display font-bold text-primary">Planner</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 wedding-shadow">
          <h1 className="text-xl font-display font-bold text-gradient text-center mb-1">Create Account</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">ShaadiPlanner mein apna account banayein</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="name" type="text" placeholder="Ahmed Ali" required
                  className="w-full bg-muted border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="phone" type="tel" placeholder="0300-1234567"
                  className="w-full bg-muted border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="email" type="email" placeholder="you@example.com" required
                  className="w-full bg-muted border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Kam az kam 6 characters" required
                  className="w-full bg-muted border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="confirm" type="password" placeholder="Dobara password daalein" required
                  className="w-full bg-muted border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <button type="submit"
              className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 shadow-md transition-opacity">
              Sign Up
            </button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Pehle se account hai?{" "}
            <button onClick={() => navigate("/login")} className="text-primary font-semibold hover:underline">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}
