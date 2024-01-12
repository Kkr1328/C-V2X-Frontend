'use client';

import React from 'react';

import { Card, Divider, IconButton, Modal, Stack } from '@mui/material';

import IconMapper from '@/utils/IconMapper';

import { BUTTON_LABEL } from '@/constants/LABEL';

interface ModalCameraProp {
	open: boolean;
	handleOnClose: () => void;
	title: string;
	children?: React.ReactElement;
	isLoading?: boolean;
}

export default function ModalCamera(props: ModalCameraProp) {
	return (
		<Modal
			open={props.open}
			onClose={props.handleOnClose}
			className="flex items-center justify-center"
		>
			<Card className="rounded-lg">
				{/* Header */}
				<Stack direction="row" className="p-16 gap-16 items-center">
					<Stack direction="row" className="gap-4">
						<p className="inline-block align-baseline font-istok text-black text-h3">
							{props.title}
						</p>
					</Stack>
					<>
						<div className="grow" />
						<IconButton disableRipple className="p-none" onClick={props.handleOnClose}>
							<IconMapper icon={BUTTON_LABEL.CANCLE} />
						</IconButton>
					</>
				</Stack>
				<Divider />
				{/* Content */}
				<div className="p-16">{props.children}</div>
			</Card>
		</Modal>
	);
}
