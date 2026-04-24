import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import Avatar from './Avatar';
import styles from './Navbar.module.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>💬</span>
          <span className={styles.logoText}>Fundisc</span>
        </Link>

        <div className={styles.links}>
          <Link to="/" className={styles.navLink}>Beranda</Link>
          <Link to="/leaderboard" className={styles.navLink}>Leaderboard</Link>
        </div>

        <div className={styles.auth}>
          {authUser ? (
            <>
              <Link to="/threads/new" className={styles.btnCreate}>
                + Buat Thread
              </Link>
              <div className={styles.userInfo}>
                <Avatar
                  src={authUser.avatar}
                  name={authUser.name}
                  size={36}
                />
                <span className={styles.userName}>{authUser.name}</span>
              </div>
              <button className={styles.btnLogout} onClick={handleLogout}>
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.btnLogin}>Masuk</Link>
              <Link to="/register" className={styles.btnRegister}>Daftar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
