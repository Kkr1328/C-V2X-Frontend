'use client';

import { Box, Toolbar } from '@mui/material';

import { SnackbarProvider } from 'notistack';

import Header from '../common/Header';
import Navbar from './Navbar';
import StoreProvider from '@/context/StoreProvider';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider maxSnack={3}>
				<StoreProvider>
					<Box className="w-screen h-screen flex bg-dark_background_grey">
						<Header />
						<Navbar />
						<Box className="grow px-32 py-32">
							<Toolbar />
							{children}
						</Box>
					</Box>
				</StoreProvider>
			</SnackbarProvider>
		</QueryClientProvider>
	);
}
