import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getApiKey = () => localStorage.getItem('skycast_api_key');
export const setApiKey = (key) => localStorage.setItem('skycast_api_key', key);

const getAxiosConfig = (params) => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error('API Key missing');
    }
    return {
        params: {
            ...params,
            appid: apiKey,
            units: 'metric',
        },
    };
};

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, getAxiosConfig({ q: city }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, getAxiosConfig({ q: city }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, getAxiosConfig({ lat, lon }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchForecastByCoords = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, getAxiosConfig({ lat, lon }));
        return response.data;
    } catch (error) {
        throw error;
    }
};
