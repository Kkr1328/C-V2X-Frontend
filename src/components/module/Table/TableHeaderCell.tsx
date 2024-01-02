import { TableHeaderProps } from '@/types/ENTITY';
import { TableCell } from '@mui/material';

interface TableHeaderCellProp<T> {
	column: TableHeaderProps<T>;
}

export default function TableHeaderCell<T>(props: TableHeaderCellProp<T>) {
	return (
		<TableCell
			align={props.column.align}
			className="p-16 bg-dark_background_grey w-[120px]"
		>
			<p className="inline-block align-baseline font-istok text-black text-h5">
				{props.column.label}
			</p>
		</TableCell>
	);
}
