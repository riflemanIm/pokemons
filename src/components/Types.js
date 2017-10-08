import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { setTypesFilter } from "../actions/pokemon_action";

class Types extends Component {
  state = {};
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

  render() {
    const { valsTypesFilter } = this.props;

    return (
      <Dropdown
        options={this.state.types}
        placeholder="Choose Types"
        multiple
        value={valsTypesFilter}
        onAddItem={this.onTypeAddition}
        onChange={this.onChangeTypes}
      />
    );
  }
}
export default connect(state => ({
  pokemonsList: state.pokemonsList,
  valsTypesFilter: state.typesFilter
}))(Types);
