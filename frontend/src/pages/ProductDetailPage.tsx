import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import type { Products } from "../types/Product";
import { useCart } from "../context/CartContext.tsx";


import Frame1 from "../images/Frame1.png"
import Frame2 from "../images/Frame2.png"
import Frame3 from "../images/Frame3.png"
import Frame4 from "../images/Frame4.png"
import Frame5 from "../images/Frame5.png"
import Frame6 from "../images/Frame6.png"
import { Link } from "react-router-dom";

import {
    FaStar,
    FaStarHalfAlt,
    FaRegStar,

} from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi"

export const ProductDetailPage = () => {

    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleDecrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1))
    }



    const fetchProducts = async (): Promise<Products> => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) {
            throw new Error('response failed')
        }
        return response.json()
    }

    const {
        data, isLoading, error
    } = useQuery({
        queryKey: ['product', id],
        queryFn: fetchProducts
    })

    const {
        data: relatedProducts
    } = useQuery({
        queryKey: ['relatedProducts'],
        queryFn: async () => {
            const response = await fetch('https://fakestoreapi.com/products?limit=4')
            if (!response.ok) throw new Error('Failed to fetch related products')
            return response.json()
        }
    })

    if (isLoading) return <h1>pls wait....</h1>

    if (error) return <h1>there seems to be an error pls wait</h1>

    const rating = data?.rating.rate || 0
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    const { addToCart } = useCart()




    return (
        <>
            <Navbar />
            <div className="flex  gap-5 p-10 justify-around">

                <div className="flex ">
                    <div className="flex flex-col mb-[60px] ">
                        <img src={data?.image} className="w-[150px] h-[150px] object-contain bg-gray-200 rounded-2xl mb-3 " />
                        <img src={data?.image} className="w-[150px] h-[150px] object-contain bg-gray-200 rounded-2xl mb-3" />
                        <img src={data?.image} className="w-[150px] h-[150px] object-contain bg-gray-200 rounded-2xl mb-3" />
                    </div>
                    <div className="flex items-center bg-gray-200 h-[486px] rounded-2xl ml-[20px]">
                        <img src={data?.image} className="w-[350px] h-[350px]  rounded-2xl object-contain" />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <h1 className="font-bold text-4xl line-clamp-1">{data?.title}</h1>
                    <div className="flex items-center w-full">

                        {[...Array(fullStars)].map((_, i) => (
                            <FaStar key={`full-${i}`} className="text-yellow-400" />
                        ))}

                        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}

                        {[...Array(emptyStars)].map((_, i) => (
                            <FaRegStar key={`empty-${i}`} className="text-yellow-400 " />
                        ))}

                        <p className="ml-2">
                            {data?.rating.rate}
                        </p>

                    </div>
                    <p className="font-semibold text-2xl">${data?.price}</p>
                    <p className="w-[650px] text-gray-500 mb-3">{data?.description}</p>
                    <div className=" w-full h-px bg-gray-300 "></div>
                    <div>
                        <p className="font-light text-gray-400 text-[15px]">Choose size</p>
                        <div className="flex gap-3 p-2 mb-[10px]">
                            <button className="bg-gray-300 rounded-2xl px-2 py-0.5 w-[80px] font-light hover:bg-black hover:text-white hover:cursor-pointer">Small</button>
                            <button className="bg-gray-300 rounded-2xl px-2 py-0.5 w-[80px] font-light hover:bg-black hover:text-white hover:cursor-pointer">Medium</button>
                            <button className="bg-gray-300 rounded-2xl px-2 py-0.5 w-[80px] font-light hover:bg-black hover:text-white hover:cursor-pointer">High</button>
                        </div>
                    </div>
                    <div className=" w-full h-px bg-gray-300 "></div>
                    <div className="flex justify-between mt-2.5">
                        <button className="flex w-[200px] p-1 bg-gray-300 rounded-[20px] justify-around">
                            <p className="flex cursor-pointer items-center" onClick={handleDecrease}><FiMinus /></p>
                            <p className="text-center">{quantity}</p>
                            <p className="flex  cursor-pointer items-center" onClick={handleIncrease}><FiPlus /></p>
                        </button>
                        <button className="w-[420px] bg-black text-white rounded-[20px] cursor-pointer" onClick={() => addToCart(data!, quantity)}>add to cart</button>
                    </div>
                </div>

            </div>


            <div >

                <div className="flex justify-around border-b  border-gray-200  mb-16">
                    <p className="pb-4 border-b-2 border-transparent hover:border-black cursor-pointer">Product Details</p>
                    <p className="pb-4 border-b-2 border-transparent hover:border-black cursor-pointer">Rating & Reviews</p>
                    <p className="pb-4 border-b-2 border-transparent hover:border-black cursor-pointer">FAQs</p>
                </div>

                <div className="flex justify-between p-3  mb-16">
                    <p>All reviews</p>
                    <div className=" flex gap-2">
                        <button>Latest</button>
                        <button>Write a Review</button>
                    </div>
                </div>

                <div className="flex justify-center gap-7 mb-16">
                    <div className="flex flex-col gap-3.5">
                        <img src={Frame1} className="bg-white" />
                        <img src={Frame2} className="bg-white" />
                        <img src={Frame3} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-3.5">
                        <img src={Frame4} className="bg-white" />
                        <img src={Frame5} className="bg-white" />
                        <img src={Frame6} className="bg-white" />
                    </div>
                </div>

                <div>
                    <div className="mb-16">
                        <h1 className="text-4xl font-bold text-center mb-10">
                            YOU MIGHT ALSO LIKE
                        </h1>

                        <div className="flex flex-wrap justify-center gap-10">

                            {relatedProducts?.map((item: Products) => (

                                <Link
                                    to={`/products/${item.id}`}
                                    key={item.id}
                                    className="w-[250px]"
                                >

                                    <div className="bg-[#F0EEED] rounded-xl p-4 h-[250px] flex items-center justify-center">

                                        <img
                                            src={item.image}
                                            className="object-contain h-[200px] w-[200px] p-2.5 rounded-[10px]"
                                        />

                                    </div>

                                    <div className="mt-4">

                                        <h3 className="font-bold line-clamp-1">
                                            {item.title}
                                        </h3>

                                        <p>{item.rating.rate}</p>

                                        <p className="font-semibold">
                                            ${item.price}
                                        </p>

                                        <button className="bg-black text-white px-4 py-2 rounded-full mt-3 w-full cursor-pointer">
                                            Order Now
                                        </button>

                                    </div>

                                </Link>
                            ))}

                        </div>
                    </div>
                </div>
            </div>




            <Footer />
        </>
    )

}
