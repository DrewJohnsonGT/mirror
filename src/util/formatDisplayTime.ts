export const formatDisplayTime = (timestamp?: number) =>
  timestamp !== undefined
    ? new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: 'numeric',
        hour12: true,
        minute: '2-digit',
      })
    : '';
