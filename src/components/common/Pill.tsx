import { Chip } from '@mui/material';

import { PILL_LABEL } from '@/constants/LABEL';

interface PillProps {
	variant: keyof typeof PILL_LABEL;
}

export default function Pill(props: PillProps) {
	return (
		<Chip
			sx={{
				height: '20px',
				'& .MuiChip-label': {
					p: 0,
				},
			}}
			label={<p className="font-istok text-h5">{props.variant}</p>}
			variant="outlined"
			className={`px-4 py-0 border-2 ${
				props.variant === 'INACTIVE'
					? 'text-light_text_grey border-light_text_grey'
					: props.variant === 'EMERGENCY'
					? 'text-error_red border-error_red'
					: 'text-active_green border-active_green'
			} rounded-sm`}
		/>
	);
}
