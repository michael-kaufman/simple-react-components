import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import WindowListener from '../Utils/WindowListener';
import StaticContainer from '../Utils/StaticContainer';
import TransitionMixin from '../Utils/TransitionMixin';

import './Dropdown.scss';
const Dropdown = React.createClass({
  mixins: [new WindowListener('click', 'handleWindowClick', true)],
  propTypes: {
    button: PropTypes.node,
    className: PropTypes.string,
  },
  getInitialState() {
    return {
      shown: false,
    };
  },
  open() {
    this.setState({ shown: true });
  },
  close() {
    this.setState({ shown: false });
  },
  handleWindowClick(e) {
    if (this.state.shown) {
      const thisNode = ReactDOM.findDOMNode(this);
      const target = e.target;
      if (thisNode !== target && !thisNode.contains(target)) {
        this.close();
      } else {
        setTimeout(() => this.close(), 60);
        // it sucks, but it works
        // without timeout we will have page reload
      }
    }
  },
  render() {
    return (
      <div className={classNames('Dropdown', { 'Dropdown--opened': this.state.shown }, this.props.className)}>
        <div className="Dropdown-button" onClick={this.open}>
          {this.props.button}
        </div>
        <DropdownMenu shown={this.state.shown}>
          {this.props.children}
        </DropdownMenu>
      </div>
    );
  },
});

const DropdownMenu = React.createClass({
  mixins: [TransitionMixin],
  render() {
    const className = classNames('Dropdown-menu', {
      'Dropdown-menu--shown': this.props.shown,
      'Dropdown-menu--leaving': this.state.leaveAnimation,
    });
    let content;

    if (this.props.shown || this.state.leaveAnimation) {
      content = (
        <ul>
          {this.props.children}
        </ul>
      );
    }

    return (
      <div className={className}>
        <StaticContainer shouldUpdate={!this.state.leaveAnimation}>
          {content}
        </StaticContainer>
      </div>
    );
  },
});

export default Dropdown;
