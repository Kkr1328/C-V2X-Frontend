// next
import { useRouter } from 'next/navigation';
// material ui
import { IconButton, TableCell, TableRowProps } from '@mui/material';
// const
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';
import { useHandleCarLocate, useHandleRSULocate } from '@/utils/FleetRetriever';

export interface TableHeartbeatActionButtonsCellProp<T extends TableRowProps> {
	row?: T;
	align?: 'right' | 'left' | 'center';
	id?: string;
	handleOnClickInformation?: (informData: T) => void;
}

export default function TableHeartbeatActionButtonsCell<
	T extends TableRowProps
>(props: TableHeartbeatActionButtonsCellProp<T>) {
	const router = useRouter();

	const handleCarLocate = useHandleCarLocate(router, props.id ?? '');
	const handleRSULocate = useHandleRSULocate(router, props.id ?? '');

	const handleLocate = handleCarLocate || handleRSULocate;

	return (
		<TableCell align={props.align} sx={{ width: '132px' }}>
			<div className="flex flex-row gap-8 justify-center">
				<IconButton
					disableRipple
					className="p-none text-primary_blue disabled:text-light_text_grey"
					disabled={!handleLocate}
					onClick={handleLocate}
				>
					<IconMapper icon={BUTTON_LABEL.LOCATION} />
				</IconButton>
				<IconButton
					disableRipple
					className="p-none text-primary_blue disabled:text-light_text_grey"
					onClick={() => props.handleOnClickInformation?.(props.row as T)}
				>
					<IconMapper icon={BUTTON_LABEL.SEARCH} />
				</IconButton>
			</div>
		</TableCell>
	);
}
