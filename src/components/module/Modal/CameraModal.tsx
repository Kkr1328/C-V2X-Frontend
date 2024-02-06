// react
import { useState } from 'react';
// material ui
import { Card, Divider, Modal } from '@mui/material';
// components
import ModalHeader, { ModalHeaderProp } from './ModalHeader';
import CameraVideo from '@/components/module/Camera/CameraVideo';
import Tab from '@/components/common/Tab';
// const
import { TAB_LABEL } from '@/constants/LABEL';

interface CameraModalProp extends ModalHeaderProp {
	open: boolean;
	handleOnClose: () => void;
	cameraId?: string;
	carId: string;
	initialVideoMode: number;
	handleLocate?: () => void;
}

export default function CameraModal(props: CameraModalProp) {
	const [videoModeNumber, setVideoModeNumber] = useState(
		props.initialVideoMode
	);

	return (
		<Modal
			open={props.open}
			onClose={props.handleOnClose}
			className="flex items-center justify-center"
		>
			<Card className="w-[100vh] max-w-[90vw] flex flex-col rounded-lg">
				<ModalHeader {...props} handleOnClose={props.handleOnClose} />
				<div className="flex flex-col gap-8">
					<Divider />
					<div className="flex flex-col pb-16 px-16">
						<Tab
							value={videoModeNumber}
							options={Object.values(TAB_LABEL)}
							onChange={(mode: number) => setVideoModeNumber(mode)}
							size="large"
						/>
						<div className="relative aspect-[4/3] bg-dark_background_grey flex justify-center items-center">
							<CameraVideo
								carID={props.carId}
								cameraId={props.cameraId}
								size={'large'}
								isShowObjectDetection={
									Object.values(TAB_LABEL)[videoModeNumber] === TAB_LABEL.OBJECT
								}
							/>
						</div>
					</div>
				</div>
			</Card>
		</Modal>
	);
}
