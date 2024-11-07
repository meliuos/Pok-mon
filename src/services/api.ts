import { gql } from '@apollo/client';
//Getting all pokemons with their types and stats from the API
export const GET_POKEMONS = gql`
  query GetPokemons(
    $limit: Int!
    $offset: Int!
    $where: pokemon_v2_pokemon_bool_exp
    $orderBy: [pokemon_v2_pokemon_order_by!]
  ) {
    pokemons: pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: $where
      order_by: $orderBy
    ) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
    pokemon_aggregate: pokemon_v2_pokemon_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
//Getting all types of pokemon from the API
export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    types: pokemon_v2_type(order_by: {name: asc}) {
      id
      name
    }
  }
`;