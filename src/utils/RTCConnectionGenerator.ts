import RTCMultiConnection from 'rtcmulticonnection';

export function generateRTCConnection(): RTCMultiConnection {
	const newConnection = new RTCMultiConnection();
	newConnection.socketURL = process.env.NEXT_PUBLIC_API_CAM_URI as string;
	newConnection.enableLogs = false;
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

	return newConnection;
}
