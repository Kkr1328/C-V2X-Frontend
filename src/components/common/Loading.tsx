import { CircularProgress } from '@mui/material';

interface LoadingProps {
	size?: 24 | 36 | 48;
}

export default function Loading(props: LoadingProps) {
	return (
		<CircularProgress size={props.size || 24} className="text-primary_blue" />
	);
}
