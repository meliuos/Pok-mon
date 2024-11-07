import React from 'react';
import { Shield, Zap, Heart, Swords, Target, Wind } from 'lucide-react';

interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemontypes: PokemonType[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
}
//Hard coded colors for each type of pokemon
const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};
//using a switch case to return the icon for each stat
const StatIcon: React.FC<{ statName: string }> = ({ statName }) => {
  switch (statName) {
    case 'hp':
      return <Heart className="w-4 h-4" />;
    case 'attack':
      return <Swords className="w-4 h-4" />;
    case 'defense':
      return <Shield className="w-4 h-4" />;
    case 'special-attack':
      return <Target className="w-4 h-4" />;
    case 'special-defense':
      return <Shield className="w-4 h-4" />;
    case 'speed':
      return <Wind className="w-4 h-4" />;
    default:
      return <Zap className="w-4 h-4" />;
  }
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const getStatValue = (statName: string) => {
    const stat = pokemon.pokemon_v2_pokemonstats.find(
      (s) => s.pokemon_v2_stat.name === statName
    );
    return stat?.base_stat || 0;
  };
  const statsList = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
          <span className="text-sm text-gray-500">#{pokemon.id}</span>
        </div>

        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-full h-48 object-contain mb-4"
        />

        <div className="flex gap-2 mb-4">
          {pokemon.pokemon_v2_pokemontypes.map((type, index) => (
            <span
              key={index}
              className={`${
                typeColors[type.pokemon_v2_type.name] || 'bg-gray-400'
              } text-white px-3 py-1 rounded-full text-sm capitalize`}
            >
              {type.pokemon_v2_type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {statsList.map(
            (statName) => (
              <div
                key={statName}
                className="flex items-center gap-2 bg-gray-50 p-2 rounded"
              >
                <StatIcon statName={statName} />
                <div className="flex-1">
                  <div className="text-xs text-gray-500 capitalize">
                    {statName.replace('-', ' ')}
                  </div>
                  <div className="font-medium">{getStatValue(statName)}</div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <span className="mr-4">Height: {pokemon.height / 10}m</span>
          <span>Weight: {pokemon.weight / 10}kg</span>
        </div>
      </div>
    </div>
  );
};