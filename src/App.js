import React, { useState, useEffect } from "react";
import PokemonList from "./component/PokemonList";
import axios from "axios";
import Pagination from "./component/Pagination";

function App() {
  console.log("App render:");
  const [pokemon20, setPokemon20] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const getAllPokemons = () => {
    axios
      .get(loadMore)
      .then((res) => {
        setLoadMore(res.data.next);
        const createPokemonObject = (pokemonData) => {
          console.log("PokoeonData: ", pokemonData);
          pokemonData.map(async (pokemon) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const data = await res.json();
            console.log("response data:", data);
            // const res = await axios.get(
            //   `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            // );
            // const data = await res.data;
            setPokemon20(...pokemon20, data);
            // setPokemon20((currentList) => [...currentList, data]);
          });
        };
        createPokemonObject(res.data.results);
      })
      .catch();
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div>
      <>
        <PokemonList pokemon={pokemon20} />
      </>
    </div>
  );
}

export default App;
