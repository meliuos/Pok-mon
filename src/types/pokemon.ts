//Pokémon Type Definitions (example: Water, Fire, Grass, etc.) 
export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;//For more information about the type
    };
  }

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
};
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    stats: PokemonStat[];
    sprites: {
        front_default: string;//Front view of the Pokemon
        other: {
        'official-artwork': {
            front_default: string;//Official picture of the Pokemon (Front view)
        };
        };
    };
}

export interface PokemonListResponse {
    count: number;
    next: string | null; //Next page URL
    previous: string | null;//Previous page URL
    results: {
        name: string;//Pokemon name
        url: string;//Pokemon URL for details
    }[];
}