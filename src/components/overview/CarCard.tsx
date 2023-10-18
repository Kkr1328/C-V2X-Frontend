import { CarCard } from "@/types/OVERVIEW";
import { Card, Collapse } from "@mui/material";
import { useState } from "react";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Pill from "../common/Pill";
import CarAvatar from "./CarAvatar";

interface CarCardProps {
  car: CarCard,
  isFocus: Boolean,
  onClick: () => void
}

export default function CarCard(props: CarCardProps) {
  return (
      <Card 
        onClick={props.onClick} 
        className={`${props.isFocus ? 'border-primary_blue border-2 cursor-zoom-out' : 'cursor-zoom-in'} bg-light_background_grey rounded-lg my-16 p-8`}>
        <InCard 
            id={props.car.id} 
            name={props.car.name} 
            cameras={props.car.cameras} 
            speed={props.car.speed} 
            driver={props.car.driver} 
            status={props.car.status}
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
          <CarAvatar status={car.status} />
          {car.name}
        </div> 
        <Pill variant={car.status} />
      </div>

      {/* properties */}
      <div>Speed : {car.speed ?? "null"}</div>
      <Collapse in={expand} timeout="auto">
          <div className='my-4'>Driver : {`${car.driver.first_name} ${car.driver.last_name}`}</div>
          <div className='my-4'>Phone No. : {car.driver.phone_no ?? "null"}</div>
          {car.cameras.map((camera) => (
            <div key={camera.id} className='my-4'>
              {camera.position + " camera"} : {camera.name}
            </div>
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