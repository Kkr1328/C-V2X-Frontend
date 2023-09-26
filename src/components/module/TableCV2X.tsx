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
import { TableHeaderProps, TableRowProps } from '@/types/ENTITY_TABLE';

interface TableCV2XProps<T extends TableRowProps> {
	columns: TableHeaderProps<T>[];
	rows: T[];
	handleOnClickLocation?: () => void;
	handleOnClickInformation?: () => void;
	handleOnClickEdit?: () => void;
	handleOnClickDelete?: () => void;
}

export default function TableCV2X<T extends TableRowProps>(
	props: TableCV2XProps<T>
) {
	return (
		<TableContainer sx={{ maxHeight: 440 }}>
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
									{/* <Divider
										orientation="vertical"
										className="text-error_red border-error_red bg-error_red"
									/> */}
								</TableCell>
							</React.Fragment>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{props.rows.map((row) => {
						return (
							<TableRow hover tabIndex={-1} key={row.id}>
								{props.columns.map((column, index) => {
									if (column.id !== 'action') {
										return (
											<TableCell key={`row_item_${index}`} align={column.align}>
												<p className="inline-block align-baseline font-istok text-black text-p1">
													{row[column.id] as React.ReactNode}
												</p>
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
														onClick={props.handleOnClickInformation}
													>
														<IconMapper icon={BUTTON_LABEL.SEARCH} />
													</IconButton>
													<IconButton
														disableRipple
														className="p-none text-black"
														onClick={props.handleOnClickEdit}
													>
														<IconMapper icon={BUTTON_LABEL.UPDATE} />
													</IconButton>
													<IconButton
														disableRipple
														className="p-none text-error_red"
														onClick={props.handleOnClickDelete}
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
