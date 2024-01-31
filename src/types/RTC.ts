declare module 'rtcmulticonnection' {
	class RTCMultiConnection {
		constructor();

		socketURL: string;
		socketMessageEvent: string;
		enableLogs: boolean;
		session: {
			audio: boolean;
			video: boolean;
			oneway: boolean;
		};
		sessionid: string;
		isInitiator: boolean;

		sdpConstraints: {
			mandatory: {
				OfferToReceiveAudio: boolean;
				OfferToReceiveVideo: boolean;
			};
		};
		iceServers: Array<{
			urls: string;
			username?: string;
			credential?: string;
		}>;

		videosContainer: HTMLElement;

		join(roomId: string, callback?: () => void): void;
		checkPresence(
			roomId: string,
			callback?: (isRoomExist: boolean) => void
		): void;
		onstream: (event: any) => void;
		onstreamended: (event: any) => void;
		onMediaError: (e: any) => void;
	}

	export = RTCMultiConnection;
}
