import ButtonCV2X from '@/components/common/ButtonCV2X';
import { BUTTON_LABEL } from '@/constants/LABEL';
import { Stack } from '@mui/material';

export interface FilterActionButtonsProp {
	handleClearSearch: () => void;
	handleSubmitSearch: () => void;
}

export default function FilterActionButtons(props: FilterActionButtonsProp) {
	return (
		<Stack direction="row" className="w-full gap-8">
			<div className="grow" />
			<ButtonCV2X
				icon={BUTTON_LABEL.CLEAR}
				label={BUTTON_LABEL.CLEAR}
				variant="outlined"
				onClick={props.handleClearSearch}
			/>
			<ButtonCV2X
				icon={BUTTON_LABEL.SEARCH}
				label={BUTTON_LABEL.SEARCH}
				variant="contained"
				onClick={props.handleSubmitSearch}
			/>
		</Stack>
	);
}
