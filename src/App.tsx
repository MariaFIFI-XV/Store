import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { Cart } from './components/Cart';
import { ProductCard } from './components/ProductCard';
import { Checkout } from './components/Checkout';
import { ProductPage } from './components/ProductPage';
import { products } from './data/products';

const categories = [
  { id: 'all', name: 'all', label: 'Todos' },
  { id: 'shirts', name: 'shirts', label: 'Camisas' },
  { id: 'pants', name: 'pants', label: 'Calças' },
  { id: 'dresses', name: 'dresses', label: 'Vestidos' },
  { id: 'accessories', name: 'accessories', label: 'Acessórios' },
];

const ITEMS_PER_PAGE = 12;

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const filteredProducts = products.filter(
    product => selectedCategory === 'all' || product.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  const productMatch = currentPath.match(/^\/product\/(.+)$/);
  const productId = productMatch ? productMatch[1] : null;

  if (isCheckoutVisible) {
    return (
      <CartProvider>
        <Checkout onBack={() => setIsCheckoutVisible(false)} />
      </CartProvider>
    );
  }

  if (productId) {
    return (
      <CartProvider>
        <ProductPage productId={productId} />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-gray-900" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  MariaFifi
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`${
                      selectedCategory === category.name
                        ? 'text-gray-900 border-b-2 border-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                    } px-1 py-2 text-sm font-medium`}
                  >
                    {category.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="hidden md:flex items-center gap-2 text-gray-500 hover:text-gray-900"
              >
                <ShoppingBag size={24} />
                Carrinho
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`${
                      selectedCategory === category.name
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Banner */}
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover opacity-50"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
              alt="Store banner"
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Maria Fifi
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Descubra nossa nova coleção com peças exclusivas e materiais premium. 
              Elegância e conforto para todas as ocasiões.
            </p>
            <div className="mt-10">
              <button 
                onClick={() => setSelectedCategory('all')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
              >
                Explorar Coleção
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Anterior
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </main>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 overflow-hidden z-50">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setIsCartOpen(false)}
              />
              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900">
                          Carrinho de Compras
                        </h2>
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={24} />
                        </button>
                      </div>
                      <div className="mt-8">
                        <Cart onCheckout={() => {
                          setIsCartOpen(false);
                          setIsCheckoutVisible(true);
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CartProvider>
  );
}

export default App;