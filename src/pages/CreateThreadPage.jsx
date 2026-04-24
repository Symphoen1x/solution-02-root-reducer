import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateThread } from '../store/threadsSlice';
import styles from './CreateThreadPage.module.css';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser, token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Judul dan isi thread wajib diisi.');
      return;
    }
    setSubmitting(true);
    setError('');
    const result = await dispatch(asyncCreateThread({ token, title, body, category }));
    setSubmitting(false);
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    } else {
      setError(result.payload || 'Gagal membuat thread.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.back}>← Kembali</Link>

        <h1 className={styles.title}>Buat Thread Baru</h1>
        <p className={styles.subtitle}>Bagikan ide atau pertanyaan Anda kepada komunitas</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="thread-title">Judul Thread *</label>
            <input
              id="thread-title"
              type="text"
              className={styles.input}
              placeholder="Judul yang menarik dan deskriptif"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
            />
            <span className={styles.charCount}>{title.length}/200</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="thread-category">Kategori</label>
            <input
              id="thread-category"
              type="text"
              className={styles.input}
              placeholder="Contoh: teknologi, sains, hiburan"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="thread-body">Isi Thread *</label>
            <textarea
              id="thread-body"
              className={styles.textarea}
              placeholder="Tulis isi thread Anda di sini..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              required
            />
          </div>

          <div className={styles.actions}>
            <Link to="/" className={styles.btnCancel}>Batal</Link>
            <button type="submit" className={styles.btnSubmit} disabled={submitting}>
              {submitting ? 'Mempublikasi...' : 'Publikasikan Thread'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
