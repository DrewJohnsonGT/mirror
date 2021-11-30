export const formatDisplayTemp = (temp?: number) =>
    temp !== undefined ? Math.round(temp).toString() : '';
