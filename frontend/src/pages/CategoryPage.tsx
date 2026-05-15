import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/productFunc";
import { ProductCard } from "../components/ProductCard";
import { useState } from "react";

export const CategoryPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState("featured");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchData,
    });

    console.log("Fetched products:", data);

    const categories = data
        ? ["all", ...new Set(data.map((item) => item.category))]
        : ["all"];

    const byCategory = !data ? [] :
        activeCategory === "all"
            ? data
            : data.filter((item) => item.category === activeCategory);

    const byPrice = byCategory.filter((item) => {
        if (!item) return false;  // guard against undefined entries
        const aboveMin = minPrice === "" || item.price >= minPrice;
        const belowMax = maxPrice === "" || item.price <= maxPrice;
        return aboveMin && belowMax;
    });

    // 3. sort
    const sorted = [...byPrice].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating.rate - a.rating.rate;
        return 0;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-2xl font-bold mb-2">Something went wrong</p>
                    <p className="text-sm text-gray-400">Try refreshing the page</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="flex min-h-[calc(100vh-56px)]">
                {/* Sidebar */}
                <aside className="w-56 shrink-0 bg-[#0f0f0f] text-white p-6 sticky top-0 h-screen overflow-y-auto">
                    <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-500 mb-4">
                        Categories
                    </p>
                    <div className="flex flex-col gap-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all capitalize
                  ${activeCategory === cat
                                        ? "bg-white text-black font-medium"
                                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <hr className="border-white/10 my-5" />

                    <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-500 mb-3">
                        Price Range
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) =>
                                setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-white/30"
                        />
                        <span className="text-gray-600">—</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) =>
                                setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-white/30"
                        />
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 p-7">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight capitalize">
                                {activeCategory === "all" ? "All Products" : activeCategory}
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                {sorted.length} items found
                            </p>
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none cursor-pointer"
                        >
                            <option value="featured">Sort: Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sorted.filter(Boolean).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {sorted.length === 0 && (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-400 text-sm">No products match your filters.</p>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
};