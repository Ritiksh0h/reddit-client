
const avatarCache: { [username: string]: string | null } = {};

export const getCachedAvatar = (username: string) => {
  return avatarCache[username] || null;
};

export const setCachedAvatar = (username: string, avatarUrl: string | null) => {
  avatarCache[username] = avatarUrl;
};
