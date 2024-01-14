// material ui
import { CircularProgress, Modal } from '@mui/material';

interface LoadingProps {
	isBackdrop?: boolean;
	size?: 24 | 36 | 48;
}

export default function Loading(props: LoadingProps) {
	if (props.isBackdrop)
		return (
			<Modal
				open={true}
				disableAutoFocus
				className="flex items-center justify-center"
			>
				<CircularProgress
					size={props.size || 24}
					className="text-primary_blue"
				/>
			</Modal>
		);

	return (
		<div className="flex w-full h-full items-center justify-center">
			<CircularProgress size={props.size || 24} className="text-primary_blue" />
		</div>
	);
}
