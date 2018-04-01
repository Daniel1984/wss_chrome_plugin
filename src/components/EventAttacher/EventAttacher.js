import { Component } from 'react';
import PropTypes from 'prop-types';

export default class EventAttacher extends Component {
  static propTypes = {
    attachEvents: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.attachEvents();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}
