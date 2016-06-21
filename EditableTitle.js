import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './EditableTitle.scss';
const EditableTitle = React.createClass({
  propTypes: {
    tag: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onInputChange: PropTypes.func,
    value: PropTypes.string,
  },
  getDefaultProps() {
    return { tag: 'label' };
  },
  getInitialState() {
    return { editing: false };
  },
  handleEdit(e) {
    this.setState({
      editing: true,
      value: this.props.value,
      oldValue: this.props.value,
    });
    ReactDOM.findDOMNode(this.refs.input).focus();
  },
  handleChange(e) {
    this.props.onInputChange(e);
  },
  handleBlur() {
    this.replaceState(this.getInitialState());
  },
  render() {
    const Tag = this.props.tag;
    if (this.state.editing) {
      return (
        <Tag className={`EditableTitle EditableTitle--editing ${(this.props.className || '')}`}>
          <input
            className="EditableTitle-input"
            key="input"
            ref="input"
            value={this.props.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            maxLength={100} />
        </Tag>
      );
    } else {
      return (
        <Tag className={`EditableTitle EditableTitle--set ${(this.props.className || '')}`} onClick={this.handleEdit}>
          <input
            className="EditableTitle-input"
            key="input"
            ref="input"
            maxLength={100} />
          {this.props.children}
          <button type="button" className="EditableTitle-editButton" onClick={this.handleEdit}>
            Edit
          </button>
        </Tag>
      );
    }
  },
});

export default EditableTitle;
