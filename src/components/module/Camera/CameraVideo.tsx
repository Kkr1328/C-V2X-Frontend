'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import RTCMultiConnection from 'rtcmulticonnection';
import {Box} from '@/utils/renderBox';
import { io, Socket } from 'socket.io-client';
import RenderBoxes from '@/utils/renderBox';
import IconMapper from '@/utils/IconMapper';
import { BUTTON_LABEL } from '@/constants/LABEL';
import Loading from '../../common/Loading';
import { RTCConnectionContext } from '@/context/RTCConnectionContext';


function generateRandomUID() {
	const timestamp = new Date().getTime().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 8);
	return timestamp + randomPart;
}

interface CameraVideoProps {
	carID: string;
	cameraId?: string;
	size?: 'small' | 'large';
	isDisabled?: boolean;
	isShowObjectDetection?: boolean;
}

export default function CameraVideo(props: CameraVideoProps) {
	const [connection, setConnection] = useState<RTCMultiConnection>();
	const [socket, setSocket] = useState<Socket>();
	const [stream, setStream] = useState<MediaStream | null>(null);
	const uid = generateRandomUID();
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [rtcConnection] = useContext(RTCConnectionContext);

	useEffect(() => {
		if (!socket && canvasRef.current && connection) {
			const newSocket = io(
				process.env.NEXT_PUBLIC_WEB_SOCKET_URL || '<API-CAM-URL>',
				{
					transports: ['websocket'],
				}
			);
			console.log(process.env.NEXT_PUBLIC_API_CAM_URI);
			newSocket.emit('control center connecting', {
				roomID: connection.sessionid,
			});
			setSocket(newSocket);
		}

		if (socket)
			socket.on('send object detection', (boxes: Array<Box>) => {
				// console.log(boxes)
				if (canvasRef.current) {
					RenderBoxes({ canvas: canvasRef.current, boxes: boxes });
				}
			});
	}, [canvasRef.current, socket, connection]);

	useEffect(() => {
		if (!connection && props.cameraId) {
			const connectionName =
				props.size === 'large'
					? `${props.cameraId}_modal`
					: (props.cameraId as string);
			setConnection(rtcConnection[connectionName]);
		}
		if (!props.isDisabled && connection) {
			connection.videosContainer =
				document.getElementById('videos-container') ?? document.body;

			connection.onstream = function (event) {
				var existing = document.getElementById(event.streamid);
				if (existing && existing.parentNode) {
					existing.parentNode.removeChild(existing);
				}
				event.mediaElement.removeAttribute('src');
				event.mediaElement.removeAttribute('srcObject');
				event.mediaElement.muted = true;
				event.mediaElement.volume = 0;
				setStream(event.stream);
			};
			connection.join(`Room${props.carID}${props.cameraId}`);
		}
	}, [connection, props.isDisabled]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			if (socket) {
				socket.emit('remove_user', { carID: props.carID });
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [socket, props.carID]);

	useEffect(() => {
		if (stream) {
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.onloadedmetadata = () => {
					if (videoRef.current) {
						const container = videoRef.current.parentElement;
						if (container) {
							const containerWidth = container.clientWidth;
							const containerHeight = container.clientHeight;

							videoRef.current.width = containerWidth;
							videoRef.current.height = containerHeight;
							setIsLoading(false);
						}
					}
				};
			}
		}
	}, [stream, isLoading]);

	useEffect(() => {
		if (stream && canvasRef.current) {
			const parentBox = canvasRef.current.parentElement;
			if (parentBox) {
				canvasRef.current.width = parentBox.clientWidth;
				canvasRef.current.height = parentBox.clientHeight;
			}
		}
	}, [stream, canvasRef.current]);

	if (props.isDisabled)
		return (
			<div className="text-dark_text_grey">
				<IconMapper icon={BUTTON_LABEL.NO_VDO} size="36px" />
			</div>
		);

	return (
		<div className="h-full w-full aspect-[4/3]" id="videos-container">
			{isLoading && <Loading size={props.size === 'large' ? 48 : 24} />}
			<video
				className={`h-full w-full aspect-[4/3] video-machine ${
					isLoading && 'hidden'
				}`}
				id={`video ${uid}`}
				ref={videoRef}
				playsInline
				autoPlay
				muted
			/>
			{props.isShowObjectDetection && (
				<canvas
					className={`flex absolute top-none left-none z-0 h-full w-full aspect-[4/3] ${
						isLoading && 'hidden'
					}`}
					id="canvas"
					ref={canvasRef}
				/>
			)}
		</div>
	);
}
