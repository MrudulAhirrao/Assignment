"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem } from "./ui/select";

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonProps {
  pokemonList: {
    id: string;
    name: string;
    image: string;
    stats: Stat[];
    types: string[];
  }[];
}

export default function Page({ pokemonList }: PokemonProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<null | PokemonProps["pokemonList"][number]>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const matchesSearchQuery = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || pokemon.types.includes(selectedType);
    return matchesSearchQuery && matchesType;
  });

  const uniqueTypes = Array.from(new Set(pokemonList.flatMap((pokemon) => pokemon.types)));

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Pokedixx</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Search Pokémon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          ><SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {uniqueTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {filteredPokemonList.map((pokemon) => {
            return (
              <Card key={pokemon.id}>
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <CardHeader className="font-mono text-center uppercase">
                  <CardTitle>{pokemon.name}</CardTitle>
                </CardHeader>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedPokemon(pokemon)}
                    >
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{pokemon.name}</DialogTitle>
                      <DialogDescription>
                        {selectedPokemon && selectedPokemon.id === pokemon.id && (
                          <div>
                            <p>Stats:</p>
                            {pokemon.stats.map((stat) => (
                              <div key={stat.stat.name} className="mb-2">
                                <div className="flex justify-between">
                                  <span>{stat.stat.name}</span>
                                  <span>{stat.base_stat}</span>
                                </div>
                                <Progress value={stat.base_stat} max={255} />
                              </div>
                            ))}
                          </div>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </Card>
            );
          })}
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}