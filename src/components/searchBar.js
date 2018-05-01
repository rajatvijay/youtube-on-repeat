import React from "react";
import TextField from "material-ui/TextField";
import { css } from "emotion";

const SearchBarClass = css`
  width: 720px !important;
  margin: auto;
  display: block !important;
  margin-bottom: 8px;
  border-radius: 3px;
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "" };
  }

  handleOnChange = event => {
    const { value } = event.target;
    this.setState({
      searchText: value
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.onSearchInitiated(this.state.searchText);
    }
  };

  render() {
    const { searchText } = this.state;
    const searchHintText = "Search for a video...";

    return (
      <TextField
        className={SearchBarClass}
        disabled={this.props.disabled}
        onKeyPress={this.handleKeyPress}
        hintText={searchHintText}
        onChange={this.handleOnChange}
        value={searchText}
      />
    );
  }
}

export default SearchBar;
