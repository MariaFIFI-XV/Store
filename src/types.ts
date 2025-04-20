export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'shirts' | 'pants' | 'dresses' | 'accessories';
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  label: string;
}