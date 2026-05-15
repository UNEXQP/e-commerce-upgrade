import '../index.css'
import { Navbar } from '../components/Navbar'
import Vector from '../images/Vector.png'
import Rectangle from '../images/Rectangle.png'
import Gucci from '../images/Gucci.png'
import Prada from '../images/Prada.png'
import Versace from '../images/Versace.png'
import Zara from '../images/Zara.png'
import CalvinKlein from '../images/CalvinKlein.png'
import { ProductCard } from '../components/ProductCard'
import images from "../images/Features.png"
import hpcom1 from "../images/hpcom1.png"
import hpcom2 from "../images/hpcom2.png"
import hpcom3 from "../images/hpcom3.png"
import { Footer } from '../components/Footer.tsx'
import { Link } from 'react-router-dom'
import { ProductList } from '../components/ProductList.tsx'

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className='overflow-x-hidden overflow-y-hidden'>
                <div className=' bg-cover bg-center h-[600px] p-[60px] relative' style={{ backgroundImage: `url(${Rectangle})` }}>
                    <h1 className='font-black text-6xl w-[500px] mb-7'>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>
                    <p className='w-[540px] mb-7'>
                        Browse through our diverese range of ridiculously crafted garments to bring out your individuality and cater to your sense of style
                    </p>
                    <button className='bg-black text-white rounded-4xl p-2.5 w-[200px] mb-7'>
                        <Link to='/products'>
                            Shop Now
                        </Link>
                    </button>
                    <div className='flex items-center'>
                        <div className='p-3'>
                            <h3 className='text-5xl font-medium '>200+</h3>
                            <p>International brands</p>
                        </div>
                        <div className="h-16 w-px bg-gray-300"></div>

                        <div className='p-3'>
                            <h3 className='text-5xl font-medium'>2,000+</h3>
                            <p>High-Quality Products</p>
                        </div>
                        <div className="h-16 w-px bg-gray-300"></div>

                        <div className='p-3'>
                            <h3 className='text-5xl font-medium'>30,000+</h3>
                            <p>Happy Customers</p>
                        </div>
                    </div>
                    <div className='flex bg-black w-full justify-around bottom-[-20px] left-0 absolute p-4'>
                        <img src={Versace} alt="" />
                        <img src={Zara} alt="" />
                        <img src={Gucci} alt="" />
                        <img src={Prada} alt="" />
                        <img src={CalvinKlein} alt="" />
                    </div>
                </div>
                <div className='mt-20'>
                    <h1 className='text-4xl font-bold text-center mb-10'>NEW ARRIVALS</h1>
                    <ProductList limit={4} />
                </div>
                <div className='mt-20'>
                    <h1 className='text-4xl font-bold text-center mb-10'>TOP SELLING</h1>
                    <ProductList limit={4} />
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