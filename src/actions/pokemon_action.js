import axios from "axios";

export const LIMIT_ARR = [5, 7, 10, 50, 100];
export const DEFAULT_LIMIT = 5;
export const DEFAULT_OFFSET = 0;

const URL = "https://pokeapi.co/api/v2/pokemon/";
function imgURL(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
export function prev(v) {
  return { type: "PREV", v };
}
export function next(v) {
  return { type: "NEXT", v };
}
export function setLimit(limit) {
  return { type: "SET_LIMIT", payload: limit };
}
export function setOffset(offset) {
  return { type: "SET_OFFSET", payload: offset };
}
export function setSearchName(name) {
  return { type: "SET_SEARCH_NAME", payload: name };
}
export function setTypesFilter(data) {
  return { type: "SET_TYPES", payload: data };
}
export function cleanTypesFilter(data) {
  return { type: "CLEAN_TYPES", payload: data };
}

export function error(text) {
  console.log(text);
  return { type: "ERROR", payload: text };
}

export function loading(isLoading) {
  return { type: "LOADING", payload: isLoading };
}

export function searchPokemons(name) {
  return { type: "FIND_BY_NAME", payload: name };
}
export function pokemonsSuccess(data) {
  return { type: "POKEMONS_SUCCESS", payload: data };
}
export function pokemonsCount(data) {
  return { type: "POKEMONS_COUNT", payload: data };
}
export function pokemonSuccess(data) {
  return {
    type: "POKEMON_FULLFIELD",
    payload: data.map(pokemon => ({
      id: pokemon.data.id,
      name: pokemon.data.name,
      img_src: imgURL(pokemon.data.id),
      types: pokemon.data.types,
      abilities: pokemon.data.abilities,
      base_experience: pokemon.data.base_experience,
      height: pokemon.data.height,
      weight: pokemon.data.weight
    }))
  };
}
export function pokemonAboutSuccess(data) {
  return { type: "POKEMON_FULL_INFO_SUCCESS", payload: data };
}
export function fetchPokemon(poks) {
  return dispatch => {
    dispatch(loading(true));
    const requests = poks.map(item => axios.get(item.url));
    axios
      .all(requests)
      .then(
        axios.spread((...data) => {
          dispatch(loading(false));
          console.log(data);
          return data;
        })
      )
      .catch(() => dispatch(error("error load pokemon")))
      .then(data => dispatch(pokemonSuccess(data)));
  };
}

export function fetchPokemons(limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) {
  return dispatch => {
    const params = {
      limit,
      offset
    };
    dispatch(loading(true));
    axios
      .get(URL, { params })
      .then(response => {
        dispatch(loading(false));
        dispatch(pokemonsSuccess(response.data));
        dispatch(pokemonsCount(response.data.count));
        dispatch(fetchPokemon(response.data.results));
      })
      .catch(() => dispatch(error("error load pokemons")));
  };
}
export function fetchPokemonAbout(id) {
  return dispatch => {
    axios
      .get(`URL${id}`)
      .then(response => {
        console.log(response);
        dispatch(pokemonAboutSuccess(response.data));
      })
      .catch(() => dispatch(error("error load about pokemon ")));
  };
}
