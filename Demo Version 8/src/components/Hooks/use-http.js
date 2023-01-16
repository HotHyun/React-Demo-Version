import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (request, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(request.url, {
                method: request.method ? request.method : 'GET',
                body: request.body ? JSON.stringify(request.body) : null,
                headers: request.headers ? request.headers : {},
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest,
    };
};

export default useHttp;
