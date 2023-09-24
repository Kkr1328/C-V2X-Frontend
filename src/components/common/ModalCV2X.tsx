'use client';

import React from 'react';

import { Card, Divider, IconButton, Modal, Stack } from '@mui/material';

import Pill from './Pill';
import ButtonCV2X from './ButtonCV2X';

import IconMapper from '@/utils/IconMapper';

import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';

interface ModalCV2XProp {
	open: boolean;
	handleOnClose: () => void;
	variant:
		| 'Inform'
		| BUTTON_LABEL.DELETE
		| BUTTON_LABEL.REGISTER
		| BUTTON_LABEL.UPDATE;
	title: string;
	handleLocate?: () => void;
	pill?: keyof typeof PILL_LABEL;
	children?: React.ReactElement;
	onSubmit?: () => void;
	isLoading?: boolean;
}

export default function ModalCV2X(props: ModalCV2XProp) {
	return (
		<Modal
			open={props.open}
			onClose={props.handleOnClose}
			className="flex items-center justify-center"
		>
			<Card className="w-600 rounded-lg">
				{/* Header */}
				<Stack direction="row" className="p-16 gap-16 items-center">
					<Stack direction="row" className="gap-4">
						<p className="inline-block align-baseline font-istok text-black text-h3">
							{props.title}
						</p>
						{props.handleLocate && (
							<IconButton
								disableRipple
								className="p-none text-primary_blue"
								disabled={props.isLoading}
								onClick={props.handleLocate}
							>
								<IconMapper icon={BUTTON_LABEL.LOCATION} />
							</IconButton>
						)}
					</Stack>
					{!props.isLoading && props.pill && <Pill variant={props.pill} />}
					{props.variant === 'Inform' && (
						<>
							<div className="grow" />
							<IconButton
								disableRipple
								className="p-none"
								onClick={props.handleOnClose}
							>
								<IconMapper icon={BUTTON_LABEL.CANCLE} />
							</IconButton>
						</>
					)}
				</Stack>
				<Divider />
				{/* Content */}
				<div className="p-16 flex gap-16">{props.children}</div>
				{/* Action */}
				{props.variant !== 'Inform' && (
					<>
						<Divider />
						<div className="p-16 flex gap-16">
							<div className="grow" />
							<ButtonCV2X
								variant="text"
								color="secondary"
								label={BUTTON_LABEL.CANCLE}
								onClick={props.handleOnClose}
							/>
							<ButtonCV2X
								variant="contained"
								color={
									props.variant === BUTTON_LABEL.DELETE ? 'error' : 'accept'
								}
								isDisabled={props.isLoading}
								label={props.variant}
								onClick={props.onSubmit}
							/>
						</div>
					</>
				)}
			</Card>
		</Modal>
	);
}
