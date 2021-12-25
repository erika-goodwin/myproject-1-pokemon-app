import React, { useContext } from "react";
import { PokemonContext } from "../App";

function Sort({ data }) {
  const {sortType} = useContext(PokemonContext);

  return (
    <div className="sort-container">
      <h3>sort by</h3>
      <label htmlFor="typeSort" className="recipe-edit_label">
        type
      </label>
      <input
        type="text"
        name="typeSort"
        id="typeSort"
        className=""
        // value={recipe.servings}
        // onInput={(e) =>
        //   handleChange({ servings: parseInt(e.target.value) || "" })
        // }
        onInput={(e) => sortType(e.target.value)}
      />
    </div>
  );
}

export default Sort;
