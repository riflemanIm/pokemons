import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemons } from "./actions/pokemon_action";
import Pokemons from "./pages/pokemons_page";
import { Container } from "semantic-ui-react";
class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchPokemons());
  }
  render() {
    return (
      <Container>
        <Pokemons />
      </Container>
    );
  }
}
export default connect()(App);
