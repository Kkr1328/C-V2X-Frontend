'use client';
// react
import { useEffect, useRef, useState } from 'react';
// next
import Script from 'next/script';
// material ui
import Grid from '@mui/material/Grid';
// components
import PageTitle from '@/components/common/PageTitle';
import CameraCard from '@/components/module/Camera/CameraCard';
// const
import { NAVBAR_LABEL } from '@/constants/LABEL';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
import { useQuery } from '@tanstack/react-query';
import { ICar } from '@/types/models/car.model';
import { getCarsAPI } from '@/services/api-call';
import Loading from '@/components/common/Loading';
import NoData from '@/components/common/NoData';

export default function Home() {
	// handle page responsive
	const contentRef = useRef<HTMLDivElement>(null);
	const [contentWidth, setContentWidth] = useState<number>(
		contentRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(contentRef.current, setContentWidth), []);
	const useCompactLayout = contentWidth < 1200;

	// query
	const { isLoading: isCarsLoading, data: cars } = useQuery<ICar[]>({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI({}),
	});

	return (
		<>
			{isCarsLoading && <Loading size={48} isBackdrop />}
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
					{isCarsLoading ? (
						<>
							<Grid item key={0} xs={20}>
								<CameraCard carId="" carName="" cameras={[]} isLoading />
							</Grid>
							<Grid item key={1} xs={20}>
								<CameraCard carId="" carName="" cameras={[]} isLoading />
							</Grid>
							<Grid item key={2} xs={20}>
								<CameraCard carId="" carName="" cameras={[]} isLoading />
							</Grid>
							<Grid item key={3} xs={20}>
								<CameraCard carId="" carName="" cameras={[]} isLoading />
							</Grid>
						</>
					) : cars?.length === 0 ? (
						<Grid item key={0} xs={41} className="h-[calc(100vh-144px)]">
							<NoData size="large" />
						</Grid>
					) : (
						<>
							{cars?.map((car: ICar, index) => (
								<Grid item key={index} xs={useCompactLayout ? 41 : 20}>
									<CameraCard
										carId={car.id}
										carName={car.name}
										cameras={car.cameras}
									/>
								</Grid>
							))}
						</>
					)}
				</Grid>
			</div>
		</>
	);
}
