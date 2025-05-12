import { Product, CartItem } from './types';

export function convertToCartProduct(product: Product): CartItem{
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image || '',
    description: product.description,
    category: ['shirts', 'pants', 'dresses', 'accessories'].includes(product.category || '')
      ? (product.category as 'shirts' | 'pants' | 'dresses' | 'accessories')
      : 'shirts',
    quantity: 1, // Default quantity
  };
}