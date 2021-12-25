import React, { useState, useEffect } from "react";
import PokemonList from "./component/PokemonList";
import axios from "axios";

import "./css/app.css";
import Sort from "./component/Sort";

export const PokemonContext = React.createContext();

function App() {
  console.log("App render:");
  const [pokemon20, setPokemon20] = useState([]);
  const [sortedTypePokemon, setSortedTypePokemon] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=40"
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

            const dataFromAPI = response.data;
            // console.log("data from API: ", dataFromAPI);
            setPokemon20((currentList) => [...currentList, dataFromAPI]);
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
  }, []);

  useEffect(() => {
    // console.log("updated pokemon20: ", pokemon20);
  }, [pokemon20]);

  const sortType = (type) => {
    // current data
    const allData = pokemon20;
    // console.log("allData:", allData);

    //the picked type
    const selectedType = type;
    console.log("e.target.value:", type);

    //select the same type from current data
    const sortedData = allData.filter(
      (p) => p.types[0].type.name === selectedType
    );
    console.log("sorted data: ", sortedData);
    // console.log("sorted data[0]: ", sortedData[0]);

    //make sort data
    sortedData.length &&
      setSortedTypePokemon((currentList) => [...currentList, sortedData]);

    console.log("seetSortedTypePokemon: ", sortedTypePokemon);
  };

  const PokemonContextValue = {
    sortType,
  };
  return (
    <>
      <PokemonContext.Provider value={PokemonContextValue}>
        <div className="appContainer">
          <h1>Pokemon App</h1>
          <Sort data={pokemon20} />
          <div className="appContainer-pokeContainer">
            <div className="appContainer-pokeContainer-indi">
              {!sortedTypePokemon ? "<h1>sorted</h1>" : "<h1>pokemon20</h1>"}
              {pokemon20
                .sort((a, b) => a.id - b.id)
                .map((pokemon, index) => (
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
      </PokemonContext.Provider>
    </>
  );
}

export default App;
