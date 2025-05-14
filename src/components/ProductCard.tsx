import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { Link } from './Link';
import toast from 'react-hot-toast';
import { convertToCartProduct } from '../utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartProduct = convertToCartProduct(product);
    
    addToCart(cartProduct);
    console.log('Produto adicionado ao carrinho:', product);
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-6">
        <Link
          to={`/product/${product.id}`}
          className="block mb-2 hover:text-gray-600"
        >
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        </Link>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart size={20} />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}