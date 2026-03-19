import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

/** 
 * Mock authentication context.
 * TODO: Replace with real backend authentication (e.g., Supabase, Firebase, or custom API).
 * When connecting to a backend:
 * 1. Replace `login()` with an API call to POST /api/auth/login
 * 2. Replace `signup()` with an API call to POST /api/auth/signup
 * 3. Replace `logout()` with an API call to POST /api/auth/logout
 * 4. Store JWT token in httpOnly cookies (not localStorage for security)
 * 5. Add token refresh logic
 */

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    // TODO: Replace with actual API call
    await new Promise((r) => setTimeout(r, 800));
    setUser({ id: "1", name: email.split("@")[0], email });
    setIsLoading(false);
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    // TODO: Replace with actual API call
    await new Promise((r) => setTimeout(r, 800));
    setUser({ id: "1", name, email });
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    // TODO: Replace with actual API call to invalidate session
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
