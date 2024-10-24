import React from 'react';
import { Wholesaler } from '../types';

interface WholesalerListProps {
  wholesalers: Wholesaler[];
  onSelectWholesaler: (wholesalerId: string) => void;
}

const WholesalerList: React.FC<WholesalerListProps> = ({ wholesalers, onSelectWholesaler }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {wholesalers.map((wholesaler) => (
        <button
          key={wholesaler.id}
          onClick={() => onSelectWholesaler(wholesaler.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {wholesaler.name}
        </button>
      ))}
    </div>
  );
};

export default WholesalerList;