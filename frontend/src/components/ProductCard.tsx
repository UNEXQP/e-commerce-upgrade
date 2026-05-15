import { Link } from "react-router-dom"
import type { Products } from "../types/Product"
import { useCart } from "../context/CartContext"

interface Props {
    product: Products
}

export const ProductCard = ({ product }: Props) => {
    const { addToCart } = useCart()

    if (!product) return null

    return (
        <Link to={`/products/${product.id}`} className="w-full">
            <div className="bg-[#F0EEED] rounded-xl p-4 h-[250px] flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-[200px] w-[200px] p-2.5 rounded-[10px]"
                />
            </div>
            <div className="mt-4">
                <h3 className="font-bold line-clamp-1">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.rating.rate} ★</p>
                <p className="font-semibold">${product.price}</p>
                <button
                    onClick={(e) => {
                        e.preventDefault() // prevents Link navigation on button click
                        addToCart(product)
                    }}
                    className="bg-black text-white px-4 py-2 rounded-full mt-3 w-full cursor-pointer"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    )
}