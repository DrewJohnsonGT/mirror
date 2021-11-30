export const formatDisplayTime = (timestamp?: number) =>
    timestamp !== undefined
        ? new Date(timestamp * 1000).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
          })
        : '';
