// react
import { useContext, useMemo } from 'react';
// material ui
import Grid from '@mui/material/Grid';
// tanstack
import { useQuery } from '@tanstack/react-query';
// components
import SummaryCard from '@/components/common/SummaryCard';
// const
import { OVERVIEW_SUMMARY_CARD_LABEL, STATUS } from '@/constants/LABEL';
// types
import { IEmergency } from '@/types/models/emergency.model';
// services
import {
	getCarsListAPI,
	getEmergencyListAPI,
	getRSUsListAPI,
} from '@/services/api-call';
// contexts
import { HeartbeatFleetContext } from '@/context/FleetContext';

interface SummaryCardsProps {
	summariesXs: number;
}

export default function SummaryCards(props: SummaryCardsProps) {
	// retrieve fleet contexts
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	// retrieve queries
	const { data: carsList, isLoading: isCarListLoading } = useQuery<
		{ id: string; name: string }[]
	>({
		queryKey: ['getCarsList'],
		queryFn: async () => await getCarsListAPI(),
	});
	const { data: rsusList, isLoading: isRSUListLoading } = useQuery<
		{ id: string; name: string }[]
	>({
		queryKey: ['getRSUsList'],
		queryFn: async () => await getRSUsListAPI(),
	});
	const { isLoading: isEmergencyListLoading, data: dataGetEmergencyList } =
		useQuery({
			queryKey: ['getEmergencyList'],
			queryFn: async () => await getEmergencyListAPI(),
		});

	// memo values
	const activeCar = useMemo(
		() =>
			Object.entries(heartbeatContextData.CAR).filter(([_key, value]) => {
				return (
					value &&
					value.data.status !== STATUS.INACTIVE &&
					carsList?.some((car) => car.id === _key)
				);
			}).length,
		[heartbeatContextData.CAR]
	);
	const activeRSU = useMemo(
		() =>
			Object.entries(heartbeatContextData.RSU).filter(([_key, value]) => {
				return (
					value &&
					value.data.status === STATUS.ACTIVE &&
					rsusList?.some((rsu) => rsu.id === _key)
				);
			}).length,
		[heartbeatContextData.RSU]
	);
	const pendingEmergency = useMemo(
		() =>
			dataGetEmergencyList?.filter(
				(emergency: IEmergency) => emergency.status === 'pending'
			),
		[dataGetEmergencyList]
	);
	const inProgressEmergency = useMemo(
		() =>
			dataGetEmergencyList?.filter(
				(emergency: IEmergency) => emergency.status === 'inProgress'
			),
		[dataGetEmergencyList]
	);

	return (
		<Grid
			container
			columns={{ xs: 4 }}
			rowSpacing={2}
			columnSpacing={{ xs: 2 }}
		>
			<Grid item xs={props.summariesXs}>
				<SummaryCard
					title={OVERVIEW_SUMMARY_CARD_LABEL.ACTIVE_CAR}
					value={`${activeCar ?? '-'} / ${carsList?.length ?? '-'}`}
					isLoading={isCarListLoading}
				/>
			</Grid>
			<Grid item xs={props.summariesXs}>
				<SummaryCard
					title={OVERVIEW_SUMMARY_CARD_LABEL.ACTIVE_RSU}
					value={`${activeRSU ?? '-'} / ${rsusList?.length ?? '-'}`}
					isLoading={isRSUListLoading}
				/>
			</Grid>
			<Grid item xs={props.summariesXs}>
				<SummaryCard
					title={OVERVIEW_SUMMARY_CARD_LABEL.PENDING_EMERGENCY}
					value={pendingEmergency?.length ?? '-'}
					isLoading={isEmergencyListLoading}
				/>
			</Grid>
			<Grid item xs={props.summariesXs}>
				<SummaryCard
					title={OVERVIEW_SUMMARY_CARD_LABEL.IN_PROGRESS_EMERGENCY}
					value={inProgressEmergency?.length ?? '-'}
					isLoading={isEmergencyListLoading}
				/>
			</Grid>
		</Grid>
	);
}
