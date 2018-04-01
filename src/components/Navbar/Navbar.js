import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import ChevronDown from 'react-icons/lib/md/keyboard-arrow-down';
import ChevronUp from 'react-icons/lib/md/keyboard-arrow-up';
import ScanIcon from 'react-icons/lib/md/location-searching';
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
    scanEnabled: false,
  };

  startSelectingElements = () => {
    this.setState({ scanEnabled: !this.state.scanEnabled }, () => {
      const { enableSelection, disableSelection } = this.props.wsp;

      if (this.state.scanEnabled) {
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
    return (
      <Subscribe to={[ContentManagement, ContentWrapper]}>
        {(contentManager, contentWrapper) => (
          <div className="wsp" style={styles.root}>
            <div className="wsp" style={styles.title}>
              SCRAPR
            </div>
            <div className="wsp">
              <button
                className="wsp"
                style={styles.ctaBtn}
                onClick={this.startSelectingElements}
              >
                <ScanIcon className="wsp" style={styles.selectionIcon} />
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
                style={styles.ctaBtn}
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
