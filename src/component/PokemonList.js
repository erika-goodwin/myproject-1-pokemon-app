import React from "react";

export default function PokemonList({ pokemon }) {
  console.log("Pokemon List:", pokemon);
  const pokemonName = pokemon.name;
  return (
    <div>
      {pokemon && pokemon.map((p) => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
}
