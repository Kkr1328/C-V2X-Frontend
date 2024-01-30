// material ui
import { TableCell } from '@mui/material';
// components
import StatusDot from '@/components/common/StatusDot';
import Text from '@/components/common/Text';
// types
import { TableHeaderProps } from '@/types/ENTITY';
// const
import { STATUS } from '@/constants/LABEL';

interface TableStringCellProp<T> {
	column: TableHeaderProps<T>;
	row: T;
}

export default function TableStringCell<T>(props: TableStringCellProp<T>) {
	const content = props.row[props.column.id as keyof T] as string;

	if ((content || '').length === 0)
		return (
			<TableCell align={'center'} className="w-full">
				<StatusDot variant={STATUS.MISSING} />
			</TableCell>
		);

	return (
		<TableCell align={props.column.align} className="w-full">
			<div className={`w-full ${props.column.id !== 'id' && 'flex truncate'}`}>
				<Text
					style="text-black text-p1"
					content={content}
					isTruncate={props.column.id !== 'id'}
				/>
			</div>
		</TableCell>
	);
}
