import { startOfToday, startOfWeek, startOfMonth } from 'date-fns';

export const getDateRange = (range) => {
  const now = new Date();
  
  switch (range) {
    case 'today':
      return {
        start: startOfToday(),
        end: now
      };
    case 'week':
      return {
        start: startOfWeek(now),
        end: now
      };
    case 'month':
      return {
        start: startOfMonth(now),
        end: now
      };
    default:
      return null;
  }
};

export const formatDate = (timestamp) => {
  if (!timestamp?.seconds) return 'Unknown date';
  return format(new Date(timestamp.seconds * 1000), 'MMM d, yyyy');
};