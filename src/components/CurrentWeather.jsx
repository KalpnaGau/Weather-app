import React from 'react';
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from 'react-icons/wi';

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const {
        name,
        main: { temp, humidity, feels_like, pressure },
        wind: { speed },
        weather,
        sys: { country },
    } = data;

    const weatherCondition = weather[0];
    const iconUrl = `http://openweathermap.org/img/wn/${weatherCondition.icon}@4x.png`;

    return (
        <div className="flex flex-col items-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">
                {name}, {country}
            </h2>
            <p className="text-xl capitalize mb-4">{weatherCondition.description}</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl w-full max-w-2xl">
                <div className="flex flex-col items-center">
                    <img src={iconUrl} alt={weatherCondition.main} className="w-32 h-32 drop-shadow-lg" />
                    <h1 className="text-6xl font-bold">{Math.round(temp)}°C</h1>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <WiThermometer className="text-3xl" />
                        <div>
                            <p className="text-sm text-gray-200">Feels Like</p>
                            <p className="font-semibold">{Math.round(feels_like)}°C</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <WiHumidity className="text-3xl" />
                        <div>
                            <p className="text-sm text-gray-200">Humidity</p>
                            <p className="font-semibold">{humidity}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <WiStrongWind className="text-3xl" />
                        <div>
                            <p className="text-sm text-gray-200">Wind</p>
                            <p className="font-semibold">{speed} m/s</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <WiBarometer className="text-3xl" />
                        <div>
                            <p className="text-sm text-gray-200">Pressure</p>
                            <p className="font-semibold">{pressure} hPa</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
