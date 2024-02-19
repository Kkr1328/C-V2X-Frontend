// next
import Image from 'next/image';
// material ui
import { Card, Divider } from '@mui/material';
// tanstack
import { useQuery } from '@tanstack/react-query';
// components
import Text from '@/components/common/Text';
// const
import { MAP_ASSETS } from '@/constants/ASSETS';
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
// types
import { IResponseList } from '@/types/common/responseList.model';
// services
import { getCarsListAPI, getRSUAPI } from '@/services/api-call';
// utilities
import {
	useCarSpeed,
	useCarStatus,
	useConnectedCars,
	useRSUStatus,
} from '@/utils/FleetRetriever';

interface RSUCardProps {
	id: string;
}

export default function RSUCard(props: RSUCardProps) {
	// query
	const { data: rsu } = useQuery({
		queryKey: ['getRSU', props.id],
		queryFn: async () => await getRSUAPI({ id: props.id }),
	});
	const { data: carsList } = useQuery<IResponseList[]>({
		queryKey: ['getCarsList'],
		queryFn: async () => await getCarsListAPI(),
	});

	const status = useRSUStatus(props.id);

	const connectedCar =
		useConnectedCars(props.id)?.map((carId) => ({
			id: carId,
			name: carsList?.find(({ id }) => id === carId)?.name ?? '-',
		})) ?? [];

	if (!rsu) return;

	return (
		<Card className="bg-light_background_grey rounded-lg py-12 flex flex-col gap-8">
			<div className="flex flex-row gap-8 items-center px-16 truncate">
				<Image
					src={`${MAP_ASSETS.RSU_PROFILE}${status?.toUpperCase()}.svg`}
					alt={'RSU profile'}
					width={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
					height={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
				/>
				<Text style="text-black text-h4" content={rsu.name} isTruncate />
			</div>
			<div className="px-16 truncate">
				<Text
					style="text-black text-p1"
					content={`Recommended speed : ${rsu.recommended_speed} km/h`}
					isTruncate
				/>
			</div>
			{connectedCar.length > 0 && <Divider />}
			{connectedCar.length > 0 &&
				connectedCar.map(({ id, name }, index) => (
					<CarDetail key={index} id={id} name={name} />
				))}
		</Card>
	);
}

function CarDetail({ id, name }: { id: string; name: string }) {
	return (
		<div key={name} className="flex flex-row items-center px-16">
			<div className="flex flex-row gap-8 w-3/5 items-center truncate">
				<Image
					src={`${MAP_ASSETS.CAR_PROFILE}${useCarStatus(id)}.svg`}
					alt={'Car Profile'}
					width={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
					height={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
				/>
				<Text style="text-black text-h5" content={name} isTruncate />
			</div>
			<Text style="text-black text-p1" content={`Speed : ${useCarSpeed(id)}`} />
		</div>
	);
}
