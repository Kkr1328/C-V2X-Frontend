import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';

export default function EmergencyWrapper(props: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_WEB_SOCKET_URL) {
			return;
		}
		const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL, { transports: ['websocket'] });
		socket.on('connect', () => {
			console.log('connected websocket');
		});
		socket.on('emergency', (message) => {
			console.log('Emergency: ', message);
			queryClient.invalidateQueries({ queryKey: ['getEmergencyList'] });
		});

		return () => {
			socket.disconnect();
			console.log('disconnected websocket');
		};
	}, []);

	return <>{props.children}</>;
}
