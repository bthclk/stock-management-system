import React, { useState } from 'react';
import { Product, StockList, StockItem } from '../types';

interface StockFormProps {
  products: Product[];
  onSubmit: (stockList: StockList) => void;
}

const StockForm: React.FC<StockFormProps> = ({ products, onSubmit }) => {
  const [stockItems, setStockItems] = useState<StockItem[]>(
    products.map(product => ({
      productId: product.id,
      quantity: 0
    }))
  );

  const handleQuantityChange = (productId: string, quantity: number) => {
    setStockItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nonZeroItems = stockItems.filter(item => item.quantity > 0);
    
    if (nonZeroItems.length === 0) {
      alert('Lütfen en az bir ürün için stok miktarı girin.');
      return;
    }

    const newStockList: StockList = {
      items: nonZeroItems,
      date: new Date().toISOString(),
    };
    onSubmit(newStockList);
    
    // Form gönderildikten sonra tüm değerleri sıfırla
    setStockItems(products.map(product => ({
      productId: product.id,
      quantity: 0
    })));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center space-x-4">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
          )}
          <span className="flex-grow">{product.name}</span>
          <input
            type="number"
            min="0"
            value={stockItems.find(item => item.productId === product.id)?.quantity || 0}
            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
            className="w-20 p-2 border rounded"
          />
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Stok Listesini Gönder
      </button>
    </form>
  );
};

export default StockForm;