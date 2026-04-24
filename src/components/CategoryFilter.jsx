import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../store/threadsSlice';
import styles from './CategoryFilter.module.css';

function CategoryFilter({ categories }) {
  const dispatch = useDispatch();
  const { categoryFilter } = useSelector((state) => state.threads);

  const handleSelect = (cat) => {
    if (cat === categoryFilter) {
      dispatch(setCategoryFilter(''));
    } else {
      dispatch(setCategoryFilter(cat));
    }
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Filter:</span>
      <div className={styles.chips}>
        <button
          className={`${styles.chip} ${categoryFilter === '' ? styles.active : ''}`}
          onClick={() => dispatch(setCategoryFilter(''))}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.chip} ${categoryFilter === cat ? styles.active : ''}`}
            onClick={() => handleSelect(cat)}
          >
            #{cat}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoryFilter;
