import { useState } from 'react';
import Tab from '../../common/Tab';
import { BUTTON_LABEL, STATUS, TAB_LABEL } from '@/constants/LABEL';
import VideoReceiver from './videoReceiver';
import { Position } from '@/types/COMMON';
import Pill from '../../common/Pill';
import CameraModal from '../Modal/CameraModal';
import Button from '../../common/Button';
import { cameraStatus } from '@/utils/FleetRetriever';

interface CameraSectionProps {
	carId: string;
	carName: string;
	carStatus: STATUS;
	cameraName: string;
	position: Position;
	handleLocate?: () => void;
	isLoading?: boolean;
}

export default function CameraSection(props: CameraSectionProps) {
	const modeOptions = [
		TAB_LABEL.ORIGINAL,
		TAB_LABEL.OBJECT,
		TAB_LABEL.PANOPTIC,
	];
	const [videoModeNumber, setVideoModeNumber] = useState(0);
	const [openModal, setOpenModal] = useState(false);

	const status = cameraStatus(props.position, props.carId);

	return (
		<>
			<CameraModal
				title={`${props.carName} - ${props.position} : ${props.cameraName}`}
				open={openModal}
				handleOnClose={() => setOpenModal(false)}
				carName={props.carName}
				cameraName={props.cameraName}
				initialVideoMode={videoModeNumber}
				handleLocate={props.handleLocate}
				pill={props.carStatus}
			/>
			<div className="w-full flex flex-col gap-8">
				<div className="flex flex-row gap-16">
					<p className="inline-block align-baseline font-istok text-black text-h5">
						{props.position} : {props.cameraName}
					</p>
					{!props.isLoading && <Pill variant={status} />}
				</div>
				<div className="flex flex-col relative">
					<Tab
						value={videoModeNumber}
						options={modeOptions}
						onChange={(mode: number) => setVideoModeNumber(mode)}
						size="small"
					/>
					<div className="relative h-[28vh] w-full bg-light_text_grey flex justify-center items-center">
						<VideoReceiver camNumber={props.cameraName} carID={props.carName} />
					</div>
					<div className="absolute bottom-20 right-20">
						<Button
							icon={BUTTON_LABEL.ZOOM}
							onClick={() => setOpenModal(true)}
							variant="outlined"
							color="primary"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
