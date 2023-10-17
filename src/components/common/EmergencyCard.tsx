import { BUTTON_LABEL, EMERGENCY_CARD_LABEL } from '@/constants/LABEL';
import { Emergency } from '@/types/COMMON';
import IconMapper from '@/utils/IconMapper';
import { Card, IconButton, Skeleton, Stack } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

interface EmeregncyCardProps {
	index: number;
	id: string;
	carName: string;
	handleLocate?: () => void;
	time: string;
	driverPhoneNo: string;
	state?: Emergency;
	isLoading?: boolean;
}

export default function EmergencyCard(props: EmeregncyCardProps) {
	return props.isLoading ? (
		<Skeleton
			animation="wave"
			variant="rectangular"
			className="w-300 h-[83px] rounded-l-none rounded-r-lg border-l-8 border-light_text_grey"
		/>
	) : (
		<Draggable key={props.id} draggableId={props.id} index={props.index}>
			{(provided) => {
				return (
					<Card
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={`w-300 h-[83px] rounded-l-none rounded-r-lg border-l-8 p-16 mt-16 bg-dark_background_grey hover:bg-light_background_grey ${
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
			}}
		</Draggable>
	);
}
