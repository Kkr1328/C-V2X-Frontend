import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Divider } from '@mui/material';

interface Column {
	id: 'name' | 'code' | 'population' | 'size';
	label: string;
	minWidth?: number;
	align?: 'right';
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
	{
		id: 'population',
		label: 'Population',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'size',
		label: 'Size\u00a0(km\u00b2)',
		minWidth: 170,
		align: 'right',
	},
];

interface Data {
	name: string;
	code: string;
	population: number;
	size: number;
}

const rows: Data[] = [
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
	{
		name: 'India',
		code: 'IN',
		population: 1324171354,
		size: 3287263,
	},
];

export default function StickyHeadTable() {
	return (
		<TableContainer sx={{ maxHeight: 440 }}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth }}
							>
								{column.label}
								<Divider orientation="vertical" variant="middle" flexItem />
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
						return (
							<TableRow hover tabIndex={-1} key={row.code}>
								{columns.map((column) => {
									const value = row[column.id];
									return (
										<TableCell key={column.id} align={column.align}>
											{value}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
