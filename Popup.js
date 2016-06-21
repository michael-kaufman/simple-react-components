import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import StaticContainer from '../Utils/StaticContainer';
import TransitionMixin from '../Utils/TransitionMixin';
import WindowListener from '../Utils/WindowListener';

import './Popup.scss';
const Popup = React.createClass({
  mixins: [TransitionMixin],
  propTypes: {
    arrow: PropTypes.bool,
    className: PropTypes.string,
    shown: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      arrow: true,
      placement: 'bottom',
      shown: false,
    };
  },
  render() {
    let content;
    const className = classNames('Popup', this.props.className, {
      'Popup--shown': this.props.shown,
      'Popup--leaving': this.state.leaveAnimation,
    });

    if (this.props.shown || this.state.leaveAnimation) {
      content = (
        <div className="Popup-staticContainer">
          {this.props.arrow ? <div className="Popup-arrow" /> : null}
          <div className="Popup-inner">
            {this.props.children}
          </div>
        </div>
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

export const PopupHandler = React.createClass({
  mixins: [new WindowListener('click', 'handleWindowClick', true)],
  propTypes: {
    handler: PropTypes.any,
    popup: PropTypes.any,
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
  handleWindowClick(event) {
    if (this.state.shown) {
      const thisNode = ReactDOM.findDOMNode(this);
      const target = event.target;
      if (thisNode !== target && !thisNode.contains(target)) {
        this.close();
      } else {
        setTimeout(() => this.close(), 60);
      }
    }
  },
  render() {
    const PopupComponent = this.props.popup || Popup;

    return (
      <div className="PopupHandler" onClick={this.open}>
        {this.props.handler}
        <PopupComponent shown={this.state.shown} {...this.props}>
          {this.props.children}
        </PopupComponent>
      </div>
    );
  },
});

export default Popup;
