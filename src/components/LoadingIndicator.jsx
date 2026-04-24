import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadingIndicator.module.css';

function LoadingIndicator({ fullPage = false }) {
  if (fullPage) {
    return (
      <div className={styles.fullPage}>
        <div className={styles.spinner} />
        <p className={styles.text}>Memuat...</p>
      </div>
    );
  }

  return (
    <div className={styles.inline}>
      <div className={styles.spinner} />
    </div>
  );
}

LoadingIndicator.propTypes = {
  fullPage: PropTypes.bool,
};

export default LoadingIndicator;
