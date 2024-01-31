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
import { useCameraStatus } from '@/utils/FleetRetriever';
import Text from '@/components/common/Text';

interface CameraSectionProps {
	carId: string;
	carName: string;
	useCarStatus: STATUS;
	cameraId?: string;
	cameraName?: string;
	position: Position;
	handleLocate?: () => void;
	isLoading?: boolean;
}

export default function CameraSection(props: CameraSectionProps) {
	const [videoModeNumber, setVideoModeNumber] = useState(0);
	const [openModal, setOpenModal] = useState(false);

	const status = useCameraStatus(props.cameraId, props.carId);
	const isDisabled = status === STATUS.INACTIVE;

	return (
		<>
			<CameraModal
				title={`${props.carName} - ${props.position} : ${props.cameraName}`}
				open={openModal}
				handleOnClose={() => setOpenModal(false)}
				carId={props.carId}
				cameraId={props.cameraId}
				initialVideoMode={videoModeNumber}
				handleLocate={props.handleLocate}
				pill={status}
			/>
			<div className="w-full flex flex-col gap-8">
				<div className="flex flex-row gap-16 truncate">
					<Text
						style="text-black text-h5"
						content={`${props.position} : ${props.cameraName ?? '-'}`}
						isTruncate
					/>
					{!props.isLoading && props.cameraId && <Pill variant={status} />}
				</div>
				<div className="flex flex-col relative">
					<Tab
						value={videoModeNumber}
						options={Object.values(TAB_LABEL)}
						onChange={(mode: number) => setVideoModeNumber(mode)}
						size="small"
					/>
					<div className="relative aspect-[4/3] bg-dark_background_grey flex justify-center items-center">
						<CameraVideo
							carID={props.carId}
							cameraId={props.cameraId}
							isDisabled={isDisabled}
							isShowObjectDetection={
								Object.values(TAB_LABEL)[videoModeNumber] === TAB_LABEL.OBJECT
							}
						/>
					</div>
					{!isDisabled && (
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
