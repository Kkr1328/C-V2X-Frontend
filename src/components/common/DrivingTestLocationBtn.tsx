import { MAP_OBJECT_CONFIG } from "@/constants/OVERVIEW"
import { FocusState } from "@/types/OVERVIEW"
import { useState } from "react"

import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface DrivingTestLocationBtnProps {
    setFocus: (focus: FocusState) => void
}

export default function DrivingTestLocationBtn(props: DrivingTestLocationBtnProps) {
    const { setFocus } = props
    const [open, setOpen] = useState(false)

    if (open) {
        return (
            <div className='flex [&>button]:p-8 z-10 absolute right-8 bottom-24 bg-white shadow-md rounded-sm'>
                <button
                    onClick={() => setOpen(false)}
                >
                    <ChevronRightIcon />
                </button>
                <button
                    onClick={() => {
                        const { location, zoom } = MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.EXAT
                        setFocus({
                            id: '',
                            type: 'CAR',
                            location: location,
                            zoom: zoom
                        })
                        setOpen(false)
                    }}
                    className='border border-inactive_grey hover:bg-light_background_grey'
                >
                    {MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.EXAT.name}
                </button>
                <button
                    onClick={() => {
                        const { location, zoom } = MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.CHALONG_RAT_EXPRESS_WAY
                        setFocus({
                            id: '',
                            type: 'CAR',
                            location: location,
                            zoom: zoom
                        })
                        setOpen(false)
                    }}
                    className='border border-inactive_grey hover:bg-light_background_grey'
                >
                    {MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.CHALONG_RAT_EXPRESS_WAY.name}
                </button>
                <button
                    onClick={() => {
                        const { location, zoom } = MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.PTT
                        setFocus({
                            id: '',
                            type: 'CAR',
                            location: location,
                            zoom: zoom
                        })
                        setOpen(false)
                    }}
                    className='border border-inactive_grey hover:bg-light_background_grey'
                >
                    {MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.PTT.name}
                </button>
            </div>
        )
    } else {
        return (
            <button
                onClick={() => setOpen(true)}
                className='p-8 z-10 absolute right-8 bottom-24 bg-white shadow-md rounded-sm'
            >
                <GpsFixedIcon />
            </button>
        )
    }
}