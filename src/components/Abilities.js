import React from "react";

const Abilities = props => {
  const abilities = props.data.map(ability => {
    return <li key={ability.url}>{ability.name}</li>;
  });

  return (
    <div>
      <ul>{abilities}</ul>
    </div>
  );
};

export default Abilities;
