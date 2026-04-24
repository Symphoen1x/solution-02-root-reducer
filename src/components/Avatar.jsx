import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.css';

function Avatar({ src, name, size = 40 }) {
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  if (src && src !== '') {
    return (
      <img
        src={src}
        alt={name}
        className={styles.avatar}
        style={{ width: size, height: size }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  }

  return (
    <div
      className={styles.fallback}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
};

export default Avatar;
