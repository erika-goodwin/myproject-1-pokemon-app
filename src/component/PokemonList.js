import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { PokemonContext } from "../App";

export default function PokemonList(props) {
  const { id, name, image, type } = props;

  const style = `list-container-card ${type}`;

  const { handleFavoritePokemon } = useContext(PokemonContext);

  return (
    <>
      {/* <div>{pokemon && pokemon.map((p) => <div key={p.id}>{p.name}</div>)}</div> */}
      <div className="list-container">
        <div className={style}>
          <div className="list-container-number">
            <p>#0{id}</p>
          </div>
          <AiOutlineHeart onClick={() => handleFavoritePokemon({ id })} />
          <AiFillHeart />
          <img src={image} alt={name}></img>

          <div className="list-container-detail-wrapper">
            <h3>{name}</h3>
            <p>Type: {type}</p>
          </div>
        </div>
      </div>
    </>
  );
}
