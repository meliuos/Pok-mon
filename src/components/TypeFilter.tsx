import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_TYPES } from '../services/api';
import { Loader2 } from 'lucide-react';

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeChange }) => {

//Fetching the types of pokemon from the API
  const { data, loading } = useQuery(GET_POKEMON_TYPES);

//Displaying the loading message if the data is still loading
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading types...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="type-filter" className="text-sm font-medium text-gray-700">
        Filter by type:
      </label>
      <select
        id="type-filter"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2"
      >
        <option value="all">All Types</option>
        {data?.types.map((type: { id: number; name: string }) => (
          <option key={type.id} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};