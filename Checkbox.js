import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../Utils/Icon';

import './Checkbox.scss';
const Checkbox = React.createClass({
  propTypes: {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
  },
  toggle(event) {
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          value: !this.props.value,
        },
      });
      event.preventDefault();
      event.stopPropagation();
    }
  },
  render() {
    const className = classNames('Checkbox', {
      'Checkbox--checked': this.props.value,
    });
    let label;

    if (this.props.label) {
      label = (
        <label className="Checkbox-label">
          {this.props.label}
        </label>
      );
    }

    return (
      <div className={className} onClick={this.toggle} onKeyPress={this.toggle} tabIndex="0">
        <div className="Checkbox-inner">
          <Icon name="checkmark" />
        </div>
        {label}
      </div>
    );
  },
});

export default Checkbox;
