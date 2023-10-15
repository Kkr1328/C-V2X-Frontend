'use client';
// react
import * as React from 'react';
// material ui
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
// components
import Loading from '@/components/common/Loading';
// uitls
import IconMapper from '@/utils/IconMapper';
// consts
import { BUTTON_LABEL } from '@/constants/LABEL';
// types
import { CameraType, TableHeaderProps, TableRowProps } from '@/types/ENTITY';
import NoData from '../common/NoData';

interface TableCV2XProps<T extends TableRowProps> {
	columns: TableHeaderProps<T>[];
	rows: T[];
	handleOnClickLocation?: () => void;
	handleOnClickInformation?: (informData: T) => void;
	handleOnClickUpdate?: (updateData: T) => void;
	handleOnClickDelete?: (deleteData: T) => void;
	isLoading?: boolean;
}

export default function TableCV2X<T extends TableRowProps>(
	props: TableCV2XProps<T>
) {
	return (
		<TableContainer className="flex flex-col grow h-full overflow-y-scroll">
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{props.columns.map((column, index) => (
							<React.Fragment key={index}>
								<TableCell
									key={index}
									align={column.align}
									className="w-full p-16 bg-dark_background_grey"
								>
									<p className="inline-block align-baseline font-istok text-black text-h5">
										{column.label}
									</p>
								</TableCell>
							</React.Fragment>
						))}
					</TableRow>
				</TableHead>
				{!props.isLoading && (
					<TableBody>
						{props.rows.map((row, index) => (
							<TableRow hover tabIndex={-1} key={index}>
								{props.columns.map((column, index) => {
									if (column.id === 'action') {
										return (
											<TableCell
												key={index}
												align={column.align}
												sx={{ width: '132px' }}
											>
												<Stack direction="row" className="gap-8 justify-center">
													<IconButton
														disableRipple
														className="p-none text-primary_blue"
														onClick={() =>
															props.handleOnClickInformation?.(row)
														}
													>
														<IconMapper icon={BUTTON_LABEL.SEARCH} />
													</IconButton>
													<IconButton
														disableRipple
														className="p-none text-black"
														onClick={() => props.handleOnClickUpdate?.(row)}
													>
														<IconMapper icon={BUTTON_LABEL.UPDATE} />
													</IconButton>
													<IconButton
														disableRipple
														className="p-none text-error_red"
														onClick={() => props.handleOnClickDelete?.(row)}
													>
														<IconMapper icon={BUTTON_LABEL.DELETE} />
													</IconButton>
												</Stack>
											</TableCell>
										);
									} else if (column.id === 'cameras') {
										return (
											<TableCell
												key={index}
												align={column.align}
												className="w-full"
											>
												{(row[column.id] as CameraType[]).map(
													(camera, index) => (
														<Stack direction="row" key={index}>
															<p className="inline-block align-baseline font-istok text-black text-p1">
																{camera.name as React.ReactNode}
															</p>
															<p className="inline-block align-baseline font-istok text-light_text_grey text-p1">
																&nbsp;-&nbsp;
																{camera.position as React.ReactNode}
															</p>
														</Stack>
													)
												)}
											</TableCell>
										);
									} else {
										return (
											<TableCell
												key={index}
												align={column.align}
												className="w-full"
											>
												<p className="inline-block align-baseline font-istok text-black text-p1">
													{row[column.id] as React.ReactNode}
												</p>
											</TableCell>
										);
									}
								})}
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
