import React, { useState } from 'react';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';

const SearchBox = ({ onSearch, onLocation }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full max-w-md mx-auto mb-8">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
                >
                    <FaSearch />
                </button>
            </div>
            <button
                type="button"
                onClick={onLocation}
                className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30 shadow-lg"
                title="Use my location"
            >
                <FaLocationArrow />
            </button>
        </form>
    );
};

export default SearchBox;
