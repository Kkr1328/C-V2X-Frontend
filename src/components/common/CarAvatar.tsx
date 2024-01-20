import { MAP_ASSETS } from "@/constants/ASSETS";
import { PILL_LABEL } from "@/constants/LABEL";
import { MAP_OBJECT_CONFIG } from "@/constants/OVERVIEW";

import Image from "next/image";

interface CarAvatarProps {
    status : PILL_LABEL
}

export default function CarAvatar(props: CarAvatarProps) {
    return (
        <Image
            src={`${MAP_ASSETS.CAR_PROFILE}${props.status}.svg`}
            alt={"car profile"}
            width={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
            height={MAP_OBJECT_CONFIG.IMAGE_PROFILE_SIZE}
        />
    )
}