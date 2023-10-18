import { CarCard } from "@/types/OVERVIEW";
import { Card, Collapse } from "@mui/material";
import { useState } from "react";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Pill from "../common/Pill";
import CarAvatar from "./CarAvatar";
import { PILL_LABEL } from "@/constants/LABEL";

interface CarCardProps {
  car: CarCard,
  isFocus: Boolean,
  onClick: () => void
}

export default function CarCard(props: CarCardProps) {
  return (
      <Card 
        className={`${props.isFocus ? 'border-primary_blue border-2' : ''} bg-light_background_grey rounded-lg my-16 p-8`}>
        <CarCardDetail 
            car={props.car}
            onClick={props.onClick}
            isFocus={props.isFocus}
        />
      </Card>
  )
}

interface CarCardDetailProps {
  car: CarCard,
  onClick: () => void,
  isFocus: Boolean
}

function CarCardDetail(props: CarCardDetailProps) {
  const [expand, setExpand] = useState<boolean>(false)

  return (
    <div className="text-p1">
      <div className={`${props.isFocus ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={props.onClick}>
        {/* head */}
        <div className="text-h4 font-bold flex items-center gap-16 mb-12">
          <div className="flex gap-8">
            <CarAvatar status={props.car.status} />
            {props.car.name}
          </div>
          { props.car.status !== PILL_LABEL.ACTIVE &&
            <Pill variant={props.car.status} />
          }
        </div>
  
        {/* properties */}
        <div>Speed : {props.car.speed ?? "null"}</div>
        <Collapse in={expand} timeout="auto">
            <div className='my-4'>Driver : {`${props.car.driver.first_name} ${props.car.driver.last_name}`}</div>
            <div className='my-4'>Phone No. : {props.car.driver.phone_no ?? "null"}</div>
            {props.car.cameras.map((camera) => (
              <div key={camera.id} className='my-4'>
                {camera.position + " camera"} : {camera.name}
              </div>
            ))}
        </Collapse>
      </div>
      
      <button className="float-right mt-4" onClick={() => { setExpand(!expand) }}>
        { 
          expand ? <ExpandLessIcon /> : <ExpandMoreIcon />
        }
      </button>
    </div>
  )
}