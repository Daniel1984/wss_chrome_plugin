import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import ChevronDown from 'react-icons/lib/md/keyboard-arrow-down';
import ChevronUp from 'react-icons/lib/md/keyboard-arrow-up';
import ScanIcon from 'react-icons/lib/md/location-searching';
import DisabledScanIcon from 'react-icons/lib/md/location-disabled';
import CloseIcon from 'react-icons/lib/md/close';
import ContentManagement from '../../containers/ContentManagement';
import ContentWrapper from '../../containers/ContentWrapper';
import styles from './styles';

export default class Navbar extends Component {
  static propTypes = {
    wsp: PropTypes.shape({
      disableSelection: PropTypes.func.isRequired,
      enableSelection: PropTypes.func.isRequired,
      showUi: PropTypes.func.isRequired,
      hideUi: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isActiveScan: false,
  };

  startSelectingElements = () => {
    this.setState({ isActiveScan: !this.state.isActiveScan }, () => {
      const { enableSelection, disableSelection } = this.props.wsp;

      if (this.state.isActiveScan) {
        enableSelection();
      } else {
        disableSelection();
      }
    });
  }

  removeWSP = () => {
    const { disableSelection, hideUi } = this.props.wsp;
    disableSelection();
    hideUi();
    chrome.runtime.sendMessage({ fn: 'hideWPS' });
  }

  render() {
    const { isActiveScan } = this.state;

    return (
      <Subscribe to={[ContentManagement, ContentWrapper]}>
        {(contentManager, contentWrapper) => (
          <div className="wsp" style={styles.root}>
            <div className="wsp" style={styles.title}>
              SCRAPR
            </div>
            <div className="wsp" style={styles.ctaContainer}>
              {isActiveScan && (
                <div className="wsp">
                  Select elements
                </div>
              )}
              <button
                className="wsp"
                style={styles.ctaBtn}
                onClick={this.startSelectingElements}
              >
                {isActiveScan && (
                  <DisabledScanIcon className="wsp" style={styles.selectionIcon} />
                )}
                {!isActiveScan && (
                  <ScanIcon className="wsp" style={styles.selectionIcon} />
                )}
              </button>

              <button
                className="wsp"
                style={styles.ctaBtn}
                onClick={() => contentWrapper.toggleContent()}
              >
                {contentWrapper.state.expanded && (
                  <ChevronUp className="wsp" style={styles.chevronIcon} />
                )}
                {!contentWrapper.state.expanded && (
                  <ChevronDown className="wsp" style={styles.chevronIcon} />
                )}
              </button>

              <button
                className="wsp"
                style={{
                  ...styles.ctaBtn,
                  backgroundColor: 'rgb(204, 0, 0)',
                  borderColor: 'rgb(204, 0, 0)',
                }}
                onClick={this.removeWSP}
              >
                <CloseIcon className="wsp" style={styles.selectionIcon} />
              </button>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}
