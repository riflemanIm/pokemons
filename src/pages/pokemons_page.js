import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Segment, Button, Input, Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import {
  fetchPokemons,
  LIMIT_ARR,
  setLimit,
  setSearchName
} from "../actions/pokemon_action";
class Pokemons extends Component {
  searchByName(arr, name) {
    return name.trim()
      ? arr.filter(item => {
          return item.name.includes(name.toLowerCase());
        })
      : arr;
  }

  onChangeLimit = (e, { value }) => {
    const limit = value;
    console.log(value);
    this.props.dispatch(setLimit(limit));
    this.props.dispatch(fetchPokemons(limit));
  };
  onSearch = e => {
    this.props.dispatch(setSearchName(e.target.value));
  };
  render() {
    let { pokemonsList, valNameFilter } = this.props;
    pokemonsList = this.searchByName(pokemonsList, valNameFilter);
    console.log(this.props.pokemonsList);

    const limit_ops = LIMIT_ARR.reduce(function(result, item, index) {
      result.push({ key: index, value: item, text: item });
      return result;
    }, []);

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Input
              icon="search"
              onChange={this.onSearch}
              placeholder="search.."
            />

            <Button.Group basic>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </Button.Group>
            <Dropdown onChange={this.onChangeLimit} options={limit_ops} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Grid columns="equal">
              {pokemonsList.map(pokemon => (
                <Grid.Row>
                  <Grid.Column>
                    <Segment>{pokemon.name}</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      {pokemon.types &&
                        pokemon.types.map(item => (
                          <span>{item.type.name} </span>
                        ))}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      {pokemon.abilities &&
                        pokemon.abilities.map(item => (
                          <span>{item.ability.name} </span>
                        ))}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>{pokemon.weight}</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>{pokemon.height}</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>{pokemon.base_experience}</Segment>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
Pokemons.propTypes = {
  pokemonsList: PropTypes.array.isRequired,
  valNameFilter: PropTypes.string.isRequired
};
export default connect(state => ({
  pokemonsList: state.pokemonsList,
  valNameFilter: state.nameFilter
}))(Pokemons);
