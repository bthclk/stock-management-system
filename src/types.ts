export interface Product {
  id: string;
  name: string;
  wholesalerId: string;
  imageUrl?: string;
}

export interface Wholesaler {
  id: string;
  name: string;
}

export interface StockItem {
  productId: string;
  quantity: number;
}

export interface StockList {
  items: StockItem[];
  date: string;
}