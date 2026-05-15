import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CartPage } from './pages/CartPage'
import { CartProvider } from './context/CartContext'




import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { HomePage } from './pages/HomePage'
import { ProductCard } from './components/ProductCard'
import { CategoryPage } from './pages/CategoryPage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <CategoryPage /> },
  { path: '/products/:id', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
])


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </QueryClientProvider>
)
