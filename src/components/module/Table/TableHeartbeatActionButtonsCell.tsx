// material ui
import { IconButton, Stack, TableCell } from '@mui/material';
// const
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

export interface TableHeartbeatActionButtonsCellProp<T> {
	row?: T;
	align?: 'right' | 'left' | 'center';
	handleOnClickLocation?: () => void;
	handleOnClickInformation?: (informData: T) => void;
}

export default function TableHeartbeatActionButtonsCell<T>(
	props: TableHeartbeatActionButtonsCellProp<T>
) {
	return (
		<TableCell align={props.align} sx={{ width: '132px' }}>
			<Stack direction="row" className="gap-8 justify-center">
				<IconButton
					disableRipple
					className="p-none text-primary_blue"
					onClick={() => props.handleOnClickLocation?.()}
				>
					<IconMapper icon={BUTTON_LABEL.LOCATION} />
				</IconButton>
				<IconButton
					disableRipple
					className="p-none text-primary_blue"
					onClick={() => props.handleOnClickInformation?.(props.row as T)}
				>
					<IconMapper icon={BUTTON_LABEL.SEARCH} />
				</IconButton>
			</Stack>
		</TableCell>
	);
}
