import React, { useEffect } from 'react';
import '../styles/banner.scss';

const Banner = ({ notification, onClose, duration = 3000 }) => {
    const { message, type } = notification;

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, onClose, duration]);

    if (!message) return null;

    return (
        <div className={`banner ${type}`}>
            {message}
        </div>
    );
};

export default Banner;
