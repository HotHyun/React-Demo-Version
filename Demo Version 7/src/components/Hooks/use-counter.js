import { useState, useEffect } from 'react';

const useCounter = (effector) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(effector);
        }, 1000);

        return () => clearInterval(interval);
    }, [effector]);
    return counter;
};

export default useCounter;
