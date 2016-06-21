import React from 'react';

import OddshotInput from '../Components/OddshotInput';
import Icon from '../Utils/Icon';

import './SearchInput.scss';
const SearchInput = React.createClass({
  render() {
    return (
      <div className="SearchInput">
        <Icon name="search" />
        <OddshotInput type="text" placeholder={this.props.placeholder} />
      </div>
    );
  },
});

export default SearchInput;
