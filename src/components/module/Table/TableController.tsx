import ButtonCV2X from '@/components/common/ButtonCV2X';
import Text from '@/components/common/Text';
import { BUTTON_LABEL } from '@/constants/LABEL';
import { Stack } from '@mui/material';

interface TableControllerProps {
	numberOfRow: Number;
	registerLabel: BUTTON_LABEL;
	handleOnClickRegister: () => void;
	handleOnClickRefresh: () => void;
}

export default function TableController(props: TableControllerProps) {
	return (
		<Stack direction="row" className="gap-8">
			<Text
				style="text-dark_text_grey text-h5 self-center"
				content={`Total (${props.numberOfRow})`}
			/>
			<div className="grow" />
			<ButtonCV2X
				icon={BUTTON_LABEL.REGISTER}
				label={props.registerLabel}
				variant="contained"
				onClick={props.handleOnClickRegister}
			/>
			<ButtonCV2X
				icon={BUTTON_LABEL.REFRESH}
				label={BUTTON_LABEL.REFRESH}
				variant="outlined"
				onClick={props.handleOnClickRefresh}
			/>
		</Stack>
	);
}
