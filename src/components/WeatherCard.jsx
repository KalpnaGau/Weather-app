import React from 'react';
import { format } from 'date-fns';

const WeatherCard = ({ data }) => {
    const { dt, main: { temp_min, temp_max }, weather } = data;
    const date = new Date(dt * 1000);
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div className="flex flex-col items-center min-w-[120px] bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg mx-2 hover:bg-white/20 transition-colors">
            <p className="text-white font-semibold">{format(date, 'EEE')}</p>
            <p className="text-gray-300 text-sm">{format(date, 'h a')}</p>
            <img src={iconUrl} alt={weather[0].main} className="w-16 h-16" />
            <div className="flex gap-2 text-white text-sm">
                <span className="font-bold">{Math.round(temp_max)}°</span>
                <span className="text-gray-300">{Math.round(temp_min)}°</span>
            </div>
        </div>
    );
};

export default WeatherCard;
