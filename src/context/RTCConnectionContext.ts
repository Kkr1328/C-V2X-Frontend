import { Dispatch, SetStateAction, createContext } from 'react';
import RTCMultiConnection from 'rtcmulticonnection';

export const RTCConnectionContext = createContext<
	[
		{
			[id: string]: RTCMultiConnection;
		},
		Dispatch<
			SetStateAction<{
				[id: string]: RTCMultiConnection;
			}>
		>
	]
>([{}, () => {}]);
