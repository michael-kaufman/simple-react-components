import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../Utils/Icon';
import SmartButton from '../Utils/SmartButton';

import './FlatButton.scss';
const FlatButton = React.createClass({
  propTypes: {
    color: PropTypes.oneOf(['brand', 'lilac', 'transparent']),
    icon: PropTypes.string,
  },
  render() {
    const { color, children, ...props } = this.props;
    const className = classNames('FlatButton', {
      [`FlatButton--${color}`]: color,
    }, this.props.className);

    return (
      <SmartButton {...props} className={className}>
        {this.props.icon ? <Icon name={this.props.icon} /> : null}
        {children}
      </SmartButton>
    );
  },
});

export default FlatButton;
