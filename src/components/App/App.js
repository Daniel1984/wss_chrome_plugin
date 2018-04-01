import React from 'react';
import PropTypes from 'prop-types';
import { Provider, Subscribe } from 'unstated';
import ContentManagement from '../../containers/ContentManagement';
import Navbar from '../Navbar/Navbar';
import EventAttacher from '../EventAttacher/EventAttacher';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import styles from './styles.js';

App.propTypes = {
  wsp: PropTypes.shape({
    disableSelection: PropTypes.func.isRequired,
    enableSelection: PropTypes.func.isRequired,
    showUi: PropTypes.func.isRequired,
    hideUi: PropTypes.func.isRequired,
  }).isRequired,
};

export default function App({ wsp }) {
  return (
    <Provider>
      <Subscribe to={[ContentManagement]}>
        {contentManager => (
          <div className="wsp" style={styles.root}>
            <EventAttacher attachEvents={contentManager.attachEventHandlers} />
            <Navbar wsp={wsp} />
            <ContentWrapper />
          </div>
        )}
      </Subscribe>
    </Provider>
  );
}
