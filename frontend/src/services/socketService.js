import {useEffect, useRef} from 'react';

export const useSocket = (userId) => {
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const socket = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket(`${protocol}127.0.0.1:8000/api/ws/${userId}`);

        socket.current.onopen = () => {
            socket.current.send(`Current user id: ${userId}`);
        };

        socket.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            // Delayed closure after 60 seconds
            setTimeout(() => {
                if (socket.current && socket.current.readyState === WebSocket.OPEN) {
                    socket.current.close();
                }
            }, 60000);
        };
    }, [userId]);

    return socket.current;
};