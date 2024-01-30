import './globals.css';
import type { Metadata } from 'next';
import { Istok_Web } from 'next/font/google';

import LayoutWrapper from '@/components/module/Wrapper/LayoutWrapper';
import { Suspense } from 'react';
import Loading from './loading';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const istok_web = Istok_Web({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-istok-web',
});

export const metadata: Metadata = {
	title: 'C-V2X',
	description: 'Cellular - Vehicle to everything',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang="en" className={`${istok_web.variable} font-sans`}>
				<body id="__next" suppressHydrationWarning={true}>
					<Script
						src="/scripts/RTCMultiConnection.min.js"
						strategy="beforeInteractive"
					/>
					<Script src="/scripts/socket.io.js" strategy="beforeInteractive" />
					<LayoutWrapper>
						<Suspense fallback={<Loading />}>
							{children}
							<SpeedInsights />
						</Suspense>
					</LayoutWrapper>
				</body>
			</html>
		</>
	);
}
