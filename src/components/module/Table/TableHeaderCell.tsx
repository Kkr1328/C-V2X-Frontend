// material ui
import { TableCell } from '@mui/material';
// components
import Text from '@/components/common/Text';
// types
import { TableHeaderProps } from '@/types/ENTITY';

interface TableHeaderCellProp<T> {
	column: TableHeaderProps<T>;
}

export default function TableHeaderCell<T>(props: TableHeaderCellProp<T>) {
	return (
		<TableCell
			align={props.column.align}
			className="p-16 bg-dark_background_grey w-[120px]"
		>
			<Text
				style="text-black text-h5"
				content={props.column.label}
				isSentence
			/>
		</TableCell>
	);
}
