import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectionsList from '../SelectionsList/SelectionsList';
import CloseIcon from 'react-icons/lib/md/close';
import styles from './styles';

export default class InjectedContainer extends Component {
  static propTypes = {
    wss: PropTypes.shape({
      pause: PropTypes.func.isRequired,
      resume: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    console.log(this.props.wss);
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <CloseIcon style={styles.closeIcon} />
        </div>
        <div style={styles.content}>
          <SelectionsList />
        </div>
      </div>
    );
  }
}
