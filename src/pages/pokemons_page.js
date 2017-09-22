import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Grid,
  Segment,
  Button,
  Input,
  Dropdown,
  Loader,
  Image
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import {
  fetchPokemons,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  LIMIT_ARR,
  setLimit,
  setOffset,
  setSearchName,
  setTypesFilter
} from "../actions/pokemon_action";

class Pokemons extends Component {
  state = {};
  componentWillMount() {
    this.props.dispatch(setLimit(DEFAULT_LIMIT));
    this.props.dispatch(setOffset(DEFAULT_OFFSET));
    this.props.dispatch(fetchPokemons());
  }
  onTypeAddition = (e, { value }) => {
    this.setState({
      types: [{ text: value, value }, ...this.state.types]
    });
  };

  onChangeTypes = (e, { value }) => {
    this.setState({ currTypeVals: value });
    this.props.dispatch(setTypesFilter(value));
  };

  componentWillReceiveProps(p) {
    const types = p.pokemonsList.reduce((result, item) => {
      item.types.forEach(({ type }) => {
        if (result.findIndex(x => x.value === type.name) === -1)
          result.push({
            key: type.name,
            value: type.name,
            text: type.name
          });
      });
      return result;
    }, []);

    this.setState({
      types
    });
  }

  searchByName(arr, name) {
    return arr.filter(item => {
      return item.name.includes(name.toLowerCase());
    });
  }

  searchByTypes(pokemons, typesNames) {
    let pokIds = [];
    pokemons.reduce((result, item) => {
      item.types.forEach(({ type }) => {
        if (
          typesNames.indexOf(type.name) !== -1 &&
          pokIds.findIndex(x => x === item.id) === -1
        ) {
          pokIds.push(item.id);
        }
      });
      return result;
    }, []);
    return pokemons.filter(item => pokIds.indexOf(item.id) !== -1);
  }
  onChangeLimit = (e, { value }) => {
    this.props.dispatch(setLimit(value));
    this.props.dispatch(fetchPokemons(value));
  };
  onSearch = e => {
    this.props.dispatch(setSearchName(e.target.value));
  };
  onNext = () => {
    const offset = this.props.offset + this.props.limit;
    this.props.dispatch(setOffset(offset));
    this.props.dispatch(fetchPokemons(this.props.limit, offset));
  };
  onPrev = () => {
    const offset = this.props.offset - this.props.limit;
    this.props.dispatch(setOffset(offset));
    this.props.dispatch(fetchPokemons(this.props.limit, offset));
  };
  render() {
    let {
      loading,
      pokemonsCount,
      limit,
      offset,
      pokemonsList,
      valNameFilter,
      valsTypesFilter
    } = this.props;

    if (valNameFilter.trim())
      pokemonsList = this.searchByName(pokemonsList, valNameFilter);
    if (valsTypesFilter.length)
      pokemonsList = this.searchByTypes(pokemonsList, valsTypesFilter);

    const limit_ops = LIMIT_ARR.reduce(function(result, item, index) {
      result.push({ key: index, value: item, text: "Rows: " + item });
      return result;
    }, []);

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Input
              icon="search"
              onChange={this.onSearch}
              placeholder="Search.."
            />&nbsp; &nbsp;
            <Dropdown
              options={this.state.types}
              placeholder="Choose Types"
              multiple
              value={valsTypesFilter}
              onAddItem={this.onTypeAddition}
              onChange={this.onChangeTypes}
            />&nbsp; &nbsp;
            <Dropdown
              options={limit_ops}
              onChange={this.onChangeLimit}
              value={limit}
              placeholder="Choose Page"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="right">
            Total Pokemons: {pokemonsCount} &nbsp; &nbsp; &nbsp; Pages:{" "}
            {Math.floor(pokemonsCount / limit)} &nbsp; &nbsp; &nbsp; Page:{" "}
            {offset >= limit ? Math.floor(offset / limit + 1) : 1} &nbsp; &nbsp;
            &nbsp;
            <Button disabled={!offset} onClick={this.onPrev}>
              prev
            </Button>{" "}
            &nbsp; &nbsp;
            <Button disabled={pokemonsCount < offset} onClick={this.onNext}>
              next
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Grid columns="equal">
              {!loading && pokemonsList.length ? (
                pokemonsList.map((pokemon, i) => (
                  <Grid.Row key={i}>
                    <Grid.Column textAlign="center">
                      <Segment>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={3}>
                              <Image src={pokemon.img_src} alt={pokemon.name} />
                              {pokemon.name}
                            </Grid.Column>
                            <Grid.Column width={13}>
                              <Grid>
                                <Grid.Row>
                                  <Grid.Column width={2}>types</Grid.Column>
                                  <Grid.Column width={2}>
                                    {pokemon.types &&
                                      pokemon.types.map((item, i) => (
                                        <span key={i}>{item.type.name} </span>
                                      ))}
                                  </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                  <Grid.Column width={2}>abilities</Grid.Column>
                                  <Grid.Column width={2}>
                                    {pokemon.abilities &&
                                      pokemon.abilities.map((item, i) => (
                                        <span key={i}>
                                          {item.ability.name}{" "}
                                        </span>
                                      ))}
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                  <Grid.Column width={2}>weight</Grid.Column>
                                  <Grid.Column width={2}>
                                    {pokemon.weight}
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                  <Grid.Column width={2}>height</Grid.Column>
                                  <Grid.Column width={2}>
                                    {pokemon.height}
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                  <Grid.Column width={2}>
                                    experience
                                  </Grid.Column>
                                  <Grid.Column width={2}>
                                    {pokemon.base_experience}
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                ))
              ) : (
                <Loader active inline="centered" />
              )}
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
Pokemons.propTypes = {
  //limit: PropTypes.number.isRequired,
  //offset: PropTypes.number.isRequired,
  //pokemonsCount: PropTypes.number.pokemonsCount,
  pokemonsList: PropTypes.array.isRequired,
  valNameFilter: PropTypes.string.isRequired,
  valsTypesFilter: PropTypes.array.isRequired
};
export default connect(state => ({
  loading: state.loading,
  pokemonsCount: state.pokemonsCount,
  limit: state.Limit,
  offset: state.Offset,
  pokemonsList: state.pokemonsList,
  valNameFilter: state.nameFilter,
  valsTypesFilter: state.typesFilter
}))(Pokemons);
