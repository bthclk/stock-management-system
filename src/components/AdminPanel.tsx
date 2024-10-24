import React, { useState } from 'react';
import { Product, Wholesaler, StockList } from '../types';

interface AdminPanelProps {
  products: Product[];
  wholesalers: Wholesaler[];
  stockLists: StockList[];
  onClose: () => void;
  updateProducts: (products: Product[]) => void;
  updateWholesalers: (wholesalers: Wholesaler[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  wholesalers,
  stockLists,
  onClose,
  updateProducts,
  updateWholesalers,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [newWholesaler, setNewWholesaler] = useState<Partial<Wholesaler>>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingWholesaler, setEditingWholesaler] = useState<Wholesaler | null>(null);

  const sortedStockLists = stockLists.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const uniqueDates = Array.from(new Set(sortedStockLists.map(list => list.date.split('T')[0])));

  const selectedStockList = selectedDate
    ? sortedStockLists.find(list => list.date.startsWith(selectedDate))
    : null;

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.wholesalerId) {
      const updatedProducts = [...products, { ...newProduct, id: Date.now().toString() } as Product];
      updateProducts(updatedProducts);
      setNewProduct({});
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      );
      updateProducts(updatedProducts);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      updateProducts(updatedProducts);
    }
  };

  const handleAddWholesaler = () => {
    if (newWholesaler.name) {
      const updatedWholesalers = [...wholesalers, { ...newWholesaler, id: Date.now().toString() } as Wholesaler];
      updateWholesalers(updatedWholesalers);
      setNewWholesaler({});
    }
  };

  const handleEditWholesaler = (wholesaler: Wholesaler) => {
    setEditingWholesaler(wholesaler);
  };

  const handleUpdateWholesaler = () => {
    if (editingWholesaler) {
      const updatedWholesalers = wholesalers.map(w => 
        w.id === editingWholesaler.id ? editingWholesaler : w
      );
      updateWholesalers(updatedWholesalers);
      setEditingWholesaler(null);
    }
  };

  const handleDeleteWholesaler = (wholesalerId: string) => {
    if (window.confirm('Bu toptancıyı silmek istediğinizden emin misiniz?')) {
      const updatedWholesalers = wholesalers.filter(w => w.id !== wholesalerId);
      updateWholesalers(updatedWholesalers);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Yönetici Paneli</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Toptancılar ve Ürünler</h3>
        {wholesalers.map((wholesaler) => (
          <div key={wholesaler.id} className="mb-4 p-4 border rounded">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-medium">{wholesaler.name}</h4>
              <div>
                <button
                  onClick={() => handleEditWholesaler(wholesaler)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteWholesaler(wholesaler.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Sil
                </button>
              </div>
            </div>
            <ul className="ml-4">
              {products
                .filter(product => product.wholesalerId === wholesaler.id)
                .map(product => (
                  <li key={product.id} className="mb-2 flex justify-between items-center">
                    <div>
                      <span>{product.name}</span>
                      {product.imageUrl && (
                        <img src={product.imageUrl} alt={product.name} className="w-8 h-8 inline-block ml-2 rounded" />
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="mb-8 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Ürün Düzenle</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Ürün Adı"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              className="border p-2 rounded flex-grow"
            />
            <select
              value={editingProduct.wholesalerId}
              onChange={(e) => setEditingProduct({ ...editingProduct, wholesalerId: e.target.value })}
              className="border p-2 rounded"
            >
              {wholesalers.map((w) => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Resim URL"
              value={editingProduct.imageUrl || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
              className="border p-2 rounded flex-grow"
            />
            <button onClick={handleUpdateProduct} className="bg-green-500 text-white px-4 py-2 rounded">
              Kaydet
            </button>
            <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
              İptal
            </button>
          </div>
        </div>
      )}

      {editingWholesaler && (
        <div className="mb-8 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Toptancı Düzenle</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Toptancı Adı"
              value={editingWholesaler.name}
              onChange={(e) => setEditingWholesaler({ ...editingWholesaler, name: e.target.value })}
              className="border p-2 rounded flex-grow"
            />
            <button onClick={handleUpdateWholesaler} className="bg-green-500 text-white px-4 py-2 rounded">
              Kaydet
            </button>
            <button onClick={() => setEditingWholesaler(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
              İptal
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Yeni Ürün Ekle</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Ürün Adı"
            value={newProduct.name || ''}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 rounded flex-grow"
          />
          <select
            value={newProduct.wholesalerId || ''}
            onChange={(e) => setNewProduct({ ...newProduct, wholesalerId: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Toptancı Seç</option>
            {wholesalers.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Resim URL (Opsiyonel)"
            value={newProduct.imageUrl || ''}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            className="border p-2 rounded flex-grow"
          />
          <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded">
            Ürün Ekle
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Yeni Toptancı Ekle</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Toptancı Adı"
            value={newWholesaler.name || ''}
            onChange={(e) => setNewWholesaler({ ...newWholesaler, name: e.target.value })}
            className="border p-2 rounded flex-grow"
          />
          <button onClick={handleAddWholesaler} className="bg-green-500 text-white px-4 py-2 rounded">
            Toptancı Ekle
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Gönderilmiş Stok Listeleri</h3>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option value="">Tarih Seçin</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
        {selectedStockList && (
          <div>
            <h4 className="text-lg font-medium mb-2">
              {new Date(selectedStockList.date).toLocaleString()} Tarihli Stok Listesi
            </h4>
            {wholesalers.map((wholesaler) => {
              const wholesalerItems = selectedStockList.items
                .filter((item) => {
                  const product = products.find(p => p.id === item.productId);
                  return product && product.wholesalerId === wholesaler.id && item.quantity > 0;
                });

              if (wholesalerItems.length === 0) return null;

              return (
                <div key={wholesaler.id} className="mb-4">
                  <h5 className="text-md font-medium">{wholesaler.name}</h5>
                  <ul className="list-disc list-inside ml-4">
                    {wholesalerItems.map((item) => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <li key={item.productId}>
                          {product?.name}: {item.quantity}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
        Yönetici Panelini Kapat
      </button>
    </div>
  );
};

export default AdminPanel;