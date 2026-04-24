import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetThreadDetail, asyncCreateComment, clearThreadDetail } from '../store/threadDetailSlice';
import CommentItem from '../components/CommentItem';
import VoteButtons from '../components/VoteButtons';
import Avatar from '../components/Avatar';
import LoadingIndicator from '../components/LoadingIndicator';
import { formatRelativeTime } from '../utils';
import styles from './ThreadDetailPage.module.css';

function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, loading, error } = useSelector((state) => state.threadDetail);
  const { authUser, token } = useSelector((state) => state.auth);

  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(asyncGetThreadDetail(threadId));
    return () => dispatch(clearThreadDetail());
  }, [dispatch, threadId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    await dispatch(asyncCreateComment({ token, threadId, content: comment }));
    setComment('');
    setSubmitting(false);
  };

  if (loading) return <LoadingIndicator fullPage />;
  if (error) return (
    <div className={styles.errorPage}>
      <p>❌ {error}</p>
      <Link to="/" className={styles.backLink}>← Kembali ke beranda</Link>
    </div>
  );
  if (!threadDetail) return null;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>← Kembali</Link>

      <article className={styles.thread}>
        {threadDetail.category && (
          <span className={styles.category}>#{threadDetail.category}</span>
        )}

        <h1 className={styles.title}>{threadDetail.title}</h1>

        <div className={styles.meta}>
          <div className={styles.author}>
            <Avatar
              src={threadDetail.owner ? threadDetail.owner.avatar : ''}
              name={threadDetail.owner ? threadDetail.owner.name : ''}
              size={40}
            />
            <div>
              <span className={styles.authorName}>{threadDetail.owner ? threadDetail.owner.name : ''}</span>
              <span className={styles.time}>{formatRelativeTime(threadDetail.createdAt)}</span>
            </div>
          </div>

          <VoteButtons
            threadId={threadDetail.id}
            upVotesBy={threadDetail.upVotesBy || []}
            downVotesBy={threadDetail.downVotesBy || []}
          />
        </div>

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
      </article>

      <section className={styles.comments}>
        <h2 className={styles.commentsTitle}>
          💬 {threadDetail.comments.length} Komentar
        </h2>

        {authUser ? (
          <form onSubmit={handleSubmitComment} className={styles.commentForm}>
            <div className={styles.commentAuthor}>
              <Avatar src={authUser.avatar} name={authUser.name} size={36} />
              <span className={styles.commentingAs}>Berkomentar sebagai <strong>{authUser.name}</strong></span>
            </div>
            <textarea
              className={styles.commentInput}
              placeholder="Tulis komentar Anda..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
            />
            <button type="submit" className={styles.btnComment} disabled={submitting || !comment.trim()}>
              {submitting ? 'Mengirim...' : 'Kirim Komentar'}
            </button>
          </form>
        ) : (
          <div className={styles.loginPrompt}>
            <Link to="/login" className={styles.loginLink}>Masuk</Link> untuk meninggalkan komentar.
          </div>
        )}

        <div className={styles.commentList}>
          {threadDetail.comments.map((c) => (
            <CommentItem key={c.id} comment={c} threadId={threadDetail.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ThreadDetailPage;
