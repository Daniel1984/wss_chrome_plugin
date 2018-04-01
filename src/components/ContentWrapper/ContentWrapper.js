import React from 'react';
import { Subscribe } from 'unstated';
import ContentManagement from '../../containers/ContentManagement';
import ContentWrapperContainer from '../../containers/ContentWrapper';
import styles from './styles';

export default function ContentWrapper() {
  return (
    <Subscribe to={[ContentManagement, ContentWrapperContainer]}>
      {(contentManager, contentWrapper) => (
        <div
          className="wsp"
          style={{
            ...styles.root,
            height: contentWrapper.state.expanded ? '400px' : '0px',
          }}
        >
          <div className="wsp" style={styles.innerContent}>
            {!!contentManager.state.selectedElements.length && (
              contentManager.state.selectedElements.map((el, i) => (
                <div className="wsp" key={i.toString()}>
                  {el.path}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Subscribe>
  );
}
