import React,{useState} from "react";
import "./index.css";
import { useQuery} from "@apollo/client";
import {PokemonCard} from "./components/PokemonCard";
import { GET_POKEMONS } from "./services/api";
import { Loader2 } from 'lucide-react';
import { Pagination } from "./components/Pagination";



const ITEMS_PER_PAGE = 12;

function App() {
    const buildWhereClause = () => {
    };
    const buildOrderBy = () => {
    };
    const [currentPage, setCurrentPage] = useState(1);
    const { data, loading } = useQuery(GET_POKEMONS, {
        variables: {
          offset: (currentPage - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
          where: buildWhereClause(),
          orderBy: buildOrderBy(),
        },
      });

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
            {loading && (<div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>)}
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {data?.pokemons.map((pokemon: any) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
                </div>    
            )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

       </div>
    </div>
  );
}

export default App;