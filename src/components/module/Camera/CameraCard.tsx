// react
import { useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid, IconButton, Skeleton } from '@mui/material';
// components
import Pill from '../../common/Pill';
import CameraSection from './CameraSection';
import Text from '@/components/common/Text';
// const
import { BUTTON_LABEL, STATUS } from '@/constants/LABEL';
// types
import { CameraType } from '@/types/ENTITY';
// utilities
import IconMapper from '@/utils/IconMapper';
import { WidthObserver } from '@/utils/WidthObserver';
import { useCarStatus, useHandleCarLocate } from '@/utils/FleetRetriever';
import { useRouter } from 'next/navigation';
import { Position } from '@/types/COMMON';

interface CameraCardProps {
	carId: string;
	carName: string;
	cameras: CameraType[];
	isLoading?: boolean;
}

export default function CameraCard(props: CameraCardProps) {
	const router = useRouter();
	const positions = ['Front', 'Back', 'Left', 'Right'] as Position[];

	const cardRef = useRef<HTMLDivElement>(null);
	const [cardWidth, setCardWidth] = useState<number>(
		cardRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(cardRef.current, setCardWidth), []);
	const useNormalLayout = cardWidth < 1200;
	const useCompactLayout = cardWidth < 600;

	const handleLocate = useHandleCarLocate(router, props.carId);
	const status = useCarStatus(props.carId);

	if (props.isLoading)
		return (
			<Skeleton
				animation="wave"
				variant="rectangular"
				className="rounded-lg h-[344px]"
			/>
		);

	if (status === STATUS.INACTIVE) return;

	return (
		<Card
			ref={cardRef}
			className="flex flex-col w-full min-w-[400px] gap-8 rounded-lg bg-white"
		>
			<div className="flex flex-row pt-16 px-16 gap-16 items-center">
				<div className="flex flex-row gap-4 items-center truncate">
					<Text style="text-black text-h4" content={props.carName} isTruncate />
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
				columns={{ xs: 641 }}
				rowSpacing={2}
				columnSpacing={1}
				className="px-16 pb-16 justify-center"
			>
				{positions.map((position, index) => {
					const camera = props.cameras.find((cam) => cam.position === position);
					return (
						<Grid
							item
							key={index}
							xs={useCompactLayout ? 641 : useNormalLayout ? 320 : 160}
						>
							<CameraSection
								carId={props.carId}
								carName={props.carName}
								useCarStatus={status}
								position={position}
								cameraId={camera?.id}
								cameraName={camera?.name}
								handleLocate={handleLocate}
								isLoading={props.isLoading}
							/>
						</Grid>
					);
				})}
			</Grid>
		</Card>
	);
}
