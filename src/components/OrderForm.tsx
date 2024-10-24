import React, { useState } from 'react';
import { Product, Wholesaler, Order } from '../types';

interface OrderFormProps {
  products: Product[];
  wholesalers: Wholesaler[];
  onPlaceOrder: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ products, wholesalers, onPlaceOrder }) => {
  const [selectedWholesaler, setSelectedWholesaler] = useState<string>('');
  const [orderItems, setOrderItems] = useState<{ productId: string; quantity: number }[]>([]);

  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedItems = orderItems.filter((item) => item.productId !== productId);
    if (quantity > 0) {
      updatedItems.push({ productId, quantity });
    }
    setOrderItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWholesaler && orderItems.length > 0) {
      onPlaceOrder({
        wholesalerId: selectedWholesaler,
        products: orderItems,
      });
      setSelectedWholesaler('');
      setOrderItems([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={selectedWholesaler}
        onChange={(e) => setSelectedWholesaler(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a wholesaler</option>
        {wholesalers.map((wholesaler) => (
          <option key={wholesaler.id} value={wholesaler.id}>
            {wholesaler.name}
          </option>
        ))}
      </select>
      {products.map((product) => (
        <div key={product.id} className="flex items-center space-x-2">
          <span>{product.name}</span>
          <input
            type="number"
            min="0"
            value={orderItems.find((item) => item.productId === product.id)?.quantity || 0}
            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
            className="w-20 p-2 border rounded"
          />
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;