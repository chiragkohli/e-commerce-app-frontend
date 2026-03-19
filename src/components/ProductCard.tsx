import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const [hoveredImg, setHoveredImg] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`${product.title} — cart coming soon`);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
      onMouseLeave={() => setHoveredImg(0)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
        <img
          src={product.images[hoveredImg]}
          alt={product.title}
          className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Image dots indicator */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.images.map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setHoveredImg(i)}
                onClick={(e) => e.preventDefault()}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  hoveredImg === i
                    ? "bg-foreground scale-125"
                    : "bg-foreground/40"
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {isAuthenticated && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-xs uppercase tracking-widest font-body opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:opacity-90"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
        {product.brand}
      </p>
      <h3 className="text-sm font-body font-normal text-foreground leading-snug">
        {product.title}
      </h3>
      <p className="text-sm text-foreground mt-1 font-body">
        ${product.price}
      </p>
    </Link>
  );
}
