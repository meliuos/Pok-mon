import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface StatFilter {
  stat: string;
  operator: 'gt' | 'lt';
  value: number;
}

export interface SearchFilters {
  name?: string;
  statFilters: StatFilter[];
}

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ filters, onFiltersChange }) => {
  const [showStatFilter, setShowStatFilter] = useState(false);
  const [newStatFilter, setNewStatFilter] = useState<StatFilter>({
    stat: 'hp',
    operator: 'gt',
    value: 0,
  });

  const handleNameChange = (value: string) => {
    onFiltersChange({ ...filters, name: value });
  };

  const addStatFilter = () => {
    onFiltersChange({
      ...filters,
      statFilters: [...filters.statFilters, newStatFilter],
    });
    setNewStatFilter({ stat: 'hp', operator: 'gt', value: 0 });
  };

  const removeStatFilter = (index: number) => {
    const newFilters = [...filters.statFilters];
    newFilters.splice(index, 1);
    onFiltersChange({ ...filters, statFilters: newFilters });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={filters.name || ''}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Search Pokémon by name..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setShowStatFilter(!showStatFilter)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          {showStatFilter ? 'Hide Stat Filter' : 'Add Stat Filter'}
        </button>

        {showStatFilter && (
          <div className="flex gap-2 items-center">
            <select
              value={newStatFilter.stat}
              onChange={(e) =>
                setNewStatFilter({ ...newStatFilter, stat: e.target.value })
              }
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="hp">HP</option>
              <option value="attack">Attack</option>
              <option value="defense">Defense</option>
              <option value="special-attack">Sp. Attack</option>
              <option value="special-defense">Sp. Defense</option>
              <option value="speed">Speed</option>
            </select>

            <select
              value={newStatFilter.operator}
              onChange={(e) =>
                setNewStatFilter({
                  ...newStatFilter,
                  operator: e.target.value as 'gt' | 'lt',
                })
              }
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="gt">Greater than</option>
              <option value="lt">Less than</option>
            </select>

            <input
              type="number"
              value={newStatFilter.value}
              onChange={(e) =>
                setNewStatFilter({
                  ...newStatFilter,
                  value: parseInt(e.target.value) || 0,
                })
              }
              className="rounded-lg border border-gray-300 px-3 py-2 w-24"
              min="0"
              max="255"
            />

            <button
              onClick={addStatFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Filter
            </button>
          </div>
        )}

        {filters.statFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.statFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
              >
                <span className="text-sm">
                  {filter.stat} {filter.operator === 'gt' ? '>' : '<'} {filter.value}
                </span>
                <button
                  onClick={() => removeStatFilter(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};