import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemon } from "../actions/pokemon_action";
//import { Grid, Input, Button } from "semantic-ui-react";
//import Abilities from "../components/Abilities";

//const Tracks = ({ tracks, onAddTrack, onFindTrack, onGetTracks }) => {
class Pokemon extends Component {
  componentWillMount() {
    let { url } = this.props;
    // if (this.props.match && this.props.match.params)
    //   url = "http://pokeapi.co/api/v2/pokemon/" + this.props.match.params._id;
    console.log("thisgg.props", this.props);
    this.props.fetchPokemon(url);
  }

  render() {
    //return <div>{this.props.url}</div>;
    // if (this.props.pokemon.name && this.props.pokemon.name) {
    //   return (
    //     <div>
    //       <h2>{this.props.pokemon.name}</h2>
    //     </div>
    //   );
    // }
    return <div />;
  }
}

function mapStateToProps(state, prop) {
  console.log(prop.name);
  return {
    pokemons: state.pokemonStore.pokemon
    //loading: state.pokemonStore.loading,
    //errors: state.pokemonStore.errors
  };
}
export default connect(mapStateToProps, { fetchPokemons })(Pokemon);
// export default connect(mapStateToProps, dispatch => ({
//   onGetPakemon: url => {
//     dispatch(fetchPokemon(url));
//   }
// }))(Pokemon);
