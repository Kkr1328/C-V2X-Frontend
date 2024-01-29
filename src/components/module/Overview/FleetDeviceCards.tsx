// tanstack
import { useQuery } from '@tanstack/react-query';
// components
import ToggleButton from '@/components/common/ToggleButton';
import CarCard from './CarCard';
import RSUCard from './RSUCard';
// const
import { STATUS } from '@/constants/LABEL';
// types
import { FocusState, StuffLocation } from '@/types/OVERVIEW';
import { IResponseList } from '@/types/common/responseList.model';
// services
import { getCarsListAPI, getRSUsListAPI } from '@/services/api-call';
import { Skeleton } from '@mui/material';

interface FleetDeviceCardsProps {
	pillMode: STATUS | null;
	changePillMode: (value: STATUS) => void;
	focus: FocusState | null;
	changeFocus: (node: StuffLocation | null) => void;
}

export default function FleetDeviceCards(props: FleetDeviceCardsProps) {
	// query
	const { isLoading: isCarsListLoading, data: carsList } = useQuery<
		IResponseList[]
	>({
		queryKey: ['getCarsList'],
		queryFn: async () => await getCarsListAPI(),
	});
	const { isLoading: isRSUsListLoading, data: rsusList } = useQuery<
		IResponseList[]
	>({
		queryKey: ['getRSUsList'],
		queryFn: async () => await getRSUsListAPI(),
	});

	return (
		<div className="flex flex-col w-full gap-16">
			<ToggleButton
				options={[STATUS.ALL, STATUS.EMERGENCY, STATUS.WARNING]}
				value={props.pillMode ?? ''}
				onChange={(_event, value) => props.changePillMode(value as STATUS)}
			/>
			<div className="flex flex-col w-full min-w-max h-full gap-16 pb-8 overflow-y-auto">
				{isCarsListLoading || isRSUsListLoading ? (
					<>
						<Skeleton
							animation="wave"
							variant="rectangular"
							className="h-[112px] rounded-lg"
						/>
						<Skeleton
							animation="wave"
							variant="rectangular"
							className="h-[112px] rounded-lg"
						/>
						<Skeleton
							animation="wave"
							variant="rectangular"
							className="h-[112px] rounded-lg"
						/>
					</>
				) : (
					<>
						{props.focus === null || props.focus.type === 'CAR'
							? carsList
									?.sort((car) => (car.id === props.focus?.id ? -1 : 1))
									.map((car) => (
										<CarCard
											{...props}
											key={car.id}
											id={car.id}
											isFocus={car.id === props.focus?.id}
										/>
									))
							: rsusList
									?.filter((rsu) => rsu.id === props.focus?.id)
									.map((RSU) => <RSUCard key={RSU.id} id={RSU.id} />)}
					</>
				)}
			</div>
		</div>
	);
}
