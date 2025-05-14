import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, X } from 'lucide-react';
import { Link } from './Link';
import { useAuth } from '../context/AuthContext';

interface CheckoutProps {
  onBack: () => void;
}

export function Checkout({ onBack }: CheckoutProps) {
  const { total, items, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Here you would send the order to your API
      // For now, we'll just simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearCart();
      window.location.href = '/account';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-gray-900" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                MariaFifi
              </span>
            </div>
            <button
              onClick={onBack}
              className="flex items-center text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2" size={20} />
              Voltar às compras
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Finalizar Compra</h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo do Pedido</h3>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Endereço de Entrega</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                        placeholder="Sua cidade"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                        placeholder="Estado"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                      placeholder="00000-000"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informações de Pagamento</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Validade
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/AA"
                        required
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                      />
                    </div>

                    <div>
                      <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        required
                        value={formData.cardCvv}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                        placeholder="000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  </div>
                ) : (
                  'Confirmar Pedido'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}