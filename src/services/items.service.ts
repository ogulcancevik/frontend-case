const fetchItems = async () => {
  const response = await fetch('/assets/items.json');
  const { data } = await response.json();
  return data as string[];
};

export const itemsService = {
  fetchItems,
};
