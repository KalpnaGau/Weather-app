import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast, fetchWeatherByCoords, fetchForecastByCoords, getApiKey, setApiKey as saveApiKey } from '../api/weather';
import SearchBox from '../components/SearchBox';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ApiKeyModal from '../components/ApiKeyModal';

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);

    const checkApiKey = () => {
        if (!getApiKey()) {
            setShowApiKeyModal(true);
            return false;
        }
        return true;
    };

    const handleApiError = (err) => {
        if (err.response?.status === 401 || err.message === 'API Key missing') {
            setError('Invalid or missing API Key. Please update it.');
            setShowApiKeyModal(true);
        } else {
            setError(err.response?.data?.message || 'Failed to fetch weather data');
        }
    };

    const loadWeather = async (city) => {
        if (!checkApiKey()) return;

        setLoading(true);
        setError(null);
        try {
            const weather = await fetchWeather(city);
            const forecast = await fetchForecast(city);
            setWeatherData(weather);
            setForecastData(forecast);
        } catch (err) {
            handleApiError(err);
            setWeatherData(null);
            setForecastData(null);
        } finally {
            setLoading(false);
        }
    };

    const loadWeatherByCoords = async (lat, lon) => {
        if (!checkApiKey()) return;

        setLoading(true);
        setError(null);
        try {
            const weather = await fetchWeatherByCoords(lat, lon);
            const forecast = await fetchForecastByCoords(lat, lon);
            setWeatherData(weather);
            setForecastData(forecast);
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLocationSearch = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    loadWeatherByCoords(position.coords.latitude, position.coords.longitude);
                },
                (err) => {
                    setError('Location access denied or unavailable.');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const handleSaveApiKey = (key) => {
        saveApiKey(key);
        setShowApiKeyModal(false);
        setError(null);
        // Try loading default city after saving key
        loadWeather('London');
    };

    // Initial load
    useEffect(() => {
        if (checkApiKey()) {
            loadWeather('London');
        }
    }, []);

    const getBackgroundClass = () => {
        if (!weatherData) return 'from-blue-500 via-purple-500 to-pink-500';
        const main = weatherData.weather[0].main.toLowerCase();

        if (main.includes('clear')) return 'from-yellow-400 via-orange-500 to-red-500';
        if (main.includes('cloud')) return 'from-gray-400 via-blue-400 to-blue-600';
        if (main.includes('rain') || main.includes('drizzle')) return 'from-gray-700 via-gray-900 to-black';
        if (main.includes('snow')) return 'from-blue-100 via-blue-300 to-blue-500';
        if (main.includes('thunderstorm')) return 'from-gray-900 via-purple-900 to-black';
        return 'from-blue-500 via-purple-500 to-pink-500';
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} transition-colors duration-1000 flex flex-col items-center py-8 px-4`}>
            <header className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">SkyCast</h1>
                <p className="text-white/80 text-lg">Real-Time Weather Dashboard</p>
            </header>

            <SearchBox onSearch={loadWeather} onLocation={handleLocationSearch} />

            {loading && <Loader />}
            {error && !showApiKeyModal && <ErrorMessage message={error} />}

            {showApiKeyModal && (
                <ApiKeyModal
                    onSave={handleSaveApiKey}
                    initialError={error === 'Invalid or missing API Key. Please update it.' ? error : ''}
                    onClose={() => setShowApiKeyModal(false)}
                />
            )}

            {!loading && !error && weatherData && (
                <>
                    <CurrentWeather data={weatherData} />
                    <Forecast data={forecastData} />
                </>
            )}
        </div>
    );
};

export default Home;
