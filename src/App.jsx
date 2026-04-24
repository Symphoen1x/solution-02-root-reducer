import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncGetOwnProfile } from './store/authSlice';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  const dispatch = useDispatch();

  // Optional local state constraint to hold rendering until profile is checked
  const [init, setInit] = React.useState(true);

  useEffect(() => {
    dispatch(asyncGetOwnProfile()).finally(() => {
      setInit(false);
    });
  }, [dispatch]);

  if (init) {
    return <LoadingIndicator fullPage />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
          <Route path="/threads/new" element={<CreateThreadPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
