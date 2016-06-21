import React, { PropTypes } from 'react';
import './Spinner.scss';
const Spinner = React.createClass({
  propTypes: {
    className: PropTypes.string,
  },
  render() {
    return (
      <div className={`Spinner-circle ${(this.props.className || '')}`}>
        <div className="Spinner-circle1 Spinner-child"></div>
        <div className="Spinner-circle2 Spinner-child"></div>
        <div className="Spinner-circle3 Spinner-child"></div>
        <div className="Spinner-circle4 Spinner-child"></div>
        <div className="Spinner-circle5 Spinner-child"></div>
        <div className="Spinner-circle6 Spinner-child"></div>
        <div className="Spinner-circle7 Spinner-child"></div>
        <div className="Spinner-circle8 Spinner-child"></div>
        <div className="Spinner-circle9 Spinner-child"></div>
        <div className="Spinner-circle10 Spinner-child"></div>
        <div className="Spinner-circle11 Spinner-child"></div>
        <div className="Spinner-circle12 Spinner-child"></div>
      </div>
    );
  },
});

export default Spinner;
