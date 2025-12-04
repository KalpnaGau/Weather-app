import React from 'react';
import WeatherCard from './WeatherCard';

const Forecast = ({ data }) => {
    if (!data) return null;

    // Filter for one reading per day (e.g., noon) or just show next few intervals
    // For a 5-day forecast with 3-hour intervals, we might want to show a scrolling list of all, or filter.
    // Let's show all intervals for a detailed scroll view.

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <h3 className="text-white text-xl font-semibold mb-4 px-4">Hourly Forecast (5 Days)</h3>
            <div className="flex overflow-x-auto pb-4 scrollbar-hide px-4">
                {data.list.map((item) => (
                    <WeatherCard key={item.dt} data={item} />
                ))}
            </div>
        </div>
    );
};

export default Forecast;
