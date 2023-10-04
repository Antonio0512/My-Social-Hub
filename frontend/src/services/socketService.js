import {useEffect, useRef} from 'react';

export const useSocket = (userId) => {
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const socket = useRef(null);
    const heartbeatInterval = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket(`${protocol}127.0.0.1:8000/api/ws/${userId}`);

        socket.current.onopen = () => {
            socket.current.send(`Current user id: ${userId}`);

            heartbeatInterval.current = setInterval(() => {
                socket.current.send('heartbeat');
            }, 60000);

            window.addEventListener('beforeunload', () => {
                clearInterval(heartbeatInterval.current);
                socket.current.close();
            });
        };

        socket.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            clearInterval(heartbeatInterval.current);
            socket.current.close();
        };
    }, [userId]);
    return socket.current;
};
