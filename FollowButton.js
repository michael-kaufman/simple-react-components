import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import OddshotButton from './OddshotButton';
import FlatButton from './FlatButton';

import FollowSubjectMutation from './FollowSubjectMutation';
import FollowStreamerMutation from './FollowStreamerMutation';

import './FollowButton.scss';

const FollowButton = React.createClass({
  propTypes: {
    actor: PropTypes.object.isRequired,
    color: PropTypes.string,
    className: PropTypes.string,
    flat: PropTypes.bool,
    icon: PropTypes.string,
    item: PropTypes.object.isRequired,
  },
  contextTypes: {
    isLoggedIn: PropTypes.func.isRequired,
    setLoginRequired: PropTypes.func.isRequired,
  },
  getDefaultProps() {
    return {
      flat: false,
    };
  },
  onClick(event) {
    if (!this.context.isLoggedIn()) {
      this.context.setLoginRequired(true);
    } else {
      const actor = this.props.actor;
      const item = this.props.item;
      const Mutation = item.__typename === 'Subject' ? FollowSubjectMutation : FollowStreamerMutation;
      const mutationProps = {
        actor,
        item,
        follow: !item.isViewerFollowing,
      };

      Relay.Store.commitUpdate(new Mutation(mutationProps), {
        onFailure: this.onSubmitFailure,
        onSuccess: this.onSubmitSuccess,
      });
    }

    event.stopPropagation();
    event.preventDefault();
  },
  onSubmitSuccess() {
    // TODO
  },
  onSubmitFailure() {
    // TODO
  },
  render() {
    const Button = this.props.flat ? FlatButton : OddshotButton;
    const isFollowing = this.props.item.isViewerFollowing;
    const icon = this.props.icon || (isFollowing ? 'minus' : 'plus');
    const className = ['FollowButton', this.props.className];

    return (
      <Button color="lilac" icon={icon} {...this.props} className={className} onClick={this.onClick}>
        {this.props.children || (isFollowing ? 'Unfollow' : 'Follow')}
      </Button>
    );
  },
});

export default Relay.createContainer(FollowButton, {
  fragments: {
    actor: () => Relay.QL`
      fragment on User {
        ${FollowStreamerMutation.getFragment('actor')},
        ${FollowSubjectMutation.getFragment('actor')},
      }
    `,
    item: () => Relay.QL`
      fragment on Followed {
        ... on Node { # workaround for relay issue #782
          ... on Streamer {
            ${FollowStreamerMutation.getFragment('item')},
          },
          ... on Subject {
            ${FollowSubjectMutation.getFragment('item')},
          },
        },
        __typename,
        isViewerFollowing,
      }
    `,
  },
});
