import { CarCard } from "@/types/OVERVIEW";
import { Card, Collapse } from "@mui/material";
import { useState } from "react";

interface CarCardProps {
  car: CarCard,
  isFocus: Boolean
}

export default function CarCard(props: CarCardProps) {
  const car = props.car
  const isFocus = props.isFocus

  return (
    isFocus ?
      <Card className="border-2 border-primary_blue rounded-lg my-8 p-8">
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
      <Card className='rounded-lg my-8 p-8'>
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
      <div className="text-[20px] font-bold">{car.name}</div>
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
      <button onClick={() => { setExpand(!expand) }}>v</button>
    </>
  )
}