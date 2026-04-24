import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboard } from '../store/leaderboardSlice';
import Avatar from '../components/Avatar';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './LeaderboardPage.module.css';

const MEDAL = ['🥇', '🥈', '🥉'];

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboard, loading, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🏆 Leaderboard</h1>
        <p className={styles.subtitle}>Pengguna paling aktif di komunitas Fundisc</p>
      </div>

      {loading && <LoadingIndicator fullPage />}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && leaderboard.length > 0 && (
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span className={styles.col}>Peringkat</span>
            <span className={`${styles.col} ${styles.colUser}`}>Pengguna</span>
            <span className={`${styles.col} ${styles.colScore}`}>Skor</span>
          </div>

          <div className={styles.tableBody}>
            {leaderboard.map((item, index) => (
              <div key={item.user.id} className={`${styles.row} ${index < 3 ? styles.top3 : ''}`}>
                <span className={styles.rank}>
                  {MEDAL[index] || <span className={styles.rankNum}>#{index + 1}</span>}
                </span>
                <div className={styles.user}>
                  <Avatar src={item.user.avatar} name={item.user.name} size={44} />
                  <div>
                    <span className={styles.userName}>{item.user.name}</span>
                    <span className={styles.userEmail}>{item.user.email}</span>
                  </div>
                </div>
                <div className={styles.score}>
                  <span className={styles.scoreNum}>{item.score}</span>
                  <span className={styles.scoreLabel}>poin</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
