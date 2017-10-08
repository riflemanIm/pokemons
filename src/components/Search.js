import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { setSearchName } from "../actions/pokemon_action";

class Search extends Component {
  onSearch = e => {
    this.props.dispatch(setSearchName(e.target.value));
  };

  render() {
    return (
      <Input icon="search" onChange={this.onSearch} placeholder="Search.." />
    );
  }
}
export default connect()(Search);
