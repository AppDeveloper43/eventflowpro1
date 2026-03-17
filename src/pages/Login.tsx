import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    const password = fd.get("password") as string;
    if (!email || !password) {
      toast.error("Email aur password daalein!");
      return;
    }
    // UI only — no backend auth
    localStorage.setItem("sp_logged_in", "true");
    localStorage.setItem("sp_user_email", email);
    toast.success("Login successful! Welcome back.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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
          <h1 className="text-xl font-display font-bold text-gradient text-center mb-1">Welcome Back</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Apne account mein login karein</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required
                  className="w-full bg-muted border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border accent-primary" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline font-medium">Forgot password?</button>
            </div>

            <button type="submit"
              className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 shadow-md transition-opacity">
              Login
            </button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Account nahi hai?{" "}
            <button onClick={() => navigate("/signup")} className="text-primary font-semibold hover:underline">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
