import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';

export default function EmergencyWrapper(props: { children: React.ReactNode }) {
    const queryClient = useQueryClient()

    useEffect(() => {
        const socket = io('ws://localhost:3426');
        socket.on('connect', () => {
            console.log('connected websocket');
        })
        socket.on('emergency', (message) => {
            console.log(message);
            queryClient.invalidateQueries({ queryKey: ['getEmergencyList'] })
        });

        return () => {
            socket.disconnect();
            console.log('disconnected websocket');
        }
    }, [])

    return (
        <>{props.children}</>
    );
}