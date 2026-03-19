import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useCallback } from "react";
import SearchOverlay from "@/components/SearchOverlay";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  const openSearch = useCallback(() => {
    setMobileOpen(false);
    setSearchOpen(true);
  }, []);

  const navLinkClass = (path: string) =>
    `text-sm font-body tracking-wide uppercase transition-colors duration-200 ${
      location.pathname === path
        ? "text-foreground border-b border-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/products" className={navLinkClass("/products")}>Products</Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className={navLinkClass("/login")}>Login</Link>
                <Link to="/signup" className={navLinkClass("/signup")}>Sign Up</Link>
              </>
            )}
          </nav>

          {/* Center logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-widest uppercase">
            Atelier
          </Link>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-6">
            {location.pathname === "/products" && (
              <button onClick={openSearch} aria-label="Search products">
                <Search className="h-[18px] w-[18px] text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            )}
            {isAuthenticated && (
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-[18px] w-[18px]" />
                <span className="sr-only md:not-sr-only">Logout</span>
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden ml-auto" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background animate-fade-in">
            <div className="flex flex-col gap-4 px-6 py-6">
              {location.pathname === "/products" && (
                <button onClick={openSearch} className="text-sm text-muted-foreground hover:text-foreground text-left uppercase tracking-wide">
                  Search
                </button>
              )}
              <Link to="/products" className={navLinkClass("/products")} onClick={() => setMobileOpen(false)}>Products</Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className={navLinkClass("/login")} onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/signup" className={navLinkClass("/signup")} onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground text-left uppercase tracking-wide">
                  Logout
                </button>
              )}
            </div>
          </nav>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
