import { useEffect, useRef, useState } from 'react';
import RTCMultiConnection from 'rtcmulticonnection';
import { Socket } from 'socket.io-client';
import { Box } from '@mui/material';
import Loading from '@/components/common/Loading';
import IconMapper from '@/utils/IconMapper';
import { BUTTON_LABEL } from '@/constants/LABEL';
// import Script from 'next/script'

function generateRandomUID() {
	const timestamp = new Date().getTime().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 8);

	return timestamp + randomPart;
}

interface CameraVideoProps {
	carID: String;
	camNumber?: String;
	size?: 'small' | 'large';
	isDisabled?: boolean;
}

export default function CameraVideo(props: CameraVideoProps) {
	// const connection = useRef<RTCMultiConnection | null>(null);

	// const socket = useRef<Socket | null>(null);

	// const [stream, setStream] = useState<MediaStream | null>(null);

	// const [isLoading, setIsLoading] = useState<boolean>(true);

	// const uid = generateRandomUID();

	// useEffect(() => {
	// 	if (!connection.current) {
	// 		connection.current = new RTCMultiConnection();

	// 		connection.current.socketURL = process.env.NEXT_PUBLIC_API_CAM_URI + '/';
	// 		console.log(process.env.NEXT_PUBLIC_API_CAM_URI + '/');

	// 		connection.current.socketMessageEvent = 'video-broadcast-demo';

	// 		connection.current.session = {
	// 			audio: false,
	// 			video: false,
	// 			oneway: true,
	// 		};

	// 		connection.current.sdpConstraints.mandatory = {
	// 			OfferToReceiveAudio: false,
	// 			OfferToReceiveVideo: false,
	// 		};

	// 		// // first step, ignore default STUN+TURN servers
	// 		// connection.current.iceServers = [];

	// 		// // second step, set STUN url
	// 		// connection.current.iceServers.push({
	// 		//   urls: process.env.REACT_APP_STUN_SERVER,
	// 		// });

	// 		// // last step, set TURN url (recommended)
	// 		// connection.current.iceServers.push({
	// 		//   urls: process.env.REACT_APP_TURN_SERVER,
	// 		//   username: process.env.REACT_APP_TURN_USER,
	// 		//   credential: process.env.REACT_APP_TURN_PASSWORD,
	// 		// });

	// 		//   console.log(connection.current);

	// 		connection.current.videosContainer =
	// 			document.getElementById('videos-container') ?? document.body;
	// 		showCam();

	// 		connection.current.onstream = function (event) {
	// 			var existing = document.getElementById(event.streamid);
	// 			if (existing && existing.parentNode) {
	// 				existing.parentNode.removeChild(existing);
	// 			}

	// 			event.mediaElement.removeAttribute('src');
	// 			event.mediaElement.removeAttribute('srcObject');
	// 			event.mediaElement.muted = true;
	// 			event.mediaElement.volume = 0;
	// 			setStream(event.stream);
	// 		};

	// 		connection.current.onstreamended = function (event) {
	// 			var mediaElement = document.getElementById(event.streamid);
	// 			if (mediaElement) {
	// 				if (mediaElement.parentNode) {
	// 					mediaElement.parentNode.removeChild(mediaElement);
	// 				}

	// 				if (
	// 					event.userid === connection.current?.sessionid &&
	// 					!connection.current?.isInitiator
	// 				) {
	// 					alert(
	// 						'Broadcast is ended. We will reload this page to clear the cache.'
	// 					);
	// 					window.location.reload();
	// 				}
	// 			}
	// 		};

	// 		connection.current.onMediaError = function (e) {
	// 			connection.current?.join(connection.current.sessionid);
	// 		};
	// 	}
	// }, []);

	// const showCam = () => {
	// 	if (connection.current) {
	// 		connection.current.sdpConstraints.mandatory = {
	// 			OfferToReceiveAudio: false,
	// 			OfferToReceiveVideo: false,
	// 		};

	// 		connection.current.join(
	// 			`Room${props.carID}${props.camNumber}`,
	// 			function () {
	// 				console.log(connection.current?.sessionid);
	// 			}
	// 		);
	// 	}
	// };

	// useEffect(() => {
	// 	const handleBeforeUnload = () => {
	// 		if (socket.current) {
	// 			socket.current.emit('remove_user', { carID: props.carID });
	// 		}
	// 	};

	// 	window.addEventListener('beforeunload', handleBeforeUnload);

	// 	return () => {
	// 		window.removeEventListener('beforeunload', handleBeforeUnload);
	// 	};
	// }, [socket.current, props.carID]);

	// useEffect(() => {
	// 	// Update the video elements when stream1 or stream2 changes
	// 	if (stream) {
	// 		const videoRef = document.getElementById(
	// 			`video ${uid}`
	// 		) as HTMLVideoElement; // Explicitly cast to HTMLVideoElement
	// 		if (videoRef) {
	// 			videoRef.srcObject = stream;
	// 			// Check if the video is ready to show
	// 			videoRef.onloadedmetadata = () => {
	// 				const container = document.getElementById('videos-container');
	// 				if (container) {
	// 					const containerWidth = container.clientWidth;
	// 					const containerHeight = container.clientHeight;

	// 					const videoWidth = videoRef.videoWidth;
	// 					const videoHeight = videoRef.videoHeight;

	// 					const aspectRatio = videoWidth / videoHeight;

	// 					if (containerWidth / aspectRatio < containerHeight) {
	// 						// If the container is taller than the video, adjust the width
	// 						videoRef.style.width = containerWidth + 'vh';
	// 						videoRef.style.height = containerWidth / aspectRatio + 'vh';
	// 					} else {
	// 						// If the container is wider than the video, adjust the height
	// 						videoRef.style.height = containerHeight + 'vh';
	// 						videoRef.style.width = containerHeight * aspectRatio + 'vh';
	// 					}

	// 					setIsLoading(false);
	// 				}
	// 			};
	// 		}
	// 	}
	// }, [stream, props.camNumber]);

	if (props.isDisabled)
		return (
			<div className="text-dark_text_grey">
				<IconMapper icon={BUTTON_LABEL.NO_VDO} size="36px" />
			</div>
		);

	return <Loading size={props.size === 'large' ? 48 : 24} />;

	return (
		<Box
			style={{
				maxWidth: '100%',
				maxHeight: '100%',
				display: 'block',
				margin: 'auto',
			}}
			id="videos-container"
		>
			{/* <video
            className={`video-machine ${isLoading1 ? "hidden" : ""}`}
            id="video1"
            playsInline
            autoPlay
            muted
          />
          <video
            className={`video-machine ${isLoading1 ? "hidden" : ""}`}
            id="video2"
            playsInline
            autoPlay
            muted
          /> */}
			{/* {stream ? (
				<div>
					{isLoading ? (
						<div className="BlankContainer"><LoadingSpinner /> </div>
					) : null}
					<video
						className={`video-machine ${isLoading ? 'hidden' : ''}`}
						id={`video ${uid}`}
						playsInline
						autoPlay
						muted
					/>
				</div>
			) : (
				<div className="BlankContainer"><LoadingSpinner /> </div>
			)}*/}
		</Box>
	);
}
