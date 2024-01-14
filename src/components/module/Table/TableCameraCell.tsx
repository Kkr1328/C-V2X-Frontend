// metarial ui
import { TableCell } from '@mui/material';
// components
import StatusDot from '@/components/common/StatusDot';
// types
import { CameraType, TableHeaderProps } from '@/types/ENTITY';

interface TableCameraCellProp<T> {
	column: TableHeaderProps<T>;
	row: T;
}

export default function TableCameraCell<T>(props: TableCameraCellProp<T>) {
	if ((props.row[props.column.id as keyof T] as CameraType[]).length === 0)
		return (
			<TableCell align={'center'} className="w-full">
				<StatusDot variant={'Missing'} />
			</TableCell>
		);
	return (
		<TableCell align={props.column.align} className="w-full">
			{(props.row[props.column.id as keyof T] as CameraType[]).map(
				(camera, index) => (
					<div key={index} className="flex flex-row flex-wrap">
						<p className="break-all inline-block align-baseline font-istok text-black text-p1">
							{camera.name}
						</p>
						<p className="inline-block align-baseline font-istok text-light_text_grey text-p1">
							&nbsp;-&nbsp;
							{camera.position}
						</p>
					</div>
				)
			)}
		</TableCell>
	);
}
