import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/productFunc";
import { ProductCard } from "./ProductCard";

interface Props {
    limit?: number;
}

export const ProductList = ({ limit }: Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchData,
    });

    if (isLoading) return <p className="text-center text-gray-400">Loading...</p>;

    const products = limit ? data?.slice(0, limit) : data;

    return (
        <div className="flex flex-wrap justify-center gap-6 px-10">
            {products?.map((product) => (
                <div key={product.id} className="w-[250px]">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};