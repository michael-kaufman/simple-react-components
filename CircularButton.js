import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../Utils/Icon';
import SmartButton from '../Utils/SmartButton';

import './CircularButton.scss';
const CircularButton = React.createClass({
  propTypes: {
    icon: PropTypes.string,
    active: PropTypes.bool,
  },
  render() {
    const { icon, className, active, ...props } = this.props;
    let classes = classNames('CircularButton', className, { 'CircularButton--active': active });

    return (
      <SmartButton { ...props } className={ classes }>
        <Icon name={icon} />
      </SmartButton>
    );
  },
});

export default CircularButton;
