import { useMemo, useState } from 'react';

export const useSortHook = (items, initialField = 'fullName', initialOrder = 'asc') => {
  const [sortField, setSortField] = useState(initialField);
  const [sortOrder, setSortOrder] = useState(initialOrder);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      return;
    }

    setSortField(field);
    setSortOrder('asc');
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortOrder === 'asc') {
        if (sortField === 'groupId') {
          if (a[sortField] > b[sortField]) return 1;
          if (a[sortField] < b[sortField]) return -1;
          return 0;
        }

        return a[sortField].localeCompare(b[sortField]);
      }

      if (sortField === 'groupId') {
        if (a[sortField] < b[sortField]) return 1;
        if (a[sortField] > b[sortField]) return -1;
        return 0;
      }

      return b[sortField].localeCompare(a[sortField]);
    });
  }, [items, sortField, sortOrder]);

  return {
    sortedItems,
    sortField,
    sortOrder,
    handleSort,
  };
};
