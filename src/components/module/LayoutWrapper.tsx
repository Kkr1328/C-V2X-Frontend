'use client';

import { Box, Toolbar } from '@mui/material';

import { SnackbarProvider } from 'notistack';

import Header from '../common/Header';
import Navbar from './Navbar';

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SnackbarProvider maxSnack={3}>
			<Box className="w-screen h-screen flex bg-dark_background_grey">
				<Header />
				<Navbar />
				<Box className="grow px-32 py-32">
					<Toolbar />
					{children}
				</Box>
			</Box>
		</SnackbarProvider>
	);
}
