// metarial ui
import { TableCell } from '@mui/material';
// components
import StatusDot from '@/components/common/StatusDot';
import Text from '@/components/common/Text';
// types
import { CameraType, TableHeaderProps } from '@/types/ENTITY';
// const
import { STATUS } from '@/constants/LABEL';

interface TableCameraCellProp<T> {
	column: TableHeaderProps<T>;
	row: T;
}

export default function TableCameraCell<T>(props: TableCameraCellProp<T>) {
	const cameras = props.row[props.column.id as keyof T] as CameraType[];

	if (cameras.length === 0)
		return (
			<TableCell align={'center'} className="w-full">
				<StatusDot variant={STATUS.MISSING} />
			</TableCell>
		);

	return (
		<TableCell align={props.column.align} className="w-full">
			{cameras.map((camera, index) => (
				<div key={index} className="flex flex-row flex-wrap gap-8">
					<Text style="text-black text-p1" content={camera.name} />
					<Text
						style="text-light_text_grey text-p1"
						content={`- ${camera.position}`}
					/>
				</div>
			))}
		</TableCell>
	);
}
