import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

SelectionsList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape),
};

SelectionsList.defaultProps = {
  elements: [],
};

export default function SelectionsList({ elements }) {
  return (
    <div style={styles.root}>
      {!!elements.length && elements.map(element => (
        <div>123</div>
      ))}

      {!elements.length && (
        <div>no elements selected</div>
      )}
    </div>
  );
}
