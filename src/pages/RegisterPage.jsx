import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser, clearError } from '../store/authSlice';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from './AuthPage.module.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo}>💬 Fundisc</span>
          <h1 className={styles.title}>Buat Akun Baru</h1>
          <p className={styles.subtitle}>Bergabung dan mulai berdiskusi</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.successMsg}>✅ Akun berhasil dibuat! Mengarahkan ke login...</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              className={styles.input}
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              className={styles.input}
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading || success}>
            {loading ? <LoadingIndicator /> : 'Daftar'}
          </button>
        </form>

        <p className={styles.switch}>
          Sudah punya akun?{' '}
          <Link to="/login" className={styles.switchLink}>Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
