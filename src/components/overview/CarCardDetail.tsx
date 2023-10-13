import { CarCard } from "@/types/OVERVIEW";
import { Card, Collapse } from "@mui/material";
import { useState } from "react";
import Image from 'next/image'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Pill from "../common/Pill";
import { ASSETS_PATH } from "@/constants/ROUTE";

interface CarCardProps {
  car: CarCard,
  isFocus: Boolean,
  onClick: () => void
}

export default function CarCard(props: CarCardProps) {
  const car = props.car
  const isFocus = props.isFocus

  return (
    isFocus ?
      <Card onClick={props.onClick} className="bg-light_background_grey border-2 border-primary_blue cursor-zoom-out rounded-lg my-16 p-8">
        <InCard 
            id={car.id} 
            name={car.name} 
            cameras={car.cameras} 
            speed={car.speed} 
            driver={car.driver} 
            status={car.status}
        />
      </Card>
      :
      <Card onClick={props.onClick} className='bg-light_background_grey cursor-zoom-in rounded-lg my-16 p-8'>
        <InCard 
            id={car.id} 
            name={car.name} 
            cameras={car.cameras} 
            speed={car.speed} 
            driver={car.driver} 
            status={car.status}
        />
      </Card>
  )
}

function InCard(car: CarCard) {
  const [expand, setExpand] = useState<boolean>(false)

  return (
    <div className="text-p1">
      {/* head */}
      <div className="text-h4 font-bold flex items-center gap-16 mb-12">
        <div className="flex gap-8">
          <Image 
            src={`${ASSETS_PATH.MAP_CAR_PROFILE}${car.status}.svg`} 
            width="32" height="32" 
            alt={"CAR_PROFILE"}
          />
          {car.name}
        </div> 
        <Pill variant={car.status} />
      </div>

      {/* properties */}
      <div>Speed: {car.speed ?? "null"}</div>
      <Collapse in={expand} timeout="auto">
          <div className='my-4'>Driver: {`${car.driver.first_name} ${car.driver.last_name}`}</div>
          <div className='my-4'>Phone No. : {car.driver.phone_no ?? "null"}</div>
          {car.cameras.map((camera) => (
            <div className='my-4'>{camera.position + " camera"} : {camera.name}</div>
          ))}
      </Collapse>
      <button className="float-right mt-4" onClick={() => { setExpand(!expand) }}>
        { 
          expand ? <ExpandLessIcon /> : <ExpandMoreIcon />
        }
      </button>
    </div>
  )
}