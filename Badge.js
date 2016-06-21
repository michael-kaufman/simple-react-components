import React, { PropTypes } from 'react';
import './Badge.scss';
const Badge = React.createClass({
  propTypes: {
    value: PropTypes.number,
  },
  render() {
    return (
      <div className="Badge">
        {this.props.value}
      </div>
    );
  },
});

export default Badge;
