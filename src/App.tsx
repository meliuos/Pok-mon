import React ,{useState} from "react";
import "./index.css";
import { useQuery} from "@apollo/client";
import {PokemonCard} from "./components/PokemonCard";
import { TypeFilter } from './components/TypeFilter';
import { GET_POKEMONS } from "./services/api";
import { Loader2 } from 'lucide-react';
import { Pagination } from "./components/Pagination";
import {SearchBar,type SearchFilters} from "./components/SearchBar";
import {SortControls,SortField,SortOrder} from "./components/SortControls";

const ITEMS_PER_PAGE = 12;

function App() {
    //Setting the initial state of the filters and current page
    const [filters, setFilters] = useState<SearchFilters>({
        name: '',//Name search filter
        statFilters: [],//Stat search filter eg. hp > 50
      });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedType, setSelectedType] = useState('all');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    
    //Filtering the pokemons based on the where clause
    const buildWhereClause = () => {
        const conditions: any[] = [];

        // Filter by name if provided
        if (filters.name) {
          conditions.push({
            name: { _ilike: `%${filters.name}%` },
          });
        }
        // Filter by type if provided
        if (selectedType !== 'all') {
            conditions.push({
              pokemon_v2_pokemontypes: {
                pokemon_v2_type: { name: { _eq: selectedType } },
              },
            });
          }
        // Filter by stats if provided
        filters.statFilters.forEach((filter) => {
            conditions.push({
              pokemon_v2_pokemonstats: {
                base_stat: filter.operator === 'gt' ? { _gt: filter.value } : { _lt: filter.value },
                pokemon_v2_stat: { name: { _eq: filter.stat } },
              },
            });
          });
        return conditions.length > 0 ? { _and: conditions } : {}; 
    };
    const buildOrderBy = () => {
        return [{ [sortField]: sortOrder }];
    };
    
    
    //Fetching the pokemons data from the API based on the filters and current page number 
    const { data, loading,error } = useQuery(GET_POKEMONS, {
        variables: {
          offset: (currentPage - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
          where: buildWhereClause(),
          orderBy: buildOrderBy(),
          
        },
      });

    // Check if there's any error
    if (error) {
        console.error('GraphQL Error:', error);
      }
    //Handling the change in filters
    const handleFiltersChange = (newFilters: SearchFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
      };
    //Handling the change in type
    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setCurrentPage(1);
      };
    //Handling the change in sort field and order
    const handleSortChange = (field: SortField) => {
        if (field === sortField) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortField(field);
          setSortOrder('asc');
        }
        setCurrentPage(1);
      };
    //Calculating the total number of pages based on the total pokemons count
    const totalPages = data?.pokemon_aggregate.aggregate.count
      ? Math.ceil(data.pokemon_aggregate.aggregate.count / ITEMS_PER_PAGE)
      : 0;

    return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokémon Explorer</h1>
          <p className="text-lg text-gray-600">
            Discover and explore your favorite Pokémon
          </p>
        </div>
        <div className="space-y-6 mb-8">
          <div className="flex flex-col gap-4">
            <SearchBar filters={filters} onFiltersChange={handleFiltersChange} />
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <TypeFilter selectedType={selectedType} onTypeChange={handleTypeChange} />
            <div className="ml-auto">
                <SortControls
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>
          </div>
        </div>
        
            {loading && (<div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="m-2 text-grey-800">Loading Pokémons</span>
                </div>)}
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {data?.pokemons.map((pokemon: any) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
                </div>    
            )}
        {
            !loading && data?.pokemons.length === 0 && (
                <div className="min-h-full text-center text-gray-600">No Pokémons found</div>
            )
        }
        {
            !loading && data?.pokemons.length > 0 && (
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                />
            )
        }

       </div>
    </div>
  );
}

export default App;