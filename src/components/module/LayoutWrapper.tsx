'use client';

import { SnackbarProvider } from 'notistack';

import Header from '../common/Header';
import Navbar from './Navbar';
import { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmergencyWrapper from './EmergencyWrapper';
import Loading from '../common/Loading';
import FleetWrapper from './FleetWrapper';

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<EmergencyWrapper>
				<FleetWrapper>
					<SnackbarProvider maxSnack={3}>
						<div className="flex w-[100dvw] h-[100dvh] bg-dark_background_grey">
							<Header />
							<Navbar />
							<Suspense fallback={<Loading isBackdrop />}>
								<div className="pt-[96px] flex flex-col w-[100dvw] h-[100dvh] px-32 py-32 bg-dark_background_grey overflow-x-auto overflow-y-auto">
									{children}
								</div>
							</Suspense>
						</div>
					</SnackbarProvider>
				</FleetWrapper>
			</EmergencyWrapper>
		</QueryClientProvider>
	);
}
