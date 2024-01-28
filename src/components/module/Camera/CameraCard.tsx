// react
import { useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid, IconButton, Skeleton } from '@mui/material';
// components
import Pill from '../../common/Pill';
import CameraSection from './CameraSection';
// const
import { BUTTON_LABEL, STATUS } from '@/constants/LABEL';
// types
import { CameraType } from '@/types/ENTITY';
// utilities
import IconMapper from '@/utils/IconMapper';
import { WidthObserver } from '@/utils/WidthObserver';
import { carStatus, handleCarLocate } from '@/utils/FleetRetriever';
import { useRouter } from 'next/navigation';

interface CameraCardProps {
	carId: string;
	carName: string;
	cameras: CameraType[];
	isLoading?: boolean;
}

export default function CameraCard(props: CameraCardProps) {
	const router = useRouter();

	const cardRef = useRef<HTMLDivElement>(null);
	const [cardWidth, setCardWidth] = useState<number>(
		cardRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(cardRef.current, setCardWidth), []);
	const useCompactLayout = cardWidth < 560;

	const handleLocate = handleCarLocate(router, props.carId);
	const status = carStatus(props.carId);

	if (props.isLoading)
		return (
			<Skeleton
				animation="wave"
				variant="rectangular"
				className="rounded-lg h-[300px]"
			/>
		);

	if (status === STATUS.INACTIVE || props.cameras.length == 0) return;

	return (
		<Card ref={cardRef} className="flex flex-col gap-8 rounded-lg bg-white">
			<div className="flex flex-row pt-16 px-16 gap-16 items-center">
				<div className="flex flex-row gap-4 items-center">
					<p className="inline-block align-baseline font-istok text-black text-h4">
						{props.carName}
					</p>
					<IconButton
						disableRipple
						className="p-none text-primary_blue disabled:text-light_text_grey"
						disabled={props.isLoading || !handleLocate}
						onClick={handleLocate}
					>
						<IconMapper icon={BUTTON_LABEL.LOCATION} />
					</IconButton>
				</div>
				{!props.isLoading && <Pill variant={status} />}
			</div>
			<Divider />
			<Grid
				container
				columns={{ xs: 41 }}
				rowSpacing={2}
				columnSpacing={1}
				className="px-16 pb-16 justify-center"
			>
				{props.cameras.map((camera, index) => (
					<Grid item key={index} xs={useCompactLayout ? 41 : 20}>
						<CameraSection
							carId={props.carId}
							carName={props.carName}
							carStatus={status}
							position={camera.position}
							cameraName={camera.name}
							handleLocate={handleLocate}
							isLoading={props.isLoading}
						/>
					</Grid>
				))}
			</Grid>
		</Card>
	);
}
