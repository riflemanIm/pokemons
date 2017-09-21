import React from "react";

const Types = props => {
  const types = props.data.map(type => {
    return <li key={type.url}>{type.name}</li>;
  });

  return (
    <div>
      <ul>{types}</ul>
    </div>
  );
};

export default Types;
