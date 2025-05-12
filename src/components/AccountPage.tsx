import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, ArrowLeft, User, MapPin, Phone, Mail, Calendar, CreditCard, Clock, ShoppingBag } from 'lucide-react';
import { Link } from './Link';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: '#12345',
    date: '2024-03-15',
    status: 'Entregue',
    total: 299.99,
    items: 2
  },
  {
    id: '#12346',
    date: '2024-03-10',
    status: 'Em trânsito',
    total: 159.90,
    items: 1
  }
];
    
export function AccountPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSignOut = () => {
    logout();
    window.location.href = '/';
  };

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue':
        return 'bg-green-100 text-green-800';
      case 'Em trânsito':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              <ShoppingBag className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold">MariaFifi</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar para a loja
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{user.email}</h2>
                <p className="text-sm text-gray-500">Cliente desde Mar 2024</p>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left ${
                  activeTab === 'profile'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User size={20} />
                Meus Dados
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left ${
                  activeTab === 'orders'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package size={20} />
                Meus Pedidos
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-left text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} />
                Sair
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Dados</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                      <div className="mt-1 flex items-center gap-2 text-gray-900">
                        <User size={18} className="text-gray-400" />
                        <span>{user.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 flex items-center gap-2 text-gray-900">
                        <Mail size={18} className="text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Telefone</label>
                      <div className="mt-1 flex items-center gap-2 text-gray-900">
                        <Phone size={18} className="text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                      <div className="mt-1 flex items-center gap-2 text-gray-900">
                        <Calendar size={18} className="text-gray-400" />
                        <span>{user.birthDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CPF:</label>
                      <div className="mt-1 flex items-center gap-2 text-gray-900">
                        <MapPin size={18} className="text-gray-400" />
                        <span>{user.cpf}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Pedidos</h2>
                
                <div className="space-y-4">
                  {mockOrders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-medium text-gray-900">{order.id}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <button className="text-gray-600 hover:text-gray-900">
                          Ver Detalhes
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package size={16} />
                          <span>{order.items} {order.items === 1 ? 'item' : 'itens'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} />
                          <span>R$ {order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}