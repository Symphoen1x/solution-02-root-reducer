/**
 * Format ISO date to relative time string (Indonesian)
 */
const formatRelativeTime = (isoDate) => {
  const now = new Date();
  const date = new Date(isoDate);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} bulan lalu`;
  return `${Math.floor(diff / 31536000)} tahun lalu`;
};

/**
 * Truncate text to maxLength characters
 */
const truncate = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export { formatRelativeTime, truncate };
