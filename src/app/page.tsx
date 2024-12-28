import Page from "@/components/page";
import { getPokemonList } from "@/lib/pokemonAPi";
import Image from "next/image";

export default async function Home() {
  const PokemonList = await getPokemonList();
  return (
    <Page pokemonList={PokemonList} />
  );
}
