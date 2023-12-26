// material ui
import { TableCell } from '@mui/material';
// components
import StatusDot from '@/components/common/StatusDot';
// types
import { TableHeaderProps } from '@/types/ENTITY';

interface TableStringCellProp<T> {
	column: TableHeaderProps<T>;
	row: T;
}

export default function TableStringCell<T>(props: TableStringCellProp<T>) {
	if (((props.row[props.column.id as keyof T] as string) || '').length === 0)
		return (
			<TableCell align={'center'} className="w-full">
				<StatusDot variant={'Missing'} />
			</TableCell>
		);
	return (
		<TableCell align={props.column.align} className="w-full">
			<p className="break-all inline-block align-baseline font-istok text-black text-p1">
				{props.row[props.column.id as keyof T] as string}
			</p>
		</TableCell>
	);
}
