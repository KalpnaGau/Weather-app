import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="bg-red-500/80 text-white p-4 rounded-md text-center backdrop-blur-sm">
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
