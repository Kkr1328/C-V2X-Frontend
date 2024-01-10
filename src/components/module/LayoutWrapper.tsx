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
					<div className="flex w-[100dvw] h-[100dvh] bg-dark_background_grey">
						<Header />
						<Navbar />
						<div className="pt-[96px] flex flex-col w-[100dvw] h-[100dvh] px-32 py-32 bg-dark_background_grey overflow-x-auto overflow-y-auto">
							{children}
						</div>
					</div>
				</SnackbarProvider>
			</EmergencyWrapper>
		</QueryClientProvider>
	);
}
