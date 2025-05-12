import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, cpf: string, phone: string, birthDate: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao fazer login');
      }
  
      const data = await response.json();
  
      // Exemplo da resposta do backend:
      // {
      //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
      //   "user": { "email": "user@email.com", "id": 3 }
      // }
  
      const user = data.user;
      const token = data.token;
  
      localStorage.setItem('token', token); // salva o JWT
      setUser(user); // dispara o useEffect que salva no localStorage
    } catch (err) {
      throw err;
    }
  };
  
  

  async function signup(email: string, password: string, name: string, cpf: string, phone: string, birthDate: string) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          cpf: cpf.replace(/\D/g, ''), // remove máscara
          phone: phone.replace(/\D/g, ''), // remove máscara
          birthDate: birthDate, // ou o formato que sua API espera
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao criar conta');
      }
  
      const data = await response.json();
      // talvez você queira salvar o token aqui também
      return data;
    } catch (err) {
      throw err;
    }
  }
  

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}