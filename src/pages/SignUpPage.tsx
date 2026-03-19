import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpPage() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Full name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    const ok = await signup(name, email, password);
    if (ok) navigate("/products");
    else setError("Signup failed. Try again.");
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-center mb-8 tracking-wide">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {error && (
            <p className="text-sm text-destructive text-center" role="alert">{error}</p>
          )}

          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">Full Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-border bg-secondary px-4 py-3 text-sm font-body text-foreground outline-none focus:border-foreground transition-colors" autoComplete="name" required />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">Email</label>
            <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-secondary px-4 py-3 text-sm font-body text-foreground outline-none focus:border-foreground transition-colors" autoComplete="email" required />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">Password</label>
            <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-secondary px-4 py-3 text-sm font-body text-foreground outline-none focus:border-foreground transition-colors" autoComplete="new-password" required />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">Confirm Password</label>
            <input id="confirm-password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="w-full border border-border bg-secondary px-4 py-3 text-sm font-body text-foreground outline-none focus:border-foreground transition-colors" autoComplete="new-password" required />
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 text-sm uppercase tracking-widest font-body hover:opacity-90 transition-opacity disabled:opacity-50">
            {isLoading ? "Creating…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground font-body">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
