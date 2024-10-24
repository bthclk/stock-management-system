import { saveProducts, saveWholesalers, saveStockLists } from './localStorage';

export const initializeData = () => {
  const initialWholesalers = [
    { id: '1', name: 'Ormos' },
    { id: '2', name: 'Hellenic' },
    { id: '3', name: 'Booker' }
  ];

  const initialProducts = [
    // Ormos Products
    { id: '1', name: 'Chicken Gyros 20KG', wholesalerId: '1' },
    { id: '2', name: 'Chicken Gyros 25KG', wholesalerId: '1' },
    { id: '3', name: 'Vegan Gyros 1KG', wholesalerId: '1' },
    { id: '4', name: 'Baklava', wholesalerId: '1' },
    { id: '5', name: 'Chocolate Baklava', wholesalerId: '1' },
    { id: '6', name: 'Pitta Bread (1 Box - 180 Adet)', wholesalerId: '1' },
    { id: '7', name: 'Tarama 1KG', wholesalerId: '1' },
    { id: '8', name: 'Gyros Sarma Kağıdı', wholesalerId: '1' },

    // Hellenic Products
    { id: '9', name: 'Pork Gyros 10KG', wholesalerId: '2' },
    { id: '10', name: 'Hummus 2KG', wholesalerId: '2' },
    { id: '11', name: 'Kopanisti 2KG', wholesalerId: '2' },
    { id: '12', name: 'Peach Ice Tea 24adet', wholesalerId: '2' },
    { id: '13', name: 'Lemon Ice Tea 24adet', wholesalerId: '2' },
    { id: '14', name: 'Nektar Orangeade 24adet', wholesalerId: '2' },
    { id: '15', name: 'Nektar Lemonade 24adet', wholesalerId: '2' },
    { id: '16', name: 'Gyros Poşeti Beyaz + İçi Folyo Kaplı', wholesalerId: '2' },
    { id: '17', name: 'Samaria Water 500ml 24adet', wholesalerId: '2' },
    { id: '18', name: 'Kekik Oregano 1KG', wholesalerId: '2' },
    { id: '19', name: 'Feta Cheese 15KG', wholesalerId: '2' },
    { id: '20', name: 'Yeşil Zeytin 10KG', wholesalerId: '2' },
    { id: '21', name: 'Siyah Zeytin 10KG', wholesalerId: '2' },

    // Booker Products
    { id: '22', name: 'Fries 10KG Box', wholesalerId: '3' },
    { id: '23', name: 'Porsion Bag 100 Adet', wholesalerId: '3' },
    { id: '24', name: 'Small Bag 100 Adet', wholesalerId: '3' },
    { id: '25', name: 'XL Big Bag 100 Adet', wholesalerId: '3' },
    { id: '26', name: 'Cacık Kabı 4oz', wholesalerId: '3' },
    { id: '27', name: 'Sos Kabı 2oz', wholesalerId: '3' },
    { id: '28', name: 'Fries Box Beyaz 200adet', wholesalerId: '3' },
    { id: '29', name: 'KTC OIL 20L', wholesalerId: '3' },
    { id: '30', name: 'Blue Roll', wholesalerId: '3' },
    { id: '31', name: 'Garlic Mayo', wholesalerId: '3' },
    { id: '32', name: 'Kids Box 50 Adet', wholesalerId: '3' },
    { id: '33', name: 'Chilli Mayo', wholesalerId: '3' },
    { id: '34', name: 'Mayo', wholesalerId: '3' },
    { id: '35', name: 'Vegan Mayo', wholesalerId: '3' },
    { id: '36', name: 'Sweet Chilli', wholesalerId: '3' },
    { id: '37', name: 'Hot Chilli', wholesalerId: '3' },
    { id: '38', name: 'Honey Mustard', wholesalerId: '3' },
    { id: '39', name: 'Balsamic 500GR', wholesalerId: '3' },
    { id: '40', name: 'Porsion Box 180 Adet', wholesalerId: '3' },
    { id: '41', name: 'Zeytinyağı 5L', wholesalerId: '3' },
    { id: '42', name: 'Aluminium Container 1000adet', wholesalerId: '3' },
    { id: '43', name: 'Stuffed Vine Leaves', wholesalerId: '3' },
    { id: '44', name: 'Domates 5KG', wholesalerId: '3' },
    { id: '45', name: 'Cherry Domates 1.5KG', wholesalerId: '3' },
    { id: '46', name: 'Salatalık', wholesalerId: '3' },
    { id: '47', name: 'Mor Soğan 5KG', wholesalerId: '3' },
    { id: '48', name: 'Lettuce 10adet', wholesalerId: '3' },
    { id: '49', name: 'Bulaşık Süngeri 6\'lı', wholesalerId: '3' },
    { id: '50', name: 'Bulaşık Teli 6\'lı', wholesalerId: '3' },
    { id: '51', name: 'Pizza Box 9" (gyros bomb için)', wholesalerId: '3' },
    { id: '52', name: 'Beyaz Poşet 100adet (gyros bomb için)', wholesalerId: '3' },
    { id: '53', name: 'Peçete 300adet', wholesalerId: '3' },
    { id: '54', name: 'Çatal 100adet', wholesalerId: '3' },
    { id: '55', name: 'Lavabo Açıcı', wholesalerId: '3' },
    { id: '56', name: 'El Yıkama Sabunu', wholesalerId: '3' },
    { id: '57', name: 'Oven Cleaner Grill İçin Yağ Çözücü', wholesalerId: '3' },
    { id: '58', name: 'Bleach Çamaşır Suyu (biliç)', wholesalerId: '3' },
    { id: '59', name: 'Temizlik Bezi Mikrofiber 5\'li', wholesalerId: '3' },
    { id: '60', name: 'Tuz 3KG', wholesalerId: '3' },
    { id: '61', name: 'Coca Cola Diet', wholesalerId: '3' },
    { id: '62', name: 'Coca Cola Zero', wholesalerId: '3' },
    { id: '63', name: 'Fanta', wholesalerId: '3' },
    { id: '64', name: 'Fanta Fruit Twist', wholesalerId: '3' },
    { id: '65', name: 'Dr Pepper', wholesalerId: '3' },
    { id: '66', name: 'San Pellegrino Soda', wholesalerId: '3' },
    { id: '67', name: 'Sprite', wholesalerId: '3' },
    { id: '68', name: 'Coca Cola', wholesalerId: '3' },
    { id: '69', name: 'Macaroni Cheese 6\'lı', wholesalerId: '3' },
    { id: '70', name: 'Cam Temizleyici', wholesalerId: '3' },
    { id: '71', name: 'Multi Surface Cleaner', wholesalerId: '3' },
    { id: '72', name: 'Heavy Duty Cleaner', wholesalerId: '3' },
    { id: '73', name: 'Bulaşık Deterjanı', wholesalerId: '3' },
    { id: '74', name: 'Spaghetti Carbonara 6\'lı', wholesalerId: '3' },
    { id: '75', name: 'Tuvalet Kağıdı', wholesalerId: '3' }
  ];

  localStorage.clear();
  saveWholesalers(initialWholesalers);
  saveProducts(initialProducts);
  saveStockLists([]);
};