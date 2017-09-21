import { LIMIT_ARR } from "../actions/pokemon_action";

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

export function loaders(state = { pokemonsLoading: false }, action) {
  switch (action.type) {
    case "LOAD_POKEMONS":
      return {
        ...state,
        pokemonsLoading: action.isLoading
      };
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
      const tag = action.payload;
      let tagsFilter = [...state];
      if (tagsFilter.indexOf(tag) === -1) {
        tagsFilter.push(tag);
      } else {
        tagsFilter.splice(tagsFilter.indexOf(tag), 1);
      }
      return tagsFilter;
    case "CLEAN_TYPES":
      return [...state].filter(tag => action.payload.indexOf(tag) !== -1);
    default:
      return state;
  }
}
