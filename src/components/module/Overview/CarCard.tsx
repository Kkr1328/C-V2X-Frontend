// next
import Image from 'next/image';
// react
import { useState } from 'react';
// material ui
import { Card, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// tanstack
import { useQuery } from '@tanstack/react-query';
// components
import Pill from '../../common/Pill';
import Text from '@/components/common/Text';
// const
import { STATUS } from '@/constants/LABEL';
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
import { MAP_ASSETS } from '@/constants/ASSETS';
// types
import { CarCard, StuffLocation } from '@/types/OVERVIEW';
import { ICar } from '@/types/models/car.model';
// services
import { getCarAPI } from '@/services/api-call';
// utilities
import {
	useCarLocation,
	useCarSpeed,
	useCarStatus,
} from '@/utils/FleetRetriever';

interface CarCardProps {
	id: string;
	pillMode: STATUS | null;
	isFocus: Boolean;
	changeFocus: (node: StuffLocation | null) => void;
}

export default function CarCard(props: CarCardProps) {
	const [expand, setExpand] = useState<boolean>(false);

	const { data: car } = useQuery<ICar>({
		queryKey: ['getCar', props.id],
		queryFn: async () => await getCarAPI({ id: props.id }),
	});

	const location = useCarLocation(props.id) as google.maps.LatLngLiteral;
	const status = useCarStatus(props.id);
	const speed = useCarSpeed(props.id);

	if (
		!car ||
		!status ||
		!location ||
		status === STATUS.INACTIVE ||
		(status !== props.pillMode && props.pillMode !== STATUS.ALL)
	)
		return;

	return (
		<Card
			onClick={() =>
				props.changeFocus({
					id: props.id,
					type: 'CAR',
					location: location,
					status: status,
				})
			}
			className={`${
				props.isFocus
					? 'border-primary_blue border-2 cursor-zoom-out'
					: 'cursor-zoom-in'
			} bg-light_background_grey rounded-lg py-8 px-12`}
		>
			<div className="flex flex-col gap-8 truncate">
				{/* head */}
				<div className="flex flex-row gap-16 items-center">
					<div className="flex flex-row gap-8 items-center truncate">
						<Image
							src={`${MAP_ASSETS.CAR_PROFILE}${status?.toUpperCase()}.svg`}
							alt={'Car Profile'}
							width={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
							height={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
						/>
						<Text style="text-black text-h4" content={car.name} isTruncate />
					</div>
					{status !== STATUS.ACTIVE && <Pill variant={status} />}
				</div>

				{/* properties */}
				<Text
					style="text-black text-p1"
					content={`Speed : ${speed ?? '-'}`}
					isTruncate
				/>
				<div className="flex flex-col truncate">
					<Collapse in={expand} timeout="auto">
						<div className="flex flex-col gap-8">
							<Text
								style="text-black text-p1"
								content={`Driver : ${car.driver ?? '-'}`}
								isTruncate
							/>
							<Text
								style="text-black text-p1"
								content={`Phone No. : ${car.driver_phone_no ?? '-'}`}
								isTruncate
							/>
							{car.cameras.map((camera, index) => (
								<Text
									key={index}
									style="text-black text-p1"
									content={`${camera.position} camera : ${camera.name}`}
									isTruncate
								/>
							))}
						</div>
					</Collapse>
					<div className="flex flex-row">
						<div className="grow" />
						<button
							onClick={(e) => {
								e.stopPropagation();
								setExpand(!expand);
							}}
						>
							{expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</button>
					</div>
				</div>
			</div>
		</Card>
	);
}
