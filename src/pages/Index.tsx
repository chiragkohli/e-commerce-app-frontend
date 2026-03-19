import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-fashion.jpg";

export default function Index() {
  return (
    <main className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[85vh] overflow-hidden">
        <img src={heroImg} alt="Luxury fashion editorial" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl md:text-6xl tracking-widest text-primary-foreground mb-4 drop-shadow-sm">
            New Season
          </h1>
          <p className="text-primary-foreground/80 font-body text-sm md:text-base tracking-wider mb-8 max-w-md">
            Refined essentials for the modern wardrobe
          </p>
          <Link
            to="/products"
            className="border border-primary-foreground text-primary-foreground px-8 py-3 text-sm uppercase tracking-widest font-body hover:bg-primary-foreground hover:text-foreground transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
