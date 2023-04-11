import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';

interface ITimeCounterProps {
    toTimestamp: number;
    minutes?: boolean;
}

const TimeCounter = ({ toTimestamp, minutes }: ITimeCounterProps) => {
    const [ displayValue, setDisplayValue ] = useState('');

    useInterval(() => {
        const now = Math.round(new Date().getTime());
        if (minutes) {
            setDisplayValue(`${Math.ceil(Math.max(0, (toTimestamp - now) / 60))}`);
        }
    }, 1000);

    return (
        <>{displayValue}</>
    );
};

export default TimeCounter;
