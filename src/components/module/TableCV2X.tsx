import * as React from 'react';

import {
	Table,
	TableContainer,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	IconButton,
	Stack,
} from '@mui/material';

import IconMapper from '@/utils/IconMapper';

import { BUTTON_LABEL } from '@/constants/LABEL';
import { CameraType, TableHeaderProps, TableRowProps } from '@/types/ENTITY';

interface TableCV2XProps<T extends TableRowProps> {
	columns: TableHeaderProps<T>[];
	rows: T[];
	handleOnClickLocation?: () => void;
	handleOnClickInformation?: (informData: T) => void;
	handleOnClickUpdate?: (updateData: T) => void;
	handleOnClickDelete?: (deleteData: T) => void;
}

export default function TableCV2X<T extends TableRowProps>(
	props: TableCV2XProps<T>
) {
	return (
		<TableContainer className="grow overflow-y-scroll">
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{props.columns.map((column, index) => (
							<React.Fragment key={index}>
								<TableCell
									className="p-16 bg-dark_background_grey"
									key={`header_item_${index}`}
									align={column.align}
								>
									<p className="inline-block align-baseline font-istok text-black text-h5">
										{column.label}
									</p>
								</TableCell>
							</React.Fragment>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{props.rows.map((row: T) => {
						return (
							<TableRow hover tabIndex={-1} key={row.id}>
								{props.columns.map((column, index) => {
									if (column.id !== 'action') {
										return (
											<TableCell key={`row_item_${index}`} align={column.align}>
												{column.id === 'cameras' ? (
													(row[column.id] as CameraType[]).map((camera) => (
														<Stack direction="row">
															<p className="inline-block align-baseline font-istok text-black text-p1">
																{camera.name as React.ReactNode}
															</p>
															<p className="inline-block align-baseline font-istok text-light_text_grey text-p1">
																&nbsp;-&nbsp;
																{camera.position as React.ReactNode}
															</p>
														</Stack>
													))
												) : (
													<p className="inline-block align-baseline font-istok text-black text-p1">
														{row[column.id] as React.ReactNode}
													</p>
												)}
											</TableCell>
										);
									} else {
										return (
											<TableCell
												key={column.id}
												align={column.align}
												sx={{ width: '132px' }}
											>
												<Stack direction="row" className="gap-8 justify-center">
													<IconButton
														disableRipple
														className="p-none text-primary_blue"
														onClick={() => {
															props.handleOnClickInformation &&
																props.handleOnClickInformation(row);
														}}
													>
														<IconMapper icon={BUTTON_LABEL.SEARCH} />
													</IconButton>
													<IconButton
														disableRipple
														className="p-none text-black"
														onClick={() => {
															props.handleOnClickUpdate &&
																props.handleOnClickUpdate(row);
														}}
													>
														<IconMapper icon={BUTTON_LABEL.UPDATE} />
													</IconButton>
													<IconButton
														disableRipple
														className="p-none text-error_red"
														onClick={() => {
															props.handleOnClickDelete &&
																props.handleOnClickDelete(row);
														}}
													>
														<IconMapper icon={BUTTON_LABEL.DELETE} />
													</IconButton>
												</Stack>
											</TableCell>
										);
									}
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
