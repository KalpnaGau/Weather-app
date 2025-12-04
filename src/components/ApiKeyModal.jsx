import React, { useState } from 'react';

const ApiKeyModal = ({ onSave, onClose, initialError }) => {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState(initialError || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!apiKey.trim()) {
            setError('API Key cannot be empty');
            return;
        }
        onSave(apiKey);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter API Key</h2>
                <p className="text-gray-600 mb-6">
                    To use SkyCast, you need a free OpenWeatherMap API Key.
                    <a href="https://home.openweathermap.org/users/sign_up" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                        Get one here.
                    </a>
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Paste your API Key here"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-6 text-gray-700"
                        value={apiKey}
                        onChange={(e) => {
                            setApiKey(e.target.value);
                            setError('');
                        }}
                    />
                    <div className="flex justify-end gap-3">
                        {/* Optional: Add a cancel button if we want to allow closing without saving (though app might not work) */}
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                            Save Key
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;
