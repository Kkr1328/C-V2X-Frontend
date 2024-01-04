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
      onClick={props.onClick}
      className={`${props.isFocus ? 'border-primary_blue border-2 cursor-zoom-out' : 'cursor-zoom-in'} bg-light_background_grey rounded-lg my-16 p-8`}>
      <CarCardDetail
        car={props.car}
        isFocus={props.isFocus}
      />
    </Card>
  )
}

interface CarCardDetailProps {
  car: CarCard,
  isFocus: Boolean
}

function CarCardDetail(props: CarCardDetailProps) {
  const [expand, setExpand] = useState<boolean>(false)

  return (
    <div className="text-p1">
      {/* head */}
      <div className="text-h4 flex items-center gap-16 mb-12">
        <div className="flex gap-8">
          {props.car.status && <CarAvatar status={props.car.status} />}
          {props.car.name}
        </div>
        {props.car.status !== PILL_LABEL.ACTIVE &&
          <Pill variant={props.car.status ?? "INACTIVE"} />
        }
      </div>
      {/* properties */}
      <div>Speed : {props.car.speed ?? "loading..."}</div>
      <Collapse in={expand} timeout="auto">
        {props.car.driver &&
          <>
            <div className='my-4'>Driver : {`${props.car.driver.first_name} ${props.car.driver.last_name}`}</div>
            <div className='my-4'>Phone No. : {props.car.driver.phone_no ?? "null"}</div>
          </>
        }
        {props.car.cameras?.map((camera) => (
          <div key={camera.id} className='my-4'>
            {camera.position + " camera"} : {camera.name}
          </div>
        ))}
      </Collapse>
      <button
        className="float-right mt-4"
        onClick={(e) => { e.stopPropagation(); setExpand(!expand) }}
      >
        {
          expand ? <ExpandLessIcon /> : <ExpandMoreIcon />
        }
      </button>
    </div>
  )
}