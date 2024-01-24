// material ui
import { IconButton, TableCell, TableRowProps } from '@mui/material';
// const
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

export interface TableHeartbeatActionButtonsCellProp<T extends TableRowProps> {
	row?: T;
	align?: 'right' | 'left' | 'center';
	handleOnClickLocation?: (id: string) => void;
	handleOnClickInformation?: (informData: T) => void;
}

export default function TableHeartbeatActionButtonsCell<
	T extends TableRowProps
>(props: TableHeartbeatActionButtonsCellProp<T>) {
	return (
		<TableCell align={props.align} sx={{ width: '132px' }}>
			<div className="flex flex-row gap-8 justify-center">
				<IconButton
					disableRipple
					className="p-none text-primary_blue"
					onClick={() =>
						props.handleOnClickLocation?.((props.row as T).id as string)
					}
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
			</div>
		</TableCell>
	);
}
