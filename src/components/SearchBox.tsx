import { useEffect, useState } from 'react';
import Search from './Search';

const SearchBox = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const getSelectedItems = () => {
    const items = localStorage.getItem('selectedItems');
    if (items) {
      setSelectedItems(JSON.parse(items));
    }
  };
  useEffect(() => {
    getSelectedItems();
  }, []);
  return (
    <div className="bg-white rounded-md shadow-lg p-10 gap-3 flex flex-col w-8/12">
      <span className="text-2xl font-bold text-gray-800">Kategoriler</span>
      <Search
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <div className="flex flex-col w-full gap-2 mt-5">
        <span className="text-gray-800 text-2xl">Seçili kategoriler:</span>
        <div className="flex gap-3 flex-wrap">
          {selectedItems.map((item, key) => (
            <span key={key} className="bg-gray-500 text-white p-2 rounded-lg">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
