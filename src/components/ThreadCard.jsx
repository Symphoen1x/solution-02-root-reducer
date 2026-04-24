import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import VoteButtons from './VoteButtons';
import { formatRelativeTime } from '../utils';
import styles from './ThreadCard.module.css';

function ThreadCard({ thread, user }) {
  const bodyPreview = thread.body
    ? thread.body.replace(/<[^>]+>/g, '').slice(0, 200)
    : '';

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <div className={styles.author}>
          <Avatar src={user ? user.avatar : ''} name={thread.ownerId} size={32} />
          <span className={styles.authorName}>{user ? user.name : thread.ownerId}</span>
        </div>
        <span className={styles.time}>{formatRelativeTime(thread.createdAt)}</span>
      </div>

      <Link to={`/threads/${thread.id}`} className={styles.titleLink}>
        <h2 className={styles.title}>{thread.title}</h2>
      </Link>

      {bodyPreview && (
        <p className={styles.body}>{bodyPreview}{thread.body.replace(/<[^>]+>/g, '').length > 200 ? '...' : ''}</p>
      )}

      <div className={styles.footer}>
        <VoteButtons
          threadId={thread.id}
          upVotesBy={thread.upVotesBy || []}
          downVotesBy={thread.downVotesBy || []}
        />

        <div className={styles.stats}>
          {thread.category && (
            <span className={styles.category}>#{thread.category}</span>
          )}
          <span className={styles.comments}>
            💬 {thread.totalComments} komentar
          </span>
        </div>
      </div>
    </div>
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default ThreadCard;
