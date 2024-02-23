// next
import { useRouter } from 'next/navigation';
// react
import { Draggable } from 'react-beautiful-dnd';
// material ui
import { Card, IconButton, Skeleton } from '@mui/material';
// components
import Pill from '@/components/common/Pill';
import Text from '@/components/common/Text';
// consts
import { BUTTON_LABEL, EMERGENCY_CARD_LABEL } from '@/constants/LABEL';
// types
import { Emergency } from '@/types/COMMON';
// utilities
import { useCarStatus, useHandleCarLocate } from '@/utils/FleetRetriever';
import IconMapper from '@/utils/IconMapper';

type EmeregncyCardProps = {
	index?: number;
	id?: string;
	carName?: string;
	carId?: string;
	time?: string;
	driverPhoneNo?: string;
	state?: Emergency;
	isLoading?: boolean;
};

export default function EmergencyCard(props: EmeregncyCardProps) {
	const router = useRouter();
	const handleLocate = useHandleCarLocate(router, props.carId ?? '');
	const pill = useCarStatus(props.carId ?? '');

	if (props.isLoading)
		return (
			<Skeleton
				animation="wave"
				variant="rectangular"
				className="w-full min-w-[272px] min-h-[84px] rounded-l-none rounded-r-lg border-l-8 mt-16 border-light_text_grey"
			/>
		);

	return (
		<Draggable
			key={props.id ?? '0'}
			draggableId={props.id ?? '0'}
			index={props.index ?? 0}
		>
			{(provided) => {
				return (
					<Card
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={`w-full min-w-[272px] min-h-[84px] rounded-l-none rounded-r-lg border-l-8 p-16 mt-16 bg-dark_background_grey hover:bg-light_background_grey ${
							props.state === 'PENDING'
								? 'border-error_red'
								: props.state === 'IN PROGRESS'
								? 'border-primary_blue'
								: 'border-active_green'
						}`}
					>
						<div className="flex flex-col gap-4">
							<div className="flex flex-row gap-4 items-center truncate">
								<Text
									style="text-black text-h5"
									content={props.carName ?? 'Undefined car'}
									isTruncate
								/>
								<IconButton
									disableRipple
									className="p-none text-primary_blue disabled:text-light_text_grey"
									disabled={!handleLocate}
									onClick={handleLocate}
								>
									<IconMapper icon={BUTTON_LABEL.LOCATION} />
								</IconButton>
								{pill && <Pill variant={pill} />}

								<div className="grow" />
								<Text
									style="text-light_text_grey text-p2"
									content={props.time ?? 'undefined time'}
								/>
							</div>
							<div className="flex flex-row gap-4 items-center truncate">
								<Text
									style="text-black text-p1"
									content={EMERGENCY_CARD_LABEL.DRIVER_CONTACT}
								/>
								<Text
									style="text-black text-p1"
									content={props.driverPhoneNo ?? '-'}
									isTruncate
								/>
							</div>
						</div>
					</Card>
				);
			}}
		</Draggable>
	);
}
