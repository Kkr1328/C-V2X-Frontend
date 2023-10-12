// react
import { Fragment } from 'react';
// material ui
import { CircularProgress, Modal } from '@mui/material';

interface LoadingProps {
	isBackdrop?: boolean;
	size?: 24 | 36 | 48;
}

export default function Loading(props: LoadingProps) {
	return (
		<Fragment>
			{props.isBackdrop ? (
				<Modal open={true} className="flex items-center justify-center">
					<CircularProgress
						size={props.size || 24}
						className="text-primary_blue"
					/>
				</Modal>
			) : (
				<CircularProgress
					size={props.size || 24}
					className="text-primary_blue"
				/>
			)}
		</Fragment>
	);
}
