'use client';

import { useEffect, useRef, useState } from 'react';

import { Grid } from '@mui/material';

import PageTitle from '@/components/common/PageTitle';

import { NAVBAR_LABEL, PILL_LABEL } from '@/constants/LABEL';
import Script from 'next/script';
import { Position } from '@/types/COMMON';
import CameraCard from '@/components/module/CameraCard';
import { WidthObserver } from '@/utils/WidthObserver';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/constants/ROUTE';
import Loading from '@/components/common/Loading';

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
	const [scriptsLoaded, setScriptsLoaded] = useState(false)

	useEffect(() => {
		const script1 = document.createElement('script');
		script1.src = 'https://muazkhan.com:9001/dist/RTCMultiConnection.min.js';
		script1.async = false; // Set to true if you want async loading
	
		const script2 = document.createElement('script');
		script2.src = 'https://muazkhan.com:9001/socket.io/socket.io.js';
		script2.async = false; // Set to true if you want async loading
	
		const loadScripts = async () => {
		  document.body.appendChild(script1);
		  document.body.appendChild(script2);
	
		  await new Promise((resolve) => {
			script1.onload = script2.onload = resolve;
		  });
	
		  setScriptsLoaded(true);
		};
	
		loadScripts();
	
		// Cleanup scripts on component unmount
		return () => {
		  document.body.removeChild(script1);
		  document.body.removeChild(script2);
		};
	  }, []);
	useEffect(() => WidthObserver(contentRef.current, setContentWidth), []);
	const useCompactLayout = contentWidth < 1200;

	return (
		<>
			{/* <Script
				src="https://muazkhan.com:9001/dist/RTCMultiConnection.min.js"
				strategy="beforeInteractive"
				onLoadedData={()=>setLoadedScript1(true)}
			/>
			<Script
				src="https://muazkhan.com:9001/socket.io/socket.io.js"
				strategy="beforeInteractive"
				onLoadedData={()=>setLoadedScript2(true)}
			/> */}
			{scriptsLoaded ? <div ref={contentRef} className="flex flex-col w-full h-auto gap-16">
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
			</div> : <Loading size={48} isBackdrop /> }
			
		</>
	);
}
