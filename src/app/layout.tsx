import './globals.css';
import type { Metadata } from 'next';
import { Istok_Web } from 'next/font/google';

import { Box, Toolbar } from '@mui/material';

import Header from '@/components/common/Header';
import Navbar from '@/components/module/Navbar';

const istok_web = Istok_Web({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-istok-web',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang="en" className={`${istok_web.variable} font-sans`}>
				<body suppressHydrationWarning={true}>
					<Box className="w-screen h-screen flex bg-dark_background_grey">
						<Header />
						<Navbar />
						<Box className="grow px-32 py-32">
							<Toolbar />
							{children}
						</Box>
					</Box>
				</body>
			</html>
		</>
	);
}
