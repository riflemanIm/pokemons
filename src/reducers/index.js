import { combineReducers } from "redux";
import PokemonReducer from "./pokemon_reducer";
import SearchReducer from "./search_reducer";
const reducers = {
  pokemonStore: PokemonReducer,
  searchReducer: SearchReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
