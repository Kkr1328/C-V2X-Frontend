import { useState } from 'react';

import { Stack, Box } from '@mui/material';

import TabCV2X from '../common/TabCV2X';

import { TAB_LABEL } from '@/constants/LABEL';
import VideoReceiver from '../videoReceiver/videoReceiver';

interface PanelProps {
	size?: 'small' | 'large';
	carName: String;
	cameraName: String;
}

export default function TabCameraPanel(props: PanelProps) {
	const [currentTab, setCurrentTab] = useState(0);
	const [currentChild, setCurrentChild] = useState('original');
	const handleChange = (newTab: number) => {
		setCurrentTab(newTab);
		if (newTab === 0) {
			setCurrentChild('original'); // gonna change to vdo
		} else if (newTab === 1) {
			setCurrentChild('object detection');
		} else if (newTab === 2) {
			setCurrentChild('panoptic segmentation');
		}
	};

	return (
		<>
			<Stack>
				<TabCV2X
					value={currentTab}
					options={[TAB_LABEL.ORIGINAL, TAB_LABEL.OBJECT, TAB_LABEL.PANOPTIC]}
					onChange={handleChange}
					size={props.size}
				/>
				{/* Sample Object */}
				<Box
					sx={{
						height: props.size == "small" ? '28vh':"75vh",
						width: props.size == "small" ? '100%':"100vh",
						// minHeight:props.size == "small" ? '28vh':"65vh",
						backgroundColor: 'text.disabled',
						position: 'relative',
						display: "flex",
						justifyContent: 'center',
						alignItems: 'center',
						overflow: "hidden"
					}}
				>	
					{currentChild && (
						<div
						style={{
							position: 'absolute',
							top: 0,
							left: 10,
							right: 0,
							bottom: 0,
							zIndex: 0, // Set a higher z-index for currentChild
							color:"white"
						}}
						>
						{currentChild}
						</div>
					)}
					<div>
						<VideoReceiver camNumber={props.cameraName} carID={props.carName} />
					</div>
				</Box>
			</Stack>
		</>
	);
}
