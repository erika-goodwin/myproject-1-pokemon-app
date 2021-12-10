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
          pokemonData.map(async (pokemon) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const data = await res.json();
            // const res = await axios.get(
            //   `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            // );
            // const data = await res.data;
            setPokemon20((currentList) => [...currentList, data]);
          });
        };
        createPokemonObject(res.data.result);
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

//NEXT PAGE SYSTEM
// function App() {
//   console.log("App render:");
//   const [pokemon, setPokemon] = useState([]);
//   const [currentPageUrl, setCurrentPageUrl] = useState(
//     "https://pokeapi.co/api/v2/pokemon"
//   );

//   const [nextPageUrl, setNextPageUrl] = useState();
//   const [prevPageUrl, setPrevPageUrl] = useState();
//   const [loading, setLoading] = useState(true);

//   const getAllPokemons = () => {
//     // let cancel;
//     axios
//       .get(currentPageUrl)
//       // .get(currentPageUrl, {
//       //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
//       // })
//       .then((res) => {
//         setLoading(false);
//         setNextPageUrl(res.data.next);
//         setPrevPageUrl(res.data.previous);
//         setPokemon(res.data.results.map((p) => p.name));

//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     setLoading(true);

//     getAllPokemons();

//     // return () => cancel.cancel();
//   }, [currentPageUrl]);

//   function gotoNextPage() {
//     setCurrentPageUrl(nextPageUrl);
//   }
//   function gotoPrevPage() {
//     setCurrentPageUrl(prevPageUrl);
//   }

//   if (loading) return "Loading...";

//   return (
//     <>
//       <PokemonList pokemon={pokemon} />
//       <Pagination
//         gotoNextPage={gotoNextPage ? gotoNextPage : null}
//         gotoPrevPage={gotoPrevPage ? gotoPrevPage : null}
//       />
//     </>
//   );
// }

// export default App;
