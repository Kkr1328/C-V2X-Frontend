import { useState } from 'react';

import { Stack, Box } from '@mui/material';

import TabCV2X from '../common/TabCV2X';

import { TAB_LABEL } from '@/constants/LABEL';

interface PanelProps {
	size?: 'small' | 'large';
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
						height: '25vh',
						backgroundColor: 'primary.dark',
					}}
				>
					{currentChild}
				</Box>
			</Stack>
		</>
	);
}
