import React, { Component } from "react";
import { connect } from "react-redux";
import Pokemons from "./pages/pokemons_page";
import { Container } from "semantic-ui-react";
class App extends Component {
  render() {
    return (
      <Container>
        <Pokemons />
      </Container>
    );
  }
}
export default connect()(App);
