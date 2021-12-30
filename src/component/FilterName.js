import React, { useContext } from "react";
import { PokemonContext } from "../App";

function FilterName() {
  const { filterName } = useContext(PokemonContext);

  return (
    <div className="sort-container">
      <label htmlFor="typeSort" className="recipe-edit_label">
        Name
      </label>
      <input
        type="text"
        name="typeSort"
        id="typeSort"
        onInput={(e) => filterName(e.target.value)}
      />
    </div>
  );
}

export default FilterName;
