import React, { useContext } from "react";
import { PokemonContext } from "../App";

function FilterType() {
  const { filterType } = useContext(PokemonContext);

  return (
    <div className="sort-container">
      <label htmlFor="typeSort" className="recipe-edit_label">
        Type
      </label>
      <input
        type="text"
        name="typeSort"
        id="typeSort"
        onInput={(e) => filterType(e.target.value)}
      />
    </div>
  );
}

export default FilterType;
