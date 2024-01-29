// material ui
import MuiChip from '@mui/material/Chip';
// components
import Text from './Text';
// consts
import { STATUS } from '@/constants/LABEL';

interface PillProps {
	variant: STATUS;
}

export default function Pill(props: PillProps) {
	const pillColor =
		props.variant === STATUS.INACTIVE
			? 'text-light_text_grey border-light_text_grey'
			: props.variant === STATUS.EMERGENCY
			? 'text-error_red border-error_red'
			: props.variant === STATUS.WARNING
			? 'text-dark_warning_yellow border-dark_warning_yellow'
			: 'text-active_green border-active_green';

	return (
		<MuiChip
			sx={{
				height: '20px',
				'& .MuiChip-label': {
					p: 0,
				},
			}}
			label={<Text style="text-h6" content={props.variant} />}
			variant="outlined"
			className={`px-4 py-0 border-2 ${pillColor} rounded-sm`}
		/>
	);
}
