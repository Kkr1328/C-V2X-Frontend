import { Stack, IconButton, Divider, Card } from '@mui/material';

import { PILL_LABEL, BUTTON_LABEL } from '@/constants/LABEL';

import IconMapper from '@/utils/IconMapper';

import Pill from '../common/Pill';

import CameraCard from './CameraCard';

interface CameraInfo {
	position: String;
	name: String;
	status: keyof typeof PILL_LABEL;
}

interface CarCameraCardProp {
	carName: String;
	cameraInfos: CameraInfo[];
	handleLocate?: () => void;
	isLoading?: boolean;
	carStatus: keyof typeof PILL_LABEL;
}

export default function CarCameraCard(props: CarCameraCardProp) {
	return (
		<>
			<Card className="w-600 rounded-lg">
				{/* Header */}
				<Stack direction="row" className="p-16 gap-16 items-center">
					<Stack direction="row" className="gap-4">
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
					</Stack>
					{!props.isLoading && <Pill variant={props.carStatus} />}
				</Stack>
				<Divider />
				{/* Camera Cards */}
				<Stack direction="row">
					{props.cameraInfos.map((camera) => (
						<CameraCard
							carName={props.carName}
							position={camera.position}
							cameraName={camera.name}
							pill={camera.status}
						/>
					))}
				</Stack>
			</Card>
		</>
	);
}
