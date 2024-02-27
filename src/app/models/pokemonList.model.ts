interface PokemonList {
  id: number;
  pokemon: PokemonListItem[];
  slot: number;
}

interface PokemonListItem {
  name: string;
  url: string;
}

export { PokemonList };
