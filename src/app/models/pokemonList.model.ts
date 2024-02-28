interface PokemonList {
  pokemon: PokemonListItem[];
}

interface PokemonListItem {
  name: string;
  url: string;
  spriteUrl: string;
  slot: number;
}

export { PokemonList, PokemonListItem };
