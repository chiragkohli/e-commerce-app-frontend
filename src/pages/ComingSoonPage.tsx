import { useLocation, Link } from "react-router-dom";

/**
 * Placeholder page for features not yet implemented:
 * Cart, Orders, Checkout, Payment, Wishlist, Profile, Inventory
 */
export default function ComingSoonPage() {
  const { pathname } = useLocation();
  const feature = pathname.replace("/", "").replace(/-/g, " ");

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 animate-fade-in">
      <h1 className="font-display text-4xl tracking-wide mb-4 capitalize">{feature || "Feature"}</h1>
      <p className="text-muted-foreground font-body text-sm mb-8">This feature is coming soon.</p>
      <Link
        to="/products"
        className="border border-foreground px-6 py-3 text-sm uppercase tracking-widest font-body hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        Browse Collection
      </Link>
    </main>
  );
}
