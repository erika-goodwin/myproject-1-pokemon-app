import React, { useState, useEffect } from "react";
import PokemonList from "./component/PokemonList";
import axios from "axios";

import "./css/app.css";

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
          // console.log("PokoeonData: ", pokemonData);
          pokemonData.map(async (pokemon) => {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            // console.log("response data:", response.data);

            setPokemon20((currentList) => [...currentList, response.data]);
          });
        };
        createPokemonObject(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPokemons();
    console.log("pokemon20: ", pokemon20); //1->2
  }, []);

  return (
    <>
      <div className="appContainer">
        <h1>Pokemon App</h1>
        <div className="appContainer-pokeContainer">
          <div className="appContainer-pokeContainer-indi">
            {pokemon20.map((pokemon, index) => (
              <PokemonList
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                // key={index}
                key={pokemon.id}
              ></PokemonList>
            ))}
          </div>
          <div className="appContainer-pokeContainer-btn">
            <button className="btn btn-more" onClick={() => getAllPokemons()}>
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
