// react
import { useState } from 'react';
// components
import Tab from '../../common/Tab';
import CameraVideo from './CameraVideo';
import Pill from '../../common/Pill';
import CameraModal from '../Modal/CameraModal';
import Button from '../../common/Button';
// const
import { BUTTON_LABEL, STATUS, TAB_LABEL } from '@/constants/LABEL';
// types
import { Position } from '@/types/COMMON';
// utilities
import { cameraStatus } from '@/utils/FleetRetriever';

interface CameraSectionProps {
	carId: string;
	carName: string;
	carStatus: STATUS;
	cameraName?: string;
	position: Position;
	handleLocate?: () => void;
	isLoading?: boolean;
}

export default function CameraSection(props: CameraSectionProps) {
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
				cameraName={props.cameraName ?? '-'}
				initialVideoMode={videoModeNumber}
				handleLocate={props.handleLocate}
				// pill={props.carStatus}
			/>
			<div className="w-full flex flex-col gap-8">
				<div className="flex flex-row gap-16">
					<p className="inline-block align-baseline font-istok text-black text-h5">
						{props.position} : {props.cameraName ?? '-'}
					</p>
					{!props.isLoading && props.cameraName && <Pill variant={status} />}
				</div>
				<div className="flex flex-col relative">
					<Tab
						value={videoModeNumber}
						options={Object.values(TAB_LABEL)}
						onChange={(mode: number) => setVideoModeNumber(mode)}
						size="small"
					/>
					<div className="relative aspect-video bg-dark_background_grey flex justify-center items-center">
						<CameraVideo
							carID={props.carName}
							camNumber={props.cameraName ?? ''}
						/>
					</div>
					{props.cameraName && (
						<div className="absolute bottom-12 right-12">
							<Button
								icon={BUTTON_LABEL.ZOOM}
								onClick={() => setOpenModal(true)}
								variant="outlined"
								color="primary"
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
