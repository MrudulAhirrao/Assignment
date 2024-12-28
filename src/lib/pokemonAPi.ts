const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList() {
  const response = await fetch(`${POKEMON_API}pokemon?limit=151`);
  const data = await response.json();

  const pokemonList = await Promise.all(
    data.results.map(async (pokemon: { url: string; name: string }) => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      const statsResponse = await fetch(`${POKEMON_API}pokemon/${id}`);
      const statsData = await statsResponse.json();

      return {
        id: id,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        stats: statsData.stats,
        types: statsData.types.map((typeInfo: any) => typeInfo.type.name), // Add types for filtering
      };
    })
  );

  return pokemonList;
}