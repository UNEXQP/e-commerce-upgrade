import '../index.css'
import { Navbar } from '../components/Navbar'
import Rectangle from '../images/Rectangle.png'
import Gucci from '../images/Gucci.png'
import Prada from '../images/Prada.png'
import Versace from '../images/Versace.png'
import Zara from '../images/Zara.png'
import CalvinKlein from '../images/CalvinKlein.png'
import images from "../images/Features.png"
import hpcom1 from "../images/hpcom1.png"
import hpcom2 from "../images/hpcom2.png"
import hpcom3 from "../images/hpcom3.png"
import { Footer } from '../components/Footer.tsx'
import { Link } from 'react-router-dom'
import { ProductGrid } from '../components/ProductList.tsx'

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className='overflow-x-hidden overflow-y-hidden'>
                <div
                    className="bg-cover bg-center relative "
                    style={{ backgroundImage: `url(${Rectangle})` }}
                >
                    {/* Main content */}
                    <div className="px-6 py-10 sm:p-10 md:p-[60px]">
                        <h1 className="font-black text-4xl sm:text-5xl md:text-6xl w-full max-w-[500px] mb-5 md:mb-7 leading-tight">
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </h1>

                        <p className="w-full max-w-[540px] mb-5 md:mb-7 text-sm sm:text-base">
                            Browse through our diverse range of ridiculously crafted garments to bring
                            out your individuality and cater to your sense of style
                        </p>

                        <button className="bg-black text-white rounded-full px-6 py-2.5 w-full sm:w-[200px] mb-7">
                            <Link to="/products">Shop Now</Link>
                        </button>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-y-4">
                            <div className="px-3 py-1">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium">200+</h3>
                                <p className="text-sm sm:text-base">International brands</p>
                            </div>

                            <div className="hidden sm:block h-12 md:h-16 w-px bg-gray-300" />

                            <div className="px-3 py-1">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium">2,000+</h3>
                                <p className="text-sm sm:text-base">High-Quality Products</p>
                            </div>

                            <div className="hidden sm:block h-12 md:h-16 w-px bg-gray-300" />

                            <div className="px-3 py-1">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium">30,000+</h3>
                                <p className="text-sm sm:text-base">Happy Customers</p>
                            </div>
                        </div>
                    </div>

                    {/* Brand bar */}
                    <div className="flex bg-black w-full justify-around items-center flex-wrap gap-4 px-4 py-4 sm:py-5">
                        <img src={Versace} alt="Versace" className="h-5 sm:h-6 md:h-auto" />
                        <img src={Zara} alt="Zara" className="h-5 sm:h-6 md:h-auto" />
                        <img src={Gucci} alt="Gucci" className="h-5 sm:h-6 md:h-auto" />
                        <img src={Prada} alt="Prada" className="h-5 sm:h-6 md:h-auto" />
                        <img src={CalvinKlein} alt="Calvin Klein" className="h-5 sm:h-6 md:h-auto" />
                    </div>
                </div>
                <div className='mt-20'>
                    <h1 className='text-4xl font-bold text-center mb-10'>NEW ARRIVALS</h1>
                    <ProductGrid limit={4} />
                </div>
                <div className='mt-20'>
                    <h1 className='text-4xl font-bold text-center mb-10'>TOP SELLING</h1>
                    <ProductGrid limit={4} />
                </div>
                <div className="flex justify-center mt-20">
                    <img src={images} className='h-[540px] w-[1000px] object-contain' />
                </div>
                <h1 className='text-4xl font-bold text-center mb-10 mt-[80px]'>OUR HAPPY CUSTOMERS</h1>
                <div className='flex gap-[20px] justify-center mb-[80px]'>
                    <div>
                        <img src={hpcom1} alt="" />
                    </div>

                    <div>
                        <img src={hpcom2} alt="" />
                    </div>

                    <div>
                        <img src={hpcom3} alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}