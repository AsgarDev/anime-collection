import axios from 'axios';
import { getCachedData, setCachedData } from './cacheService';

const API_URL = '/api';
const JIKAN_API_URL = 'https://api.jikan.moe/v4';
const REQUEST_INTERVAL = 400;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let requestQueue = [];
let isRequesting = false;

const processQueue = async () => {
    if (isRequesting || requestQueue.length === 0) {
        return;
    }

    isRequesting = true;
    const { resolve, reject, requestFn } = requestQueue.shift();
    
    try {
        const response = await requestFn();
        resolve(response);
    } catch (error) {
        reject(error);
    } finally {
        isRequesting = false;
        setTimeout(processQueue, REQUEST_INTERVAL);
    }
};

const enqueueRequest = (requestFn) => {
    return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject, requestFn });
        processQueue();
    });
};

export const getAnimes = async () => {
    try {
        const response = await apiClient.get('/animes');
        return response.data;
    } catch (error) {
        console.error('Error fetching animes:', error);
        throw error;
    }
};

export const getAnime = async (id) => {
    try {
        const response = await apiClient.get(`/animes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime with ID ${id}:`, error);
        throw error;
    }
};

export const addAnime = async (formData) => {
    const response = await apiClient.get('/animes', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'anime');
    }
};

export const getCharacters = async (animeId) => {
    try {
        const response = await apiClient.get(`/animes/${animeId}/characters`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching characters for anime ID ${animeId}:`, error);
        throw error;
    }
};

export const getAnimeAdditionalInfo = async (title) => {
    const searchCacheKey = `search_${title}`;
    const detailCacheKey = `detail_${title}`;
    
    let cachedData = getCachedData(detailCacheKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        cachedData = getCachedData(searchCacheKey);
        if (!cachedData) {
            const searchResponse = await enqueueRequest(() => axios.get(`${JIKAN_API_URL}/anime?q=${encodeURIComponent(title)}`));
            if (searchResponse.data && searchResponse.data.data && searchResponse.data.data.length > 0) {
                const malId = searchResponse.data.data[0].mal_id;
                setCachedData(searchCacheKey, malId);
                const response = await enqueueRequest(() => axios.get(`${JIKAN_API_URL}/anime/${malId}`));
                if (response.data && response.data.data) {
                    const animeInfo = response.data.data;
                    const result = {
                        type: animeInfo.genres.map(genre => genre.name).join(', '),
                        episodes: animeInfo.episodes,
                    };
                    setCachedData(detailCacheKey, result);
                    return result;
                }
            }
        } else {
            const response = await enqueueRequest(() => axios.get(`${JIKAN_API_URL}/anime/${cachedData}`));
            if (response.data && response.data.data) {
                const animeInfo = response.data.data;
                const result = {
                    type: animeInfo.genres.map(genre => genre.name).join(', '),
                    episodes: animeInfo.episodes,
                };
                setCachedData(detailCacheKey, result);
                return result;
            }
        }
        return {
            type: 'Unknown',
            episodes: 'N/A',
        };
    } catch (error) {
        console.error(`Error fetching additional info for anime title ${title}:`, error);
        throw error;
    }
};
