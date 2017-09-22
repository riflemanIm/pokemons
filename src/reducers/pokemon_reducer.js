export function onPrev(state = [], action) {
  switch (action.type) {
    case "PREV":
      return action.payload - 1;
    default:
      return state;
  }
}
export function onNext(state = [], action) {
  switch (action.type) {
    case "NEXT":
      return action.payload + 1;
    default:
      return state;
  }
}

export function pokemonsCount(state = [], action) {
  switch (action.type) {
    case "POKEMONS_COUNT":
      return action.payload;
    default:
      return state;
  }
}
export function pokemonsList(state = [], action) {
  switch (action.type) {
    case "POKEMON_FULLFIELD":
      return action.payload;

    default:
      return state;
  }
}

export function pokemonInfo(state = {}, action) {
  switch (action.type) {
    case "POKEMON_FULL_INFO_SUCCESS":
      return action.data;
    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case "LOADING":
      return action.payload;
    default:
      return state;
  }
}
export function Limit(state = "", action) {
  switch (action.type) {
    case "SET_LIMIT":
      return action.payload;
    default:
      return state;
  }
}
export function Offset(state = "", action) {
  switch (action.type) {
    case "SET_OFFSET":
      return action.payload;
    default:
      return state;
  }
}
export function nameFilter(state = "", action) {
  switch (action.type) {
    case "SET_SEARCH_NAME":
      return action.payload;
    default:
      return state;
  }
}

export function typesFilter(state = [], action) {
  switch (action.type) {
    case "SET_TYPES":
      return action.payload;
    default:
      return state;
  }
}
