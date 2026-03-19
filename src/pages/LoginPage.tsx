import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Email is required.");
    if (!password) return setError("Password is required.");

    const ok = await login(email, password);
    if (ok) navigate("/products");
    else setError("Invalid credentials.");
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-center mb-8 tracking-wide">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {error && (
            <p className="text-sm text-destructive text-center" role="alert">{error}</p>
          )}

          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-secondary px-4 py-3 text-sm font-body text-foreground outline-none focus:border-foreground transition-colors"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-secondary px-4 py-3 text-sm font-body text-foreground outline-none focus:border-foreground transition-colors"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 text-sm uppercase tracking-widest font-body hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground font-body">
          Don't have an account?{" "}
          <Link to="/signup" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
