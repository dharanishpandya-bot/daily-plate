// Grocery item images
import tomatoImg from '@/assets/grocery/tomato.jpg';
import onionImg from '@/assets/grocery/onion.jpg';
import spinachImg from '@/assets/grocery/spinach.jpg';
import appleImg from '@/assets/grocery/apple.jpg';
import bananaImg from '@/assets/grocery/banana.jpg';
import riceImg from '@/assets/grocery/rice.jpg';
import wheatFlourImg from '@/assets/grocery/wheat-flour.jpg';
import cookingOilImg from '@/assets/grocery/cooking-oil.jpg';
import sugarImg from '@/assets/grocery/sugar.jpg';
import saltImg from '@/assets/grocery/salt.jpg';
import milkImg from '@/assets/grocery/milk.jpg';
import breadImg from '@/assets/grocery/bread.jpg';
import eggsImg from '@/assets/grocery/eggs.jpg';
import butterImg from '@/assets/grocery/butter.jpg';
import cheeseImg from '@/assets/grocery/cheese.jpg';
import detergentImg from '@/assets/grocery/detergent.jpg';
import dishWashImg from '@/assets/grocery/dish-wash.jpg';
import bathSoapImg from '@/assets/grocery/bath-soap.jpg';
import toothpasteImg from '@/assets/grocery/toothpaste.jpg';
import handWashImg from '@/assets/grocery/hand-wash.jpg';

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

export interface GroceryShop {
  id: string;
  name: string;
  type: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  emoji: string;
  items: GroceryItem[];
}

export const groceryShopsData: GroceryShop[] = [
  {
    id: 'organic-greens-hub',
    name: 'Organic Greens Hub',
    type: 'Organic • Fresh Produce',
    rating: 4.7,
    deliveryTime: '25 min',
    distance: '1.2 km',
    emoji: '🥬',
    items: [
      { id: 'ogh-1', name: 'Tomato', price: 40, unit: '1kg', image: tomatoImg, category: 'Vegetables' },
      { id: 'ogh-2', name: 'Onion', price: 35, unit: '1kg', image: onionImg, category: 'Vegetables' },
      { id: 'ogh-3', name: 'Spinach', price: 20, unit: '1 bunch', image: spinachImg, category: 'Vegetables' },
      { id: 'ogh-4', name: 'Apple', price: 120, unit: '1kg', image: appleImg, category: 'Fruits' },
      { id: 'ogh-5', name: 'Banana', price: 50, unit: '1 dozen', image: bananaImg, category: 'Fruits' },
    ],
  },
  {
    id: 'fresh-grocery-mart',
    name: 'Fresh Grocery Mart',
    type: 'Staples • Essentials',
    rating: 4.5,
    deliveryTime: '30 min',
    distance: '1.8 km',
    emoji: '🛒',
    items: [
      { id: 'fgm-1', name: 'Rice', price: 55, unit: '1kg', image: riceImg, category: 'Staples' },
      { id: 'fgm-2', name: 'Wheat Flour', price: 48, unit: '1kg', image: wheatFlourImg, category: 'Staples' },
      { id: 'fgm-3', name: 'Cooking Oil', price: 140, unit: '1L', image: cookingOilImg, category: 'Staples' },
      { id: 'fgm-4', name: 'Sugar', price: 42, unit: '1kg', image: sugarImg, category: 'Staples' },
      { id: 'fgm-5', name: 'Salt', price: 20, unit: '1kg', image: saltImg, category: 'Staples' },
    ],
  },
  {
    id: 'big-basket-express',
    name: 'Big Basket Express',
    type: 'Dairy • Breakfast',
    rating: 4.6,
    deliveryTime: '20 min',
    distance: '0.8 km',
    emoji: '🧺',
    items: [
      { id: 'bbe-1', name: 'Milk', price: 50, unit: '1L', image: milkImg, category: 'Dairy' },
      { id: 'bbe-2', name: 'Bread', price: 35, unit: '1 pack', image: breadImg, category: 'Bakery' },
      { id: 'bbe-3', name: 'Eggs', price: 70, unit: '12 pcs', image: eggsImg, category: 'Dairy' },
      { id: 'bbe-4', name: 'Butter', price: 55, unit: '100g', image: butterImg, category: 'Dairy' },
      { id: 'bbe-5', name: 'Cheese', price: 120, unit: '200g', image: cheeseImg, category: 'Dairy' },
    ],
  },
  {
    id: 'daily-needs-store',
    name: 'Daily Needs Store',
    type: 'Household • Cleaning',
    rating: 4.4,
    deliveryTime: '35 min',
    distance: '2.1 km',
    emoji: '🏠',
    items: [
      { id: 'dns-1', name: 'Detergent Powder', price: 95, unit: '1kg', image: detergentImg, category: 'Household' },
      { id: 'dns-2', name: 'Dish Wash Liquid', price: 60, unit: '500ml', image: dishWashImg, category: 'Household' },
      { id: 'dns-3', name: 'Bath Soap', price: 75, unit: '3 pcs', image: bathSoapImg, category: 'Personal Care' },
      { id: 'dns-4', name: 'Toothpaste', price: 85, unit: '200g', image: toothpasteImg, category: 'Personal Care' },
      { id: 'dns-5', name: 'Hand Wash', price: 45, unit: '250ml', image: handWashImg, category: 'Personal Care' },
    ],
  },
];
