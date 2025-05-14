import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, User, ShoppingBag, X } from 'lucide-react';
import { Link } from './Link';
import { useAuth } from '../context/AuthContext';
import { Product, CartItem } from '../types';
import { Cart } from './Cart';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { convertToCartProduct } from '../utils';

interface ProductPageProps {
  productId: string;
}



export function ProductPage({ productId }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/roupa/${productId}`);
        if (!res.ok) throw new Error('Erro ao carregar produto');
        const data = await res.json();
        console.log('Dados do produto:', data);
        const dataFormatted = {
            id: data.id.toString(),
            name: data.nome,
            price: parseFloat(data.preco),
            image: data.imagem_url[0] ? data.imagem_url[0] : '',
            category: data.category,
            description: data.descricao,
        }
        setProduct(dataFormatted);
        console.log('Produto carregado:', dataFormatted);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartProduct = convertToCartProduct(product);
    addToCart(cartProduct);
    console.log('Produto adicionado ao carrinho:', cartProduct);
    toast.success('Produto adicionado ao carrinho!', {
      style: {
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#333',
      },
    });
  };

  const handleCartClick = () => {
    if (!user) {
      window.location.href = '/login?redirect=/cart';
      return;
    }
    setIsCartOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-gray-900" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  MariaFifi
                </span>
              </Link>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.location.href = user ? '/account' : '/login'}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
                >
                  <User size={24} />
                  {user ? 'Minha Conta' : 'Entrar'}
                </button>
                <button
                  onClick={handleCartClick}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
                >
                  <ShoppingBag size={24} />
                  Carrinho
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Voltar para a loja
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <div className="w-full h-[600px] bg-gray-200"></div>
              </div>

              <div className="p-8">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>

                <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>

                <div className="space-y-6">
                  <div className="h-14 bg-gray-200 rounded w-full"></div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Produto não encontrado</h2>
          <Link to="/" className="text-gray-600 hover:text-gray-900 mt-4 inline-block">
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-gray-900" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                MariaFifi
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = user ? '/account' : '/login'}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
              >
                <User size={24} />
                {user ? 'Minha Conta' : 'Entrar'}
              </button>
              <button
                onClick={handleCartClick}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
              >
                <ShoppingBag size={24} />
                Carrinho
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Voltar para a loja
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.image || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-[600px] object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mb-8">{product.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              <div className="space-y-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-900 text-white py-4 px-6 rounded-md flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors text-lg font-medium"
                >
                  <ShoppingCart size={24} />
                  Adicionar ao Carrinho
                </button>

                {/* <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Detalhes do Produto
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Material de alta qualidade</li>
                    <li>• Fabricado no Brasil</li>
                    <li>• Garantia de 30 dias</li>
                    <li>• Frete grátis para todo o Brasil</li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                        if (!user) {
                          window.location.href = '/login?redirect=/checkout';
                          return;
                        }
                        setIsCartOpen(false);
                        window.location.href = '/checkout';
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
  );
}