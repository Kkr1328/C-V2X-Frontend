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
	camNumber?: string;
	size?: 'small' | 'large';
	isDisabled?: boolean;
	isShowObjectDetection: boolean;
}

export default function VideoReceiver(props: VideoReceiverProps) {
	const connection = useRef<RTCMultiConnection | null>(null);

	const socket = useRef<Socket | null>(null);

	const [stream, setStream] = useState<MediaStream | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const uid = generateRandomUID();

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!socket.current && canvasRef.current && connection.current) {
			socket.current = io(process.env.NEXT_PUBLIC_API_CAM_URI || '') as Socket;
			socket.current?.emit('control center connecting', {
				roomID: connection.current.sessionid,
			});
		}

		socket.current?.on('send object detection', (boxes: Array<Box>) => {
			if (canvasRef.current) {
				// console.log(boxes)
				RenderBoxes({ canvas: canvasRef.current, boxes: boxes });
			}
		});
	}, [canvasRef.current]);

	useEffect(() => {
		if (!connection.current) {
			connection.current = new RTCMultiConnection();

			connection.current.socketURL = process.env
				.NEXT_PUBLIC_API_CAM_URI as string;
			console.log(process.env.NEXT_PUBLIC_API_CAM_URI as string);

			connection.current.socketMessageEvent = 'video-broadcast-demo';

			connection.current.session = {
				audio: false,
				video: false,
				oneway: true,
			};

			connection.current.sdpConstraints.mandatory = {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false,
			};

			// // first step, ignore default STUN+TURN servers
			// connection.current.iceServers = [];

			// // second step, set STUN url
			// connection.current.iceServers.push({
			//   urls: process.env.REACT_APP_STUN_SERVER,
			// });

			// // last step, set TURN url (recommended)
			// connection.current.iceServers.push({
			//   urls: process.env.REACT_APP_TURN_SERVER,
			//   username: process.env.REACT_APP_TURN_USER,
			//   credential: process.env.REACT_APP_TURN_PASSWORD,
			// });

			//   console.log(connection.current);

			connection.current.videosContainer =
				document.getElementById('videos-container') ?? document.body;
			showCam();

			connection.current.onstream = function (event) {
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

			connection.current.onstreamended = function (event) {
				var mediaElement = document.getElementById(event.streamid);
				if (mediaElement) {
					if (mediaElement.parentNode) {
						mediaElement.parentNode.removeChild(mediaElement);
					}

					if (
						event.userid === connection.current?.sessionid &&
						!connection.current?.isInitiator
					) {
						alert(
							'Broadcast is ended. We will reload this page to clear the cache.'
						);
						window.location.reload();
					}
				}
			};

			connection.current.onMediaError = function (e) {
				connection.current?.join(connection.current.sessionid);
			};
		}
	}, []);

	const showCam = () => {
		if (connection.current) {
			connection.current.sdpConstraints.mandatory = {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false,
			};
		}
		// connection.current?.join(
		// 	`Room${props.carID}${props.camNumber}`,
		// 	function () {
		// 		console.log(connection.current?.sessionid);
		// 	}
		// );
	};

	useEffect(() => {
		const handleBeforeUnload = () => {
			if (socket.current) {
				socket.current.emit('remove_user', { carID: props.carID });
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [socket.current, props.carID]);

	useEffect(() => {
		// Update the video elements when stream1 or stream2 changes
		if (stream) {
			const videoRef = document.getElementById(
				`video ${uid}`
			) as HTMLVideoElement; // Explicitly cast to HTMLVideoElement
			if (videoRef) {
				videoRef.srcObject = stream;
				// Check if the video is ready to show
				videoRef.onloadedmetadata = () => {
					const container =
						document.getElementById('videos-container')?.parentElement;
					if (container) {
						const containerWidth = container.clientWidth;
						const containerHeight = container.clientHeight;

						videoRef.width = containerWidth;
						videoRef.height = containerHeight;

						setIsLoading(false);
					}
				};
			}
		}
	}, [stream, props.camNumber]);

	useEffect(() => {
		if (stream && canvasRef.current) {
			const parentBox = canvasRef.current.parentElement;
			if (parentBox) {
				canvasRef.current.width = parentBox.clientWidth;
				canvasRef.current.height = parentBox.clientHeight;
			}
		}
	}, [stream, uid]);
	// useEffect(() => {
	//   if (stream) {
	//     const videoRef = document.getElementById(`video ${uid}`) as HTMLVideoElement; // Explicitly cast to HTMLVideoElement
	//     if (videoRef) {
	//       videoRef.srcObject = stream;
	//       // Check if the video is ready to show
	//         const container = document.getElementById("videos-container")?.parentElement;
	//         if (container) {
	//           const containerWidth = container.clientWidth;
	//           const containerHeight = container.clientHeight;

	//           videoRef.width = containerWidth;
	//           videoRef.height = containerHeight;

	//         }

	//     }
	// }
	// }, [stream, uid]);

	if (props.isDisabled)
		return (
			<div className="text-dark_text_grey">
				<IconMapper icon={BUTTON_LABEL.NO_VDO} size="36px" />
			</div>
		);

	if (isLoading || !stream)
		return <Loading size={props.size === 'large' ? 48 : 24} />;

	return (
		<div id="videos-container">
			<video
				className={`video-machine ${isLoading ? 'hidden' : ''}`}
				id={`video ${uid}`}
				playsInline
				autoPlay
				muted
			/>
			<canvas
				id="canvas"
				ref={canvasRef}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 0, // Set a higher z-index to ensure it stays on top
					display: props.isShowObjectDetection ? 'flex' : 'none',
				}}
			/>
		</div>
	);
}
