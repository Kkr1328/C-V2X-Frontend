import { BUTTON_LABEL, EMERGENCY_CARD_LABEL } from '@/constants/LABEL';
import { Emergency } from '@/types/COMMON';
import IconMapper from '@/utils/IconMapper';
import { Card, IconButton, Skeleton, Stack } from '@mui/material';

interface EmeregncyCardProps {
	carName: string;
	handleLocate?: () => void;
	time: string;
	driverPhoneNo?: string;
	state: Emergency;
	isLoading?: boolean;
}

export default function EmergencyCard(props: EmeregncyCardProps) {
	return props.isLoading ? (
		<Skeleton
			animation="wave"
			variant="rectangular"
			className="rounded-l-none rounded-r-lg border-l-8 h-[83px] w-300 border-light_text_grey"
		/>
	) : (
		<Card
			className={`w-300 rounded-l-none rounded-r-lg border-l-8 p-16 bg-dark_background_grey ${
				props.state === 'PENDING'
					? 'border-error_red'
					: props.state === 'IN PROGRESS'
					? 'border-warning_yellow'
					: 'border-active_green'
			}`}
		>
			<Stack className="gap-4">
				<Stack direction="row" className="gap-4 items-center">
					<p className="inline-block align-baseline font-istok text-black text-h5">
						{props.carName}
					</p>
					<IconButton
						disableRipple
						className="p-none text-primary_blue"
						onClick={props.handleLocate}
					>
						<IconMapper icon={BUTTON_LABEL.LOCATION} />
					</IconButton>
					<div className="grow" />
					<p className="inline-block align-baseline font-istok text-light_text_grey text-p2">
						{props.time}
					</p>
				</Stack>
				<p className="inline-block align-baseline font-istok text-blacky text-p1">
					{EMERGENCY_CARD_LABEL.DRIVER_CONTACT + props.driverPhoneNo}
				</p>
			</Stack>
		</Card>
	);
}
