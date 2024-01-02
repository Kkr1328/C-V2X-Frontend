'use client';

import { Box, Toolbar } from '@mui/material';

import { SnackbarProvider } from 'notistack';

import Header from '../common/Header';
import Navbar from './Navbar';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmergencyWrapper from './EmergencyWrapper';

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider maxSnack={3}>
				<Box className="w-[100vw] h-[100dvh] flex bg-dark_background_grey">
					<Header />
					<Navbar />
					<Box className="flex flex-col w-full h-full px-32 py-32 bg-dark_background_grey overflow-x-auto overflow-y-auto">
						<Toolbar />
						{children}
					</Box>
				</SnackbarProvider>
			</EmergencyWrapper>
		</QueryClientProvider>
	);
}
