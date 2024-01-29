// material ui
import { TableCell } from '@mui/material';
// components
import StatusDot from '@/components/common/StatusDot';
// const
import { STATUS } from '@/constants/LABEL';

interface TableStatusCellProp<T> {
	variant: T[keyof T];
}

export default function TableStatusCell<T>(props: TableStatusCellProp<T>) {
	return (
		<TableCell align={'center'} className="w-full">
			<StatusDot variant={props.variant as STATUS} />
		</TableCell>
	);
}
