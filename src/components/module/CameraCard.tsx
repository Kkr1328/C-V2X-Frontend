'use client';

import { useState } from 'react';

import { Stack, Box } from '@mui/material';

import TabCameraPanel from '@/components/module/TabCameraPanel';
import ModalCamera from '@/components/common/ModalCamera';

import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';

import Pill from '../common/Pill';
import ButtonCV2X from '../common/ButtonCV2X';

interface CameraCardProps {
	carName: String;
	position: String;
	cameraName: String;
	isLoading?: boolean;
	pill: keyof typeof PILL_LABEL;
}

export default function CameraCard(props: CameraCardProps) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			{/* Video Modal */}
			{openModal && (
				<ModalCamera
					title={`${props.carName} - ${props.position} : ${props.cameraName}`}
					open={openModal}
					handleOnClose={() => setOpenModal(false)}
				>
					<TabCameraPanel size="large" carName={props.carName} cameraName={props.cameraName} />
				</ModalCamera>
			)}
			<Box className="w-300">
				{/* Header */}
				<Stack direction="row" className="px-16 py-12 gap-16 items-center">
					<Stack direction="row" className="gap-4">
						<p className="inline-block align-baseline font-istok text-black text-h5">
							{`${props.position} : ${props.cameraName}`}
						</p>
					</Stack>
					{!props.isLoading && <Pill variant={props.pill} />}
				</Stack>
				{/* Content */}
				<Box sx={{ position: 'relative' }} className="pb-16 px-16">
					<TabCameraPanel size="small" carName={props.carName} cameraName={props.cameraName}/>
					{/* Zoom Button */}
					{!openModal && (
						<Box sx={{ position: 'absolute', bottom: 20, right: 20 }}>
							<ButtonCV2X
								icon={BUTTON_LABEL.ZOOM}
								onClick={() => setOpenModal(true)}
								variant="outlined"
								color="primary"
							/>
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
}
