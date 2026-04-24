import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../store/threadDetailSlice';
import Avatar from './Avatar';
import { formatRelativeTime } from '../utils';
import styles from './CommentItem.module.css';

function CommentItem({ comment, threadId }) {
  const dispatch = useDispatch();
  const { authUser, token } = useSelector((state) => state.auth);

  const userId = authUser ? authUser.id : null;
  const hasUpVoted = userId && comment.upVotesBy.includes(userId);
  const hasDownVoted = userId && comment.downVotesBy.includes(userId);

  const handleUpVote = () => {
    if (!authUser) return;
    if (hasUpVoted) {
      dispatch(asyncNeutralVoteComment({ token, threadId, commentId: comment.id, userId }));
    } else {
      dispatch(asyncUpVoteComment({ token, threadId, commentId: comment.id, userId }));
    }
  };

  const handleDownVote = () => {
    if (!authUser) return;
    if (hasDownVoted) {
      dispatch(asyncNeutralVoteComment({ token, threadId, commentId: comment.id, userId }));
    } else {
      dispatch(asyncDownVoteComment({ token, threadId, commentId: comment.id, userId }));
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.author}>
          <Avatar src={comment.owner ? comment.owner.avatar : ''} name={comment.owner ? comment.owner.name : '?'} size={34} />
          <div>
            <span className={styles.authorName}>{comment.owner ? comment.owner.name : 'Unknown'}</span>
            <span className={styles.time}>{formatRelativeTime(comment.createdAt)}</span>
          </div>
        </div>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />

      <div className={styles.votes}>
        <button
          className={`${styles.voteBtn} ${hasUpVoted ? styles.upActive : ''}`}
          onClick={handleUpVote}
          title={authUser ? 'Up vote' : 'Login untuk vote'}
        >
          ▲ {comment.upVotesBy.length}
        </button>
        <button
          className={`${styles.voteBtn} ${hasDownVoted ? styles.downActive : ''}`}
          onClick={handleDownVote}
          title={authUser ? 'Down vote' : 'Login untuk vote'}
        >
          ▼ {comment.downVotesBy.length}
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
