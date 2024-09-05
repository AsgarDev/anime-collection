const CACHE_KEY_PREFIX = 'anime_cache_';
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 heures

export const getCachedData = (key) => {
    const cacheKey = `${CACHE_KEY_PREFIX}${key}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (Date.now() - parsedData.timestamp < CACHE_EXPIRATION_MS) {
            return parsedData.data;
        } else {
            localStorage.removeItem(cacheKey);
        }
    }
    return null;
};

export const setCachedData = (key, data) => {
    const cacheKey = `${CACHE_KEY_PREFIX}${key}`;
    const cacheEntry = {
        data,
        timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
};
