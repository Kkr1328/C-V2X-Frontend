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
  isFocus: Boolean
}

export default function CarCard(props: CarCardProps) {
  const car = props.car
  const isFocus = props.isFocus

  return (
    isFocus ?
      <Card className="bg-light_background_grey border-2 border-primary_blue rounded-lg my-16 p-8">
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
      <Card className='bg-light_background_grey rounded-lg my-16 p-8'>
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
    <>
      {/* head */}
      <div className="text-[20px] font-bold flex items-center gap-16 mb-8">
        <div className="flex gap-8">
          <Image 
            className="fill-red" 
            src={`${ASSETS_PATH.MAP_CAR_PROFILE}${car.status}.svg`} 
            width="32" height="32" 
            alt={""}
          />
          {car.name}
        </div> 
        <Pill variant={car.status} />
      </div>

      {/* properties */}
      <div>Speed: {car.speed ?? "null"}</div>
      <Collapse in={expand} timeout="auto">
          <div>
            Driver: {`${car.driver.first_name} ${car.driver.last_name}`}
          </div>
          <div>Phone No. : {car.driver.phone_no ?? "null"}</div>
          {car.cameras.map((camera) => (
            <div>
              {camera.position + " camera"} : {camera.name}
            </div>
          ))}
      </Collapse>
      <button className="float-right mt-16" onClick={() => { setExpand(!expand) }}>
        { 
          expand ? <ExpandLessIcon /> : <ExpandMoreIcon />
        }
      </button>
    </>
  )
}