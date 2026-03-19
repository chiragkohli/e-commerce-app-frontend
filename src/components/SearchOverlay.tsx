import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { products } from "@/data/products";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when overlay opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleSelect = (id: string) => {
    onClose();
    navigate(`/products/${id}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in" role="dialog" aria-modal="true" aria-label="Search products">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-background w-full border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search input row */}
          <div className="flex items-center h-20 gap-4">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection…"
              className="flex-1 bg-transparent text-lg md:text-2xl font-display tracking-wide text-foreground placeholder:text-muted-foreground outline-none"
              aria-label="Search products"
            />
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close search">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results */}
          {query.trim() && (
            <div className="border-t border-border py-6 pb-8">
              {results.length === 0 ? (
                <p className="text-sm text-muted-foreground font-body">No results for "{query}"</p>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-5">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelect(product.id)}
                        className="group text-left"
                      >
                        <div className="aspect-[3/4] bg-secondary overflow-hidden mb-2">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{product.brand}</p>
                        <p className="text-xs font-body text-foreground truncate">{product.title}</p>
                        <p className="text-xs font-body text-foreground">${product.price}</p>
                      </button>
                    ))}
                  </div>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="inline-block mt-6 text-xs font-body text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors uppercase tracking-wider"
                  >
                    View all products
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
