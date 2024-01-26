import { MAP_ASSETS } from "@/constants/ASSETS";
import { MAP_OBJECT_CONFIG } from "@/constants/OVERVIEW";
import { CONNECTED_CAR_ON_RSU } from "@/types/OVERVIEW";

import { Card, Divider } from "@mui/material";
import Image from 'next/image';
import CarAvatar from "./CarAvatar";

import { useQuery } from "@tanstack/react-query";
import { getRSUsAPI } from "@/services/api-call";
import { useEffect } from "react";

interface RSUCardProps {
	id: string,
	connectedCar: CONNECTED_CAR_ON_RSU[]
}

export default function RSUCard(props: RSUCardProps) {
	const {
		isLoading: rsusLoading,
		data: rsusData,
		refetch: refetchRSUs
	} = useQuery({
		queryKey: ['RSUCard:getRSU'],
		queryFn: async () => await getRSUsAPI({ id: props.id }),
	});

	useEffect(() => {
		refetchRSUs()
	}, [props.id])

	return (
		<Card className='bg-light_background_grey text-p1 rounded-lg my-16 p-8 flex flex-col gap-8'>
			<div className='flex items-center gap-8'>
				<Image
					src={MAP_ASSETS.RSU_PROFILE}
					alt={'RSU profile'}
					width={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
					height={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
				/>
				{!rsusLoading && <div className='text-h4'>{rsusData[0].name}</div>}
			</div>
			<div className='text-p1'>Recommended speed : {!rsusLoading && rsusData[0].recommended_speed?.toString() + ' km/h'}</div>
			{props.connectedCar &&
				<>
					<Divider className="my-4" />
					{props.connectedCar.map((car) =>
						<div key={car.name} className='flex flex-row items-center px-8'>
							<div className='flex w-1/2 items-center'>
								<CarAvatar status={car.status} />
								<div className='mx-8 text-h5'>{car.name}</div>
							</div>
							<div>Speed : {car.speed}</div>
						</div>
					)}
				</>
			}
		</Card>
	)
}