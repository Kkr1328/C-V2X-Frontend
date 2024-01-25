import { useState } from 'react';
import TabCV2X from '../common/TabCV2X';
import { BUTTON_LABEL, PILL_LABEL, TAB_LABEL } from '@/constants/LABEL';
import VideoReceiver from './videoReceiver';
import { Position } from '@/types/COMMON';
import Pill from '../common/Pill';
import CameraModal from './Modal/CameraModal';
import ButtonCV2X from '../common/ButtonCV2X';

interface CameraSectionProps {
	carName: string;
	cameraName: string;
	position: Position;
	status: PILL_LABEL;
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
				pill={props.status}
			/>
			<div className="w-full flex flex-col gap-8">
				<div className="flex flex-row gap-16">
					<p className="inline-block align-baseline font-istok text-black text-h5">
						{props.position} : {props.cameraName}
					</p>
					{!props.isLoading && props.status && <Pill variant={props.status} />}
				</div>
				<div className="flex flex-col relative">
					<TabCV2X
						value={videoModeNumber}
						options={modeOptions}
						onChange={(mode: number) => setVideoModeNumber(mode)}
						size="small"
					/>
					<div className="relative h-[28vh] w-full bg-light_text_grey flex justify-center items-center">
						<VideoReceiver camNumber={props.cameraName} carID={props.carName} />
					</div>
					<div className="absolute bottom-20 right-20">
						<ButtonCV2X
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
