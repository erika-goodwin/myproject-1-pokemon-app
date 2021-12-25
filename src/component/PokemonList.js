import React from "react";

export default function PokemonList(props) {
  const { id, name, image, type } = props;

  const style = `list-container-card ${type}`;

  // console.log("Pokemon List:", pokemon);

  return (
    <>
      {/* <div>{pokemon && pokemon.map((p) => <div key={p.id}>{p.name}</div>)}</div> */}
      <div className="list-container">
        <div className={style}>
          <div className="list-container-number">
            <p>#0{id}</p>
          </div>

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
