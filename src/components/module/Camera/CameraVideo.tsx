import { useEffect, useRef, useState } from 'react';
import RTCMultiConnection from 'rtcmulticonnection';
import { Box } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import RenderBoxes from '@/utils/renderBox';
import IconMapper from '@/utils/IconMapper';
import { BUTTON_LABEL } from '@/constants/LABEL';
import Loading from '../../common/Loading';

interface Box {
	label: number;
	probability: number;
	bounding: [number, number, number, number];
}

function generateRandomUID() {
	const timestamp = new Date().getTime().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 8);
	return timestamp + randomPart;
}

interface VideoReceiverProps {
	carID: string;
	cameraId?: string;
	size?: 'small' | 'large';
	isDisabled?: boolean;
	isShowObjectDetection?: boolean;
}

export default function VideoReceiver(props: VideoReceiverProps) {
	const [connection, setConnection] = useState<RTCMultiConnection>();
	const [socket, setSocket] = useState<Socket>();
	const [stream, setStream] = useState<MediaStream | null>(null);
	const uid = generateRandomUID();
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!socket && canvasRef.current && connection) {
			const newSocket = io(
				process.env.NEXT_PUBLIC_API_CAM_URI || '<API-CAM-URL>'
			) as Socket;
			newSocket.emit('control center connecting', {
				roomID: connection.sessionid,
			});
			setSocket(newSocket);
		}

		if (socket)
			socket.on('send object detection', (boxes: Array<Box>) => {
				if (canvasRef.current) {
					RenderBoxes({ canvas: canvasRef.current, boxes: boxes });
				}
			});
	}, [canvasRef.current, socket, connection]);

	useEffect(() => {
		if (!connection) {
			const newConnection = new RTCMultiConnection();
			newConnection.socketURL = process.env.NEXT_PUBLIC_API_CAM_URI as string;
			// newConnection.enableLogs = false;

			newConnection.socketMessageEvent = 'video-broadcast-demo';
			newConnection.session = {
				audio: false,
				video: false,
				oneway: true,
			};
			newConnection.sdpConstraints.mandatory = {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false,
			};
			newConnection.videosContainer =
				document.getElementById('videos-container') ?? document.body;

			if (!props.isDisabled) {
				newConnection.join(`Room${props.carID}${props.cameraId}`, function () {
					console.log(newConnection.sessionid);
				});
			}

			newConnection.onstream = function (event) {
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
			newConnection.onstreamended = function (event) {
				var mediaElement = document.getElementById(event.streamid);
				if (mediaElement) {
					if (mediaElement.parentNode) {
						mediaElement.parentNode.removeChild(mediaElement);
					}

					if (
						event.userid === newConnection.sessionid &&
						!newConnection.isInitiator
					) {
						alert(
							'Broadcast is ended. We will reload this page to clear the cache.'
						);
						window.location.reload();
					}
				}
			};
			newConnection.onMediaError = function (e) {
				newConnection.join(newConnection.sessionid);
			};

			setConnection(newConnection);
		} else {
			if (!props.isDisabled) {
				connection.join(`Room${props.carID}${props.cameraId}`, function () {
					console.log(connection.sessionid);
				});
			}
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
					const container = document.getElementById('videos-container');
					if (container && videoRef.current) {
						const containerWidth = container.clientWidth;
						const containerHeight = container.clientHeight;

						videoRef.current.width = containerWidth;
						videoRef.current.height = containerHeight;
					}
				};
			}
		}
	}, [stream]);

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

	if (!stream) return <Loading size={props.size === 'large' ? 48 : 24} />;

	return (
		<div className="h-full w-full aspect-[4/3]" id="videos-container">
			<video
				className={`h-full w-full aspect-[4/3] video-machine`}
				id={`video ${uid}`}
				ref={videoRef}
				playsInline
				autoPlay
				muted
			/>
			{props.isShowObjectDetection && (
				<canvas
					className="flex absolute top-none left-none z-0 h-full w-full aspect-[4/3]"
					id="canvas"
					ref={canvasRef}
				/>
			)}
		</div>
	);
}
