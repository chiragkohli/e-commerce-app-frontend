import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import ProductGallery from "@/components/ProductGallery";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { isAuthenticated } = useAuth();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="font-display text-2xl mb-4">Product Not Found</h1>
        <Link to="/products" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors font-body">
          Back to collection
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8 animate-fade-in">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-body">
        <ArrowLeft className="h-4 w-4" />
        Back to collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <ProductGallery images={product.images} title={product.title} />


        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">{product.brand}</p>
          <h1 className="font-display text-3xl lg:text-4xl tracking-wide mb-3">{product.title}</h1>
          <p className="text-lg font-body text-foreground mb-6">${product.price}</p>
          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8">{product.longDescription}</p>

          {/* Sizes */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[44px] border px-3 py-2 text-sm font-body transition-colors ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart — only visible when logged in */}
          {isAuthenticated && (
            <button
              onClick={() => toast.success(`${product.title} — cart coming soon`)}
              className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-4 text-sm uppercase tracking-widest font-body hover:opacity-90 transition-opacity mb-6"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          )}

          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">
            Category: {product.category}
          </p>
        </div>
      </div>
    </main>
  );
}
