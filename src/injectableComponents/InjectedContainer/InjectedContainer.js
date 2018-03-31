import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChevronDown from 'react-icons/lib/md/keyboard-arrow-down';
import ChevronUp from 'react-icons/lib/md/keyboard-arrow-up';
import ScanIcon from 'react-icons/lib/md/location-searching';
import styles from './styles';

export default class InjectedContainer extends Component {
  static propTypes = {
    wsp: PropTypes.shape({
      disable: PropTypes.func.isRequired,
      enable: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    expanded: false,
  };

  componentDidMount() {
    console.log(this.props.wsp);
  }

  expandMenu = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  startSelectingElements = () => {
    const { remove, disable } = this.props.wsp;
    remove();
    disable();
  }

  render() {
    const { expanded } = this.state;

    return (
      <div style={styles.root}>
        <div style={styles.navbar}>
          <div style={styles.title}>
            SCRAPR
          </div>
          <div>
            <button style={styles.ctaBtn} onClick={this.startSelectingElements}>
              <ScanIcon style={styles.selectionIcon} />
            </button>
            <button style={styles.ctaBtn} onClick={this.expandMenu}>
              {expanded && <ChevronUp style={styles.chevronIcon} />}
              {!expanded && <ChevronDown style={styles.chevronIcon} />}
            </button>
          </div>
        </div>
        <div style={{
            ...styles.content,
            height: expanded ? '400px' : '0px',
          }}
        >
          <div style={styles.innerContent}>
            some conten
          </div>
        </div>
      </div>
    );
  }
}
