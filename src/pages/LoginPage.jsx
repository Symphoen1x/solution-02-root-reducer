import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoginUser } from '../store/authSlice';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './AuthPage.module.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authUser) navigate('/');
  }, [authUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncLoginUser({ email, password }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo}>💬 Fundisc</span>
          <h1 className={styles.title}>Selamat Datang Kembali</h1>
          <p className={styles.subtitle}>Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? <LoadingIndicator /> : 'Masuk'}
          </button>
        </form>

        <p className={styles.switch}>
          Belum punya akun?{' '}
          <Link to="/register" className={styles.switchLink}>Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
