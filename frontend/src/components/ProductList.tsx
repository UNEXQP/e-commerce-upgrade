import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/productFunc";
import { ProductCard } from "./ProductCard";

interface Props {
    limit?: number;
}

export const ProductGrid = ({ limit }: Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchData,
    });

    if (isLoading) {
        return (
            <p className="text-center text-gray-400 py-10">
                Loading...
            </p>
        );
    }

    const products = limit ? data?.slice(0, limit) : data;

    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-5
                px-4
                sm:px-6
                lg:px-10
            "
        >
            {products?.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};