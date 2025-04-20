import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from './Link';

interface ProductPageProps {
  productId: string;
}

export function ProductPage({ productId }: ProductPageProps) {
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar para a loja
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.image}
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
                  onClick={() => addToCart(product)}
                  className="w-full bg-gray-900 text-white py-4 px-6 rounded-md flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors text-lg font-medium"
                >
                  <ShoppingCart size={24} />
                  Adicionar ao Carrinho
                </button>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Detalhes do Produto
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Material de alta qualidade</li>
                    <li>• Fabricado no Brasil</li>
                    <li>• Garantia de 30 dias</li>
                    <li>• Frete grátis para todo o Brasil</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}