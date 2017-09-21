import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Segment, Button, Input, Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import {
  fetchPokemons,
  LIMIT_ARR,
  setLimit,
  setSearchName,
  setTypesFilter,
  cleanTypesFilter
} from "../actions/pokemon_action";

const types = [
  { key: "English", text: "English", value: "English" },
  { key: "French", text: "French", value: "French" },
  { key: "Spanish", text: "Spanish", value: "Spanish" },
  { key: "German", text: "German", value: "German" },
  { key: "Chinese", text: "Chinese", value: "Chinese" }
];

class Pokemons extends Component {
  state = { types };
  onTypeAddition = (e, { value }) => {
    this.setState({
      types: [{ text: value, value }, ...this.state.types]
    });
  };

  handleChange = (e, { value }) => this.setState({ currentValues: value });

  // onTagClick(tag) {
  //   this.props.dispatch(setTypesFilter(tag));
  // }

  componentWillReceiveProps(nextProps) {
    // const typesArr = nextProps.pokemonsList.reduce((prev, next) => {
    //   next.types.forEach(({ type }) => {
    //     prev.push(type.name);
    //   });
    //   return prev.filter((item, index, arr) => arr.indexOf(item) === index);
    // }, []);

    const types = nextProps.pokemonsList.reduce(function(result, item, index) {
      item.types.forEach(({ type }) => {
        if (result.findIndex(x => x.value == type.name) === -1)
          result.push({
            key: index,
            value: type.name,
            text: type.name
          });
      });
      return result;
    }, []);

    console.log(types);
    this.setState({
      types
    });
  }

  // componentDidUpdate() {
  //   const tagsDifference = this.props.tagsFilter.filter(
  //     tag => this.state.tags.indexOf(tag) === -1
  //   );
  //   if (tagsDifference.length) {
  //     this.props.dispatch(cleanTypesFilter(this.state.tags));
  //   }
  // }
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
    const { currentValues } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Input
              icon="search"
              onChange={this.onSearch}
              placeholder="Search.."
            />

            <Dropdown
              options={this.state.types}
              placeholder="Choose Types"
              selection
              multiple
              allowAdditions
              value={currentValues}
              onAddItem={this.onTypeAddition}
              onChange={this.handleChange}
            />
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
  valNameFilter: PropTypes.string.isRequired,
  tagsFilter: PropTypes.array.isRequired
};
export default connect(state => ({
  pokemonsList: state.pokemonsList,
  valNameFilter: state.nameFilter,
  tagsFilter: state.tagsFilter
}))(Pokemons);
