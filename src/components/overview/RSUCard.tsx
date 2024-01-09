import { MAP_ASSETS } from "@/constants/ASSETS";
import { MAP_OBJECT_CONFIG } from "@/constants/OVERVIEW";
import { CONNECTED_CAR_ON_RSU } from "@/types/OVERVIEW";

import { Card, Divider } from "@mui/material";
import Image from 'next/image';
import CarAvatar from "./CarAvatar";

interface RSUCardProps {
    name: string,
    connectedCar: CONNECTED_CAR_ON_RSU[]
}

export default function RSUCard(props: RSUCardProps) {
    return (
        <Card className='bg-light_background_grey text-p1 rounded-lg my-16 p-8 flex flex-col gap-8'>
            <div className='flex items-center gap-8'>
                <Image
                    src={MAP_ASSETS.RSU_PROFILE}
                    alt={'RSU profile'}
                    width={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
                    height={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
                />
                <div className='text-h4'>{props.name}</div>
            </div>
            {/* <div className='text-p1'>Recommended speed : {props.recommendSpeed}</div> */}
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