import React from 'react';
import { ArrowUpDown } from 'lucide-react';

//Due to the nature of the data returned from the API, we have to define the possible fields that can be used to sort the pokemon data
export type SortField = 'name' | 'height' | 'weight' | 'base_experience';
export type SortOrder = 'asc' | 'desc';

interface SortControlsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortField,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortField}
        onChange={(e) => onSortChange(e.target.value as SortField)}
        className="rounded-lg border border-gray-300 px-3 py-2"
      >
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
        <option value="base_experience">Experience</option>
      </select>
      <button
        onClick={() => onSortChange(sortField)}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
        title={`Current order: ${sortOrder.toUpperCase()}`}
      >
        <ArrowUpDown className="w-4 h-4" />
      </button>
    </div>
  );
};