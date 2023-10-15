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
import NoData from '@/components/common/NoData';
import StatusDot from '@/components/common/StatusDot';
// uitls
import IconMapper from '@/utils/IconMapper';
// consts
import { BUTTON_LABEL } from '@/constants/LABEL';
// types
import { CameraType, TableHeaderProps, TableRowProps } from '@/types/ENTITY';

interface TableCV2XProps<T extends TableRowProps> {
	columns: TableHeaderProps<T>[];
	rows: T[];
	handleOnClickLocation?: () => void;
	handleOnClickInformation?: (informData: T) => void;
	handleOnClickUpdate?: (updateData: T) => void;
	handleOnClickDelete?: (deleteData: T) => void;
	isLoading?: boolean;
}

function HeaderCell<T>(props: { column: TableHeaderProps<T>; index: number }) {
	return (
		<TableCell
			key={props.index}
			align={props.column.align}
			className="p-16 bg-dark_background_grey"
			sx={{
				width: props.column.id === 'action' ? '132px' : 'auto',
			}}
		>
			<p className="inline-block align-baseline font-istok text-black text-h5">
				{props.column.label}
			</p>
		</TableCell>
	);
}

function MissingValueCell(props: { index: number }) {
	return (
		<TableCell key={props.index} align={'center'} className="w-full">
			<StatusDot variant={'Missing'} />
		</TableCell>
	);
}

function CameraCell<T>(props: {
	column: TableHeaderProps<T>;
	row: T;
	index: number;
}) {
	return (
		<TableCell key={props.index} align={props.column.align} className="w-full">
			{(props.row[props.column.id as keyof T] as CameraType[]).map(
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
}

function StringCell<T>(props: {
	column: TableHeaderProps<T>;
	row: T;
	index: number;
}) {
	return (
		<TableCell key={props.index} align={props.column.align} className="w-full">
			<p className="break-all inline-block align-baseline font-istok text-black text-p1">
				{props.row[props.column.id as keyof T] as string}
			</p>
		</TableCell>
	);
}

function InformationButton(props: { onClick: () => void }) {
	return (
		<IconButton
			disableRipple
			className="p-none text-primary_blue"
			onClick={props.onClick}
		>
			<IconMapper icon={BUTTON_LABEL.SEARCH} />
		</IconButton>
	);
}

function EditButton(props: { onClick: () => void }) {
	return (
		<IconButton
			disableRipple
			className="p-none text-black"
			onClick={props.onClick}
		>
			<IconMapper icon={BUTTON_LABEL.UPDATE} />
		</IconButton>
	);
}

function DeleteButton(props: { onClick: () => void }) {
	return (
		<IconButton
			disableRipple
			className="p-none text-error_red"
			onClick={props.onClick}
		>
			<IconMapper icon={BUTTON_LABEL.DELETE} />
		</IconButton>
	);
}

export default function TableCV2X<T extends TableRowProps>(
	props: TableCV2XProps<T>
) {
	return (
		<TableContainer className="flex flex-col grow h-full overflow-y-scroll">
			<Table stickyHeader sx={{ width: '100%', tableLayout: 'fixed' }}>
				<TableHead>
					<TableRow>
						{props.columns.map((column, index) => (
							<HeaderCell column={column} index={index} />
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
													<InformationButton
														onClick={() =>
															props.handleOnClickInformation?.(row)
														}
													/>
													<EditButton
														onClick={() => props.handleOnClickUpdate?.(row)}
													/>
													<DeleteButton
														onClick={() => props.handleOnClickDelete?.(row)}
													/>
												</Stack>
											</TableCell>
										);
									} else if (column.id === 'cameras') {
										return (
											<React.Fragment>
												{(row[column.id] as CameraType[]).length === 0 ? (
													<MissingValueCell index={index} />
												) : (
													<CameraCell column={column} row={row} index={index} />
												)}
											</React.Fragment>
										);
									} else {
										return (
											<React.Fragment>
												{(row[column.id] as string).length === 0 ? (
													<MissingValueCell index={index} />
												) : (
													<StringCell column={column} row={row} index={index} />
												)}
											</React.Fragment>
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
