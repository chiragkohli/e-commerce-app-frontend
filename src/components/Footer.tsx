import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Connect to newsletter API
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-display text-lg tracking-wide mb-4">Newsletter</h4>
            <p className="text-xs text-muted-foreground font-body leading-relaxed mb-5">
              Receive early access to new collections and exclusive editorial content.
            </p>
            {subscribed ? (
              <p className="text-xs font-body text-foreground tracking-wide">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 border border-border bg-secondary px-4 py-2.5 text-xs font-body text-foreground outline-none focus:border-foreground transition-colors"
                  aria-label="Email for newsletter"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-5 py-2.5 text-xs uppercase tracking-widest font-body hover:opacity-90 transition-opacity"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-body text-foreground mb-4">Shop</h4>
            <ul className="space-y-3">
              {["Products", "Outerwear", "Knitwear", "Shirts"].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-xs text-muted-foreground font-body hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-body text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About", to: "/about" },
                { label: "Careers", to: "/careers" },
                { label: "Contact", to: "/contact" },
                { label: "Stores", to: "/stores" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-xs text-muted-foreground font-body hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-body text-foreground mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-[18px] w-[18px]" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-sm tracking-widest uppercase">Atelier</p>
          <p className="text-[11px] text-muted-foreground font-body tracking-wide">
            © {new Date().getFullYear()} Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
