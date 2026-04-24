import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../store/threadsSlice';
import styles from './VoteButtons.module.css';

function VoteButtons({ threadId, upVotesBy, downVotesBy, variant = 'thread' }) {
  const dispatch = useDispatch();
  const { authUser, token } = useSelector((state) => state.auth);

  const userId = authUser ? authUser.id : null;
  const hasUpVoted = userId && upVotesBy.includes(userId);
  const hasDownVoted = userId && downVotesBy.includes(userId);

  const handleUpVote = () => {
    if (!authUser) return;
    if (hasUpVoted) {
      dispatch(asyncNeutralVoteThread({ token, threadId, userId }));
    } else {
      dispatch(asyncUpVoteThread({ token, threadId, userId }));
    }
  };

  const handleDownVote = () => {
    if (!authUser) return;
    if (hasDownVoted) {
      dispatch(asyncNeutralVoteThread({ token, threadId, userId }));
    } else {
      dispatch(asyncDownVoteThread({ token, threadId, userId }));
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <button
        className={`${styles.btn} ${hasUpVoted ? styles.upActive : ''}`}
        onClick={handleUpVote}
        title={authUser ? 'Up vote' : 'Login untuk vote'}
      >
        <span className={styles.icon}>▲</span>
        <span className={styles.count}>{upVotesBy.length}</span>
      </button>
      <button
        className={`${styles.btn} ${hasDownVoted ? styles.downActive : ''}`}
        onClick={handleDownVote}
        title={authUser ? 'Down vote' : 'Login untuk vote'}
      >
        <span className={styles.icon}>▼</span>
        <span className={styles.count}>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  threadId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
};

export default VoteButtons;
