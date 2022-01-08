import React, { useState, useEffect } from "react";
import PokemonList from "./component/PokemonList";
import axios from "axios";

import "./css/app.css";
import FilterType from "./component/FilterType";
import FilterName from "./component/FilterName";

export const PokemonContext = React.createContext();

function App() {
  // console.log("App render:");
  const [pokemon20, setPokemon20] = useState([]);
  const [sortedTypePokemon, setSortedTypePokemon] = useState([]);
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=100"
  );

  // const [pokemonArray, setPokemonArray] = useState(
  //   Array.from({ length: 1118 }, (_, i) => i + 1)
  // );

  const getAllPokemons = () => {
    axios
      .get(loadMore)
      .then((res) => {
        setLoadMore(res.data.next);
        const createPokemonObject = (pokemonData) => {
          // console.log("PokoeonData: ", pokemonData);
          const allPokemon = Promise.all(
            pokemonData.map(async (pokemon) => {
              console.log("#32 pokemonData: ", pokemon);
              let pokemonJSON = localStorage.getItem(`POKEMON_${pokemon.name}`);
              if (!pokemonJSON) {
                const response = await axios.get(
                  `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                );

                pokemonJSON = response.data;
                // const pokemonJSON = response.data;
                localStorage.setItem(
                  `POKEMON_${pokemon.name}`,
                  JSON.stringify(pokemonJSON)
                );
              }

              setPokemon20((currentList) => [...currentList, pokemonJSON]);
              return pokemonJSON;
            })
          ).then((allPokemon) => console.log("all pokemon: ", allPokemon));
        };

        createPokemonObject(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const getAllPokemons = () => {
  //   axios
  //     .get(loadMore)
  //     .then((res) => {
  //       setLoadMore(res.data.next);
  //       const createPokemonObject = (pokemonData) => {
  //         // console.log("PokoeonData: ", pokemonData);
  //         pokemonData.map(async (pokemon) => {
  //           const response = await axios.get(
  //             `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
  //           );
  //           // console.log("response data:", response.data);

  //           const dataFromAPI = response.data;
  //           // console.log("data from API: ", dataFromAPI);
  //           setPokemon20((currentList) => [...currentList, dataFromAPI]);
  //           setPokemonArray((currentList) => [...currentList, dataFromAPI]);
  //         });
  //       };
  //       createPokemonObject(res.data.results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    getAllPokemons();

    // console.log(pokemonArray);
  }, []);

  useEffect(() => {
    // console.log("pokemon 20 ", pokemon20);
    filterType("");

    //set context input value and use it as INPUT
  }, [pokemon20]);

  const filterType = (type) => {
    const allData = pokemon20;
    const selectedType = type;
    // console.log("all data of filterType: ", allData);
    const filteredData = allData.filter((p) =>
      p.types[0].type.name.startsWith(selectedType)
    );

    setSortedTypePokemon(() => [...filteredData]);
  };

  const filterName = (name) => {
    const allData = pokemon20;
    const inputName = name;
    console.log("input name: ", inputName);
    const filteredData = allData.filter((p) => p.name.startsWith(inputName));

    setSortedTypePokemon(() => [...filteredData]);
  };

  const handleFavoritePokemon = (clickedId) => {
    console.log("clicked Id: ", clickedId.id); //1
    const allData = pokemon20;
    console.log("all data of handleFav: ", allData);

    // array of favorite
    const array = favoritePokemon;
    console.log("pokemon fav array: ", array);

    // addArray for adding or not
    let addArray = true;
    console.log("addArray: ", addArray);

    //check if it is favorite item or not

    array.length !== 0 &&
      array.map((ele, index) => {
        // console.log("ele.id === clickedId.id:", ele.id === clickedId.id);
        if (ele.id === clickedId.id) {
          array.splice(index, 1);
          addArray = false;
        }
      });

    //get the object of the selected Id

    // setArray if addArray is true
    console.log("addArray after filter: ", addArray);
    console.log("allData.id: ", allData[0].id);

    //somthing is not going well. probably object array related.

    // const addingPokemon = allData.filter((p) => p.id === clickedId);
    // console.log("adding pokemon: ", addingPokemon);

    // addArray && array.push(addingPokemon);
    // setFavoritePokemon([...array]);
    // console.log("pokemon fav array after setState: ", array);
  };

  const PokemonContextValue = {
    filterType,
    filterName,
    handleFavoritePokemon,
  };

  return (
    <>
      <PokemonContext.Provider value={PokemonContextValue}>
        <div className="appContainer">
          <h1>Pokemon App</h1>
          <h3>Filter by</h3>
          <FilterType />
          <FilterName />
          <div className="appContainer-pokeContainer">
            <div className="appContainer-pokeContainer-indi">
              {sortedTypePokemon
                .sort((a, b) => a.id - b.id)
                .map((pokemon, index) => (
                  <PokemonList
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other.dream_world.front_default}
                    type={pokemon.types[0].type.name}
                    index={index}
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
