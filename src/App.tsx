import React, { useState, useEffect } from 'react';
import { Product, Wholesaler, StockList } from './types';
import AdminPanel from './components/AdminPanel';
import StockForm from './components/StockForm';
import Login from './components/Login';
import { Settings } from 'lucide-react';
import { getProducts, getWholesalers, getStockLists, saveProducts, saveWholesalers, saveStockLists } from './utils/localStorage';
import { initializeData } from './utils/initializeData';

const ADMIN_PASSWORD = 'admin123';
const STAFF_PASSWORD = 'olives2022';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wholesalers, setWholesalers] = useState<Wholesaler[]>([]);
  const [stockLists, setStockLists] = useState<StockList[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);

  useEffect(() => {
    // Verileri sıfırla ve yeniden yükle
    localStorage.clear(); // Tüm localStorage'ı temizle
    initializeData(); // Verileri yeniden yükle

    // Verileri state'e yükle
    const loadedProducts = getProducts();
    const loadedWholesalers = getWholesalers();
    const loadedStockLists = getStockLists();

    setProducts(loadedProducts);
    setWholesalers(loadedWholesalers);
    setStockLists(loadedStockLists);

    console.log('Loaded products:', loadedProducts);
    console.log('Loaded wholesalers:', loadedWholesalers);
  }, []);

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      setShowAdminPanel(true);
    } else {
      alert('Yanlış şifre!');
    }
  };

  const handleStaffLogin = (password: string) => {
    if (password === STAFF_PASSWORD) {
      setIsStaffLoggedIn(true);
    } else {
      alert('Yanlış şifre!');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setIsStaffLoggedIn(false);
    setShowAdminPanel(false);
  };

  const handleSubmitStock = (newStockList: StockList) => {
    const updatedStockLists = [...stockLists, newStockList];
    setStockLists(updatedStockLists);
    saveStockLists(updatedStockLists);
    alert('Stok listesi başarıyla gönderildi!');
  };

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveProducts(newProducts);
  };

  const updateWholesalers = (newWholesalers: Wholesaler[]) => {
    setWholesalers(newWholesalers);
    saveWholesalers(newWholesalers);
  };

  if (!isAdminLoggedIn && !isStaffLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Stok Yönetim Sistemi</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Personel Girişi</h2>
          <Login onLogin={handleStaffLogin} buttonText="Personel Girişi" />
          <h2 className="text-xl font-semibold mb-4 mt-8">Yönetici Girişi</h2>
          <Login onLogin={handleAdminLogin} buttonText="Yönetici Girişi" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Stok Yönetim Sistemi</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </div>

      {showAdminPanel && isAdminLoggedIn ? (
        <AdminPanel
          products={products}
          wholesalers={wholesalers}
          stockLists={stockLists}
          onClose={() => setShowAdminPanel(false)}
          updateProducts={updateProducts}
          updateWholesalers={updateWholesalers}
        />
      ) : (
        <>
          {isStaffLoggedIn && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Haftalık Stok Listesi</h2>
              <StockForm products={products} onSubmit={handleSubmitStock} />
            </div>
          )}
        </>
      )}

      {isAdminLoggedIn && !showAdminPanel && (
        <button
          onClick={() => setShowAdminPanel(true)}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          <Settings size={24} />
        </button>
      )}
    </div>
  );
}

export default App;