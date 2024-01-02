'use client';

import { Toolbar } from '@mui/material';

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
			<EmergencyWrapper>
				<SnackbarProvider maxSnack={3}>
					<div className="flex w-[100vw] h-[100vh] bg-dark_background_grey">
						<Header />
						<Navbar />
						<div className="flex flex-col w-full h-full px-32 py-32 bg-dark_background_grey overflow-x-auto overflow-y-auto">
							<Toolbar />
							{children}
						</div>
					</div>
				</SnackbarProvider>
			</EmergencyWrapper>
		</QueryClientProvider>
	);
}
