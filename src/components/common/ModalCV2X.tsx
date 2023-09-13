'use client';

import React from 'react';

import { Card, Divider, IconButton, Modal } from '@mui/material';

import Pill from './Pill';
import ButtonCV2X from './ButtonCV2X';

import IconMapper from '@/utils/IconMapper';

import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';

interface ModalCV2XProp {
	variant: 'Inform' | 'Delete' | 'Register' | 'Edit';
	title: string;
	pill?: keyof typeof PILL_LABEL;
	children?: React.ReactElement;
	onSubmit?: () => void;
}

export default function ModalCV2X(props: ModalCV2XProp) {
	const [open, setOpen] = React.useState<boolean>(true);

	const handleCloseModel = () => setOpen(false);

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			className="flex items-center justify-center">
			<Card className="w-600 rounded-lg">
				<div className="p-16 items-center flex gap-16">
					<p className="text-h3 text-black">{props.title}</p>
					{props.pill && <Pill variant={props.pill} />}
					{props.variant === 'Inform' && (
						<>
							<div className="grow" />
							<IconButton
								disableRipple
								className="p-none"
								onClick={handleCloseModel}>
								<IconMapper icon={BUTTON_LABEL.CANCLE} />
							</IconButton>
						</>
					)}
				</div>
				<Divider />
				<div className="p-16 flex gap-16">{props.children}</div>
				{props.variant !== 'Inform' && (
					<>
						<Divider />
						<div className="p-16 flex gap-16">
							<div className="grow" />
							<ButtonCV2X
								variant="text"
								color="secondary"
								label={BUTTON_LABEL.CANCLE}
								onClick={handleCloseModel}
							/>
							{props.variant === 'Delete' ? (
								<ButtonCV2X
									variant="contained"
									color="error"
									label={BUTTON_LABEL.DELETE}
									onClick={props.onSubmit}
								/>
							) : props.variant === 'Register' ? (
								<ButtonCV2X
									variant="contained"
									color="accept"
									label={BUTTON_LABEL.REGISTER}
									onClick={props.onSubmit}
								/>
							) : (
								props.variant === 'Edit' && (
									<ButtonCV2X
										variant="contained"
										color="accept"
										label={BUTTON_LABEL.EDIT}
										onClick={props.onSubmit}
									/>
								)
							)}
						</div>
					</>
				)}
			</Card>
		</Modal>
	);
}
