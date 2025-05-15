import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, X, CreditCard, Barcode as Qrcode, Truck } from 'lucide-react';
import { Link } from './Link';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface CheckoutProps {
  onBack: () => void;
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
}

const shippingOptions: ShippingOption[] = [
  {
    id: 'SEDEX',
    name: 'Entrega Expressa',
    price: 29.90,
    estimatedDays: 2
  },
  {
    id: 'PAC',
    name: 'Entrega Padrão',
    price: 19.90,
    estimatedDays: 5
  }
];





export function Checkout({ onBack }: CheckoutProps) {
  const { total: subtotal, items, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string>(shippingOptions[1].id);

  const shippingCost = shippingOptions.find(option => option.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

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

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = formatCEP(value);
    setFormData(prev => ({ ...prev, zipCode: value }));
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
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span>R$ {shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
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
                      Nome Completo<span className="text-red-600">*</span>
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
                      Email<span className="text-red-600">*</span>
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
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      CEP<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      maxLength={9}
                      value={formData.zipCode}
                      onChange={handleCEPChange}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-gray-900 text-base transition duration-150 ease-in-out"
                      placeholder="00000-000"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço<span className="text-red-600">*</span>
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
                        Cidade<span className="text-red-600">*</span>
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
                        Estado<span className="text-red-600">*</span>
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
                </div>
              </div>

              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Opções de Entrega</h3>
                <div className="space-y-4">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedShipping === option.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="form-radio h-5 w-5 text-gray-900"
                        />
                        <div className="ml-4">
                          <div className="flex items-center gap-2">
                            <Truck size={20} className="text-gray-600" />
                            <p className="font-medium text-gray-900">{option.id} - {option.name}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Entrega em até {option.estimatedDays} dias úteis
                          </p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">
                        R$ {option.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Método de Pagamento</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="pix"
                        checked={paymentMethod === 'pix'}
                        onChange={() => setPaymentMethod('pix')}
                        className="form-radio h-5 w-5 text-gray-900"
                      />
                      <span className="flex items-center space-x-2">
                        <i class="fa-brands fa-pix"></i>
                        <span>PIX</span>
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={() => setPaymentMethod('credit')}
                        className="form-radio h-5 w-5 text-gray-900"
                      />
                      <span className="flex items-center space-x-2">
                        <CreditCard size={24} />
                        <span>Cartão de Crédito</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-6">
                Ao finalizar a compra você concorda com nossos{' '}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-gray-900 underline hover:text-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/terms', '_blank');
                  }}
                >
                  termos de compra
                </a>
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