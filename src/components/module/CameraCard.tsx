'use client';

import { useState } from 'react';

import { Stack, Box, IconButton } from '@mui/material';

import TabCameraPanel from '@/components/module/TabCameraPanel';
import ModalCamera from '@/components/common/ModalCamera';

import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';

import IconMapper from '@/utils/IconMapper';

import Pill from '../common/Pill';

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
					<TabCameraPanel size="large" />
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
					<TabCameraPanel size="small" />
					{/* Zoom Button */}
					{!openModal && (
						<IconButton
							disableRipple
							onClick={() => setOpenModal(true)}
							sx={{
								position: 'absolute',
								bottom: 20,
								right: 20,
								color: '#17A5D3',
								bgcolor: 'white !important',
								border: '2px solid #17A5D3',
								borderRadius: 3,
							}}
						>
							<IconMapper icon={BUTTON_LABEL.ZOOM}></IconMapper>
						</IconButton>
					)}
				</Box>
			</Box>
		</>
	);
}
