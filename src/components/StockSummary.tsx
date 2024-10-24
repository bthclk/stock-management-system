import React from 'react';
import { Product, Wholesaler, StockList } from '../types';
import { sendEmail } from '../utils/emailSender';

interface StockSummaryProps {
  stockList: StockList;
  products: Product[];
  wholesalers: Wholesaler[];
}

const StockSummary: React.FC<StockSummaryProps> = ({ stockList, products, wholesalers }) => {
  const nonZeroItems = stockList.items.filter(item => item.quantity > 0);
  
  const groupedByWholesaler = nonZeroItems.reduce((acc, item) => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      if (!acc[product.wholesalerId]) {
        acc[product.wholesalerId] = [];
      }
      acc[product.wholesalerId].push({ ...item, productName: product.name });
    }
    return acc;
  }, {} as Record<string, { productId: string; productName: string; quantity: number }[]>);

  const handleSendEmail = async () => {
    const subject = 'Haftalık Stok İhtiyacı';
    let body = 'Haftalık Stok İhtiyacı:\n\n';

    Object.entries(groupedByWholesaler).forEach(([wholesalerId, items]) => {
      const wholesaler = wholesalers.find(w => w.id === wholesalerId);
      body += `${wholesaler?.name}:\n`;
      items.forEach(item => {
        body += `- ${item.productName}: ${item.quantity}\n`;
      });
      body += '\n';
    });

    try {
      await sendEmail('olivescrewe@gmail.com', subject, body);
      alert('E-posta başarıyla gönderildi!');
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      alert('E-posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Toptancılara Göre Stok İhtiyacı</h3>
      {Object.entries(groupedByWholesaler).map(([wholesalerId, items]) => {
        const wholesaler = wholesalers.find(w => w.id === wholesalerId);
        return (
          <div key={wholesalerId} className="mb-6">
            <h4 className="text-lg font-medium mb-2">{wholesaler?.name}</h4>
            <ul className="list-disc list-inside">
              {items.map(item => (
                <li key={item.productId}>
                  {item.productName}: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <button
        onClick={handleSendEmail}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        E-posta Gönder
      </button>
    </div>
  );
};

export default StockSummary;