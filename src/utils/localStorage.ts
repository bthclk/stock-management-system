import { Product, Wholesaler, StockList } from '../types';

const PRODUCTS_KEY = 'products';
const WHOLESALERS_KEY = 'wholesalers';
const STOCK_LISTS_KEY = 'stockLists';

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getProducts = (): Product[] => {
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
};

export const saveWholesalers = (wholesalers: Wholesaler[]) => {
  localStorage.setItem(WHOLESALERS_KEY, JSON.stringify(wholesalers));
};

export const getWholesalers = (): Wholesaler[] => {
  const wholesalers = localStorage.getItem(WHOLESALERS_KEY);
  return wholesalers ? JSON.parse(wholesalers) : [];
};

export const saveStockLists = (stockLists: StockList[]) => {
  localStorage.setItem(STOCK_LISTS_KEY, JSON.stringify(stockLists));
};

export const getStockLists = (): StockList[] => {
  const stockLists = localStorage.getItem(STOCK_LISTS_KEY);
  return stockLists ? JSON.parse(stockLists) : [];
};