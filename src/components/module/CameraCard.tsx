// react
import { useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid, IconButton } from '@mui/material';
// components
import Pill from '../common/Pill';
import CameraSection from './CameraSection';
// const
import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';
// types
import { Position } from '@/types/COMMON';
// utilities
import IconMapper from '@/utils/IconMapper';
import { WidthObserver } from '@/utils/WidthObserver';

interface Camera {
	position: Position;
	name: string;
	status: PILL_LABEL;
}

interface CameraCardProps {
	carName: string;
	status: PILL_LABEL;
	handleLocate?: () => void;
	cameras: Camera[];
	isLoading?: boolean;
}

export default function CameraCard(props: CameraCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [cardWidth, setCardWidth] = useState<number>(
		cardRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(cardRef.current, setCardWidth), []);
	const useCompactLayout = cardWidth < 560;

	return (
		<Card ref={cardRef} className="flex flex-col gap-8 rounded-lg bg-white">
			<div className="flex flex-row pt-16 px-16 gap-16 items-center">
				<div className="flex flex-row gap-4 items-center">
					<p className="inline-block align-baseline font-istok text-black text-h4">
						{props.carName}
					</p>
					{props.handleLocate && (
						<IconButton
							disableRipple
							className="p-none text-primary_blue"
							disabled={props.isLoading}
							onClick={props.handleLocate}
						>
							<IconMapper icon={BUTTON_LABEL.LOCATION} />
						</IconButton>
					)}
				</div>
				{!props.isLoading && props.status && <Pill variant={props.status} />}
			</div>
			<Divider />
			<Grid
				container
				columns={{ xs: 41 }}
				rowSpacing={2}
				columnSpacing={1}
				className="px-16 pb-16 justify-center"
			>
				{props.cameras.map((camera) => (
					<Grid item xs={useCompactLayout ? 41 : 20}>
						<CameraSection
							carName={props.carName}
							position={camera.position}
							cameraName={camera.name}
							status={camera.status}
							handleLocate={props.handleLocate}
							isLoading={props.isLoading}
						/>
					</Grid>
				))}
			</Grid>
		</Card>
	);
}
