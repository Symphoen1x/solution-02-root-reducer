const BASE_URL = 'https://forum-api.dicoding.dev/v1';

// ------ Auth ------

const register = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.user;
};

const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data;
};

const getOwnProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.user;
};

// ------ Users ------

const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.users;
};

// ------ Threads ------

const getAllThreads = async () => {
  const response = await fetch(`${BASE_URL}/threads`);
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.threads;
};

const getThreadDetail = async (threadId) => {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.detailThread;
};

const createThread = async (token, { title, body, category }) => {
  const response = await fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body, category }),
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.thread;
};

// ------ Votes Thread ------

const upVoteThread = async (token, threadId) => {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.vote;
};

const downVoteThread = async (token, threadId) => {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.vote;
};

const neutralVoteThread = async (token, threadId) => {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.vote;
};

// ------ Comments ------

const createComment = async (token, threadId, content) => {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.comment;
};

// ------ Votes Comment ------

const upVoteComment = async (token, threadId, commentId) => {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.vote;
};

const downVoteComment = async (token, threadId, commentId) => {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.vote;
};

const neutralVoteComment = async (token, threadId, commentId) => {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.vote;
};

// ------ Leaderboard ------

const getLeaderboard = async () => {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const data = await response.json();
  if (data.status !== 'success') throw new Error(data.message);
  return data.data.leaderboards;
};

export {
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  getLeaderboard,
};
