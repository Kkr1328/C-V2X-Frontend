// reatc
import { useState } from 'react';
// material ui
import { Card, Divider, Modal } from '@mui/material';
// components
import ModalHeader, { ModalHeaderProp } from './ModalHeader';
import VideoReceiver from '@/components/module/videoReceiver';
import TabCV2X from '@/components/common/TabCV2X';
// const
import { TAB_LABEL } from '@/constants/LABEL';

interface CameraModalProp extends ModalHeaderProp {
	open: boolean;
	handleOnClose: () => void;
	cameraName: string;
	carName: string;
	initialVideoMode: number;
	handleLocate?: () => void;
}

export default function CameraModal(props: CameraModalProp) {
	const modeOptions = [
		TAB_LABEL.ORIGINAL,
		TAB_LABEL.OBJECT,
		TAB_LABEL.PANOPTIC,
	];
	const [videoModeNumber, setVideoModeNumber] = useState(
		props.initialVideoMode
	);

	return (
		<Modal
			open={props.open}
			onClose={props.handleOnClose}
			className="flex items-center justify-center"
		>
			<Card className="max-h-[90%] flex flex-col rounded-lg">
				<ModalHeader {...props} handleOnClose={props.handleOnClose} />
				<div className="flex flex-col gap-8">
					<Divider />
					<div className="flex flex-col pb-16 px-16">
						<TabCV2X
							value={videoModeNumber}
							options={modeOptions}
							onChange={(mode: number) => setVideoModeNumber(mode)}
							size="large"
						/>
						<div className="relative h-[75vh] w-[100vh] bg-light_text_grey flex justify-center items-center">
							<VideoReceiver
								camNumber={props.cameraName}
								carID={props.carName}
							/>
						</div>
					</div>
				</div>
			</Card>
		</Modal>
	);
}
