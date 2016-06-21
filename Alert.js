import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../Utils/Icon';
import './Alert.scss';

const iconTypes = {
  success: 'checkmark2',
  info: 'info',
  warning: 'warning',
  error: 'warning',
};

const Alert = React.createClass({
  propTypes: {
    className: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    inline: PropTypes.bool,
    label: PropTypes.string,
  },
  getDefaultProps() {
    return {
      type: 'info',
      align: 'left',
      icon: true,
      inline: false,
      label: null,
    };
  },
  render() {
    const className = classNames(
      'Alert',
      this.props.className,
      `Alert--${this.props.type}`,
      `Alert--${this.props.align}Align`,
      {
        'Alert--inline': this.props.inline,
      }
    );
    let icon;
    let label;

    if (this.props.icon) {
      if (typeof this.props.icon === 'string') {
        icon = <Icon name={this.props.icon} />;
      } else {
        icon = <Icon name={iconTypes[this.props.type]} />;
      }
    }

    if (this.props.label) {
      label = (
        <div className="Alert-label">
          {this.props.label}
        </div>
      );
    }

    return (
      <div className={className}>
        {icon ?
          <div className="Alert-iconWrapper">
            {icon}
          </div>
        : null}
        {label}
        <div className="Alert-message">
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Alert;
