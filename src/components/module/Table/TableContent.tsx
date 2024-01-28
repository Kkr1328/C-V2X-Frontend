// react
import { Fragment } from 'react';
// material ui
import {
	Table,
	TableContainer,
	TableBody,
	TableHead,
	TableRow,
} from '@mui/material';
// components
import Loading from '@/components/common/Loading';
import NoData from '@/components/common/NoData';
import TableEntityActionButtonsCell, {
	TableEntityActionButtonsCellProp,
} from './TableEntityActionButtonsCell';
import TableHeartbeatActionButtonsCell, {
	TableHeartbeatActionButtonsCellProp,
} from './TableHeartbeatActionButtonsCell';
import TableHeaderCell from './TableHeaderCell';
import TableStatusCell from './TableStatusCell';
import TableCameraCell from './TableCameraCell';
import TableStringCell from './TableStringCell';
// types
import { TableHeaderProps, TableRowProps } from '@/types/ENTITY';

export interface TableContentProps<T extends TableRowProps>
	extends TableEntityActionButtonsCellProp<T>,
		TableHeartbeatActionButtonsCellProp<T> {
	columns: TableHeaderProps<T>[];
	rows: T[];
	isLoading?: boolean;
	handleLocate?: (id: string) => (() => void) | undefined;
}

export default function TableContent<T extends TableRowProps>(
	props: TableContentProps<T>
) {
	return (
		<TableContainer
			className={`flex flex-col max-h-[60vh] ${
				props.isLoading || props.rows.length === 0 ? 'h-full' : 'h-auto'
			} min-h-[200px] overflow-x-auto overflow-y-auto`}
		>
			<Table stickyHeader sx={{ width: '100%', tableLayout: 'fixed' }}>
				<TableHead>
					<TableRow>
						{props.columns.map((column, index) => (
							<TableHeaderCell key={index} column={column} />
						))}
					</TableRow>
				</TableHead>
				{!props.isLoading && (
					<TableBody>
						{props.rows.map((row, index) => (
							<TableRow hover tabIndex={-1} key={index}>
								{props.columns.map((column, index) => (
									<Fragment key={index}>
										{column.id === 'action' ? (
											<TableEntityActionButtonsCell
												{...props}
												row={row}
												align={column.align}
											/>
										) : column.id === 'heartbeat_action' ? (
											<TableHeartbeatActionButtonsCell
												{...props}
												row={row}
												align={column.align}
												handleOnClickLocation={props.handleLocate?.(
													(row as T).id as string
												)}
											/>
										) : column.id === 'status' ||
										  column.id === 'front_cam' ||
										  column.id === 'back_cam' ||
										  column.id === 'left_cam' ||
										  column.id === 'right_cam' ? (
											<TableStatusCell variant={row[column.id]} />
										) : column.id === 'cameras' ? (
											<TableCameraCell column={column} row={row} />
										) : (
											<TableStringCell column={column} row={row} />
										)}
									</Fragment>
								))}
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
			{!props.isLoading && props.rows.length === 0 && <NoData />}
			{props.isLoading && <Loading />}
		</TableContainer>
	);
}
