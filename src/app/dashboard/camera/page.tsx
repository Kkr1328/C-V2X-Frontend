'use client';
// react
import { useEffect, useRef, useState } from 'react';
// next
import Script from 'next/script';
import { useRouter } from 'next/navigation';
// material ui
import Grid from '@mui/material/Grid';
// components
import PageTitle from '@/components/common/PageTitle';
import CameraCard from '@/components/module/CameraCard';
// const
import { NAVBAR_LABEL, PILL_LABEL } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';
// types
import { Position } from '@/types/COMMON';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';

const MockedCarCamerasContent = [
	{
		name: 'Car01',
		status: 'ACTIVE',
		cameras: [
			{
				name: 'Cam01',
				position: 'Front' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam02',
				position: 'Back' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam03',
				position: 'Left' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam04',
				position: 'Right' as Position,
				status: PILL_LABEL.ACTIVE,
			},
		],
	},
	{
		name: 'Car02',
		status: 'ACTIVE',
		cameras: [
			{
				name: 'Cam01',
				position: 'Front' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam02',
				position: 'Back' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam03',
				position: 'Left' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam04',
				position: 'Right' as Position,
				status: PILL_LABEL.ACTIVE,
			},
		],
	},
	{
		name: 'Car03',
		status: 'ACTIVE',
		cameras: [
			{
				name: 'Cam01',
				position: 'Front' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam02',
				position: 'Back' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam03',
				position: 'Left' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam04',
				position: 'Right' as Position,
				status: PILL_LABEL.ACTIVE,
			},
		],
	},
	{
		name: 'Car04',
		status: 'ACTIVE',
		cameras: [
			{
				name: 'Cam01',
				position: 'Front' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam02',
				position: 'Back' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam03',
				position: 'Left' as Position,
				status: PILL_LABEL.ACTIVE,
			},
			{
				name: 'Cam04',
				position: 'Right' as Position,
				status: PILL_LABEL.ACTIVE,
			},
		],
	},
];

export default function Home() {
	const router = useRouter();
	const contentRef = useRef<HTMLDivElement>(null);
	const [contentWidth, setContentWidth] = useState<number>(
		contentRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(contentRef.current, setContentWidth), []);
	const useCompactLayout = contentWidth < 1200;

	return (
		<>
			<Script
				src="https://muazkhan.com:9001/dist/RTCMultiConnection.min.js"
				strategy="beforeInteractive"
			/>
			<Script
				src="https://muazkhan.com:9001/socket.io/socket.io.js"
				strategy="beforeInteractive"
			/>
			<div ref={contentRef} className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.CAMERA} />
				<Grid
					container
					columns={{ xs: 41 }}
					rowSpacing={2}
					columnSpacing={1}
					className="justify-center"
				>
					{MockedCarCamerasContent.map((data, index) => (
						<Grid item key={index} xs={useCompactLayout ? 41 : 20}>
							<CameraCard
								carName={data.name}
								status={PILL_LABEL.ACTIVE}
								cameras={data.cameras}
								handleLocate={() =>
									router.push(`${ROUTE.OVERVIEW}?id=${data.name}`)
								}
							/>
						</Grid>
					))}
				</Grid>
			</div>
		</>
	);
}
