import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllThreads } from '../store/threadsSlice';
import { asyncGetAllUsers } from '../store/usersSlice';
import ThreadCard from '../components/ThreadCard';
import CategoryFilter from '../components/CategoryFilter';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './HomePage.module.css';

function HomePage() {
  const dispatch = useDispatch();
  const { threads, loading, categoryFilter } = useSelector((state) => state.threads);
  const { users } = useSelector((state) => state.users);
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncGetAllThreads());
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  const usersMap = useMemo(() => {
    const map = {};
    users.forEach((u) => { map[u.id] = u; });
    return map;
  }, [users]);

  const categories = useMemo(() => {
    const cats = new Set(threads.map((t) => t.category).filter(Boolean));
    return [...cats];
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!categoryFilter) return threads;
    return threads.filter((t) => t.category === categoryFilter);
  }, [threads, categoryFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Selamat datang di <span className={styles.brand}>Fundisc</span>
        </h1>
        <p className={styles.heroSub}>
          Platform diskusi terbuka untuk berbagi ide, pengalaman, dan pengetahuan.
        </p>
        {!authUser && (
          <div className={styles.heroActions}>
            <Link to="/register" className={styles.btnPrimary}>Mulai Berdiskusi</Link>
            <Link to="/login" className={styles.btnSecondary}>Sudah punya akun?</Link>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Thread Terbaru</h2>
          {authUser && (
            <Link to="/threads/new" className={styles.btnCreate}>+ Buat Thread</Link>
          )}
        </div>

        {categories.length > 0 && <CategoryFilter categories={categories} />}

        {loading && <LoadingIndicator fullPage />}

        {!loading && filteredThreads.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🗂</span>
            <p>Belum ada thread{categoryFilter ? ` dengan kategori #${categoryFilter}` : ''}.</p>
          </div>
        )}

        <div className={styles.threadList}>
          {filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              user={usersMap[thread.ownerId]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
