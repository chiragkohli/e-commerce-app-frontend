import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type SortOption = "newest" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
};

const ITEMS_PER_PAGE = 8;

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export default function ProductListPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    let list = [...products];

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        break;
    }

    return list;
  }, [query, category, sort]);

  // Reset page when filters change
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(page, totalPages || 1);
  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (fn: () => void) => {
    fn();
    setPage(1);
  };

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <main className="container mx-auto px-4 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="font-display text-4xl tracking-wide mb-6">Collection</h1>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or brand…"
            value={query}
            onChange={(e) => handleFilterChange(() => setQuery(e.target.value))}
            className="w-full border border-border bg-secondary pl-10 pr-4 py-3 text-sm font-body text-foreground outline-none focus:border-foreground transition-colors"
            aria-label="Search products"
          />
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 border-b border-border pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(() => setCategory(cat))}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-body transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => handleFilterChange(() => setSort(e.target.value as SortOption))}
            className="appearance-none border border-border bg-secondary pl-4 pr-10 py-2 text-xs uppercase tracking-widest font-body text-foreground outline-none focus:border-foreground transition-colors cursor-pointer"
            aria-label="Sort products"
          >
            {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-8">
        {results.length} {results.length === 1 ? "piece" : "pieces"}
        {totalPages > 1 && ` — Page ${currentPage} of ${totalPages}`}
      </p>

      {/* Grid */}
      {results.length === 0 ? (
        <p className="text-center text-muted-foreground font-body py-20">No products match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {paginatedResults.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-16 mb-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-widest font-body text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Prev
          </button>

          {pageNumbers.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`e-${i}`} className="px-2 text-muted-foreground text-xs">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`min-w-[36px] h-9 flex items-center justify-center text-xs font-body transition-colors ${
                  p === currentPage
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-widest font-body text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </nav>
      )}
    </main>
  );
}
