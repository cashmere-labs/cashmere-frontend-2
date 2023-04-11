import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { DateTime } from 'luxon';

interface ITimeCounterProps {
    toTimestamp: number;
    minutes?: boolean;
}

const TimeCounter = ({ toTimestamp, minutes }: ITimeCounterProps) => {
    const [ displayValue, setDisplayValue ] = useState('');

    useInterval(() => {
        const now = DateTime.now().toUnixInteger();
        if (minutes) {
            setDisplayValue(`${Math.ceil(Math.max(0, (toTimestamp - now) / 60000))}`);
        }
    }, 1000);

    return (
        <>{displayValue}</>
    );
};

export default TimeCounter;
