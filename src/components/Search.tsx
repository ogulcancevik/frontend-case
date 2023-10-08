import { itemsService } from '@/services/items.service';
import { useEffect, useMemo, useState } from 'react';

interface ISearchProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}
const Search = (props: ISearchProps) => {
  const { selectedItems, setSelectedItems } = props;
  const [items, setItems] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const fetchItems = async () => {
    const items = await itemsService.fetchItems();
    setItems(items);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const queriedItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);
  const handleItemClick = (item: string) => {
    const isDuplicate = selectedItems.includes(item);
    if (isDuplicate) {
      alert('Bu kategori zaten seçili');
      return;
    }
    setSelectedItems([...selectedItems, item]);
    localStorage.setItem(
      'selectedItems',
      JSON.stringify([...selectedItems, item])
    );
  };

  const removeItem = (item: string) => {
    const newItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newItems);
    localStorage.setItem('selectedItems', JSON.stringify(newItems));
  };

  return (
    <div className="relative">
      <div className="flex items-center relative bg-white py-2 px-4 rounded-md border border-gray-300">
        <input
          type="text"
          placeholder="Kategori ara..."
          className="outline-none ring-0 w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          src="assets/search.svg"
          alt="search"
          className="absolute right-0 w-5 h-5 mr-2"
        />
      </div>
      <div className="bg-white w-full min-h-10 max-h-60 rounded-md shadow-lg overflow-y-auto mt-5">
        {queriedItems.map((item, key) => (
          <div
            key={key}
            className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-100"
          >
            <input
              className="mr-2"
              type="checkbox"
              checked={selectedItems.includes(item)}
              onClick={() => removeItem(item)}
            />
            <span
              onClick={() => handleItemClick(item)}
              className="text-gray-800"
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
