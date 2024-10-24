import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onUpdateStock: (productId: string, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onUpdateStock }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
          )}
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <input
            type="number"
            defaultValue={0}
            min={0}
            onChange={(e) => onUpdateStock(product.id, parseInt(e.target.value))}
            className="mt-2 w-full p-2 border rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;