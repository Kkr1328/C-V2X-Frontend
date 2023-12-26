// material ui
import { IconButton, Stack, TableCell } from '@mui/material';
// const
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

export interface TableEntityActionButtonsCellProp<T> {
	row?: T;
	align?: 'right' | 'left' | 'center';
	handleOnClickInformation?: (informData: T) => void;
	handleOnClickUpdate?: (updateData: T) => void;
	handleOnClickDelete?: (deleteData: T) => void;
}

export default function TableEntityActionButtonsCell<T>(
	props: TableEntityActionButtonsCellProp<T>
) {
	return (
		<TableCell align={props.align} sx={{ width: '132px' }}>
			<Stack direction="row" className="gap-8 justify-center">
				<IconButton
					disableRipple
					className="p-none text-primary_blue"
					onClick={() => props.handleOnClickInformation?.(props.row as T)}
				>
					<IconMapper icon={BUTTON_LABEL.SEARCH} />
				</IconButton>
				<IconButton
					disableRipple
					className="p-none text-black"
					onClick={() => props.handleOnClickUpdate?.(props.row as T)}
				>
					<IconMapper icon={BUTTON_LABEL.UPDATE} />
				</IconButton>
				<IconButton
					disableRipple
					className="p-none text-error_red"
					onClick={() => props.handleOnClickDelete?.(props.row as T)}
				>
					<IconMapper icon={BUTTON_LABEL.DELETE} />
				</IconButton>
			</Stack>
		</TableCell>
	);
}
