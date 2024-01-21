import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
    HeartbeatFleetContext,
    CarSpeedFleetContext,
    LocationFleetContext
} from '@/context/fleet';
import { FLEET_CAR_SPEED, FLEET_HEARTBEAT, FLEET_LOCATION } from '@/types/FLEET';

export default function FleetWrapper(props: { children: React.ReactNode }) {
    const [heartbeatData, setHeartbeatData] = useState<{
        CAR: { [id: string]: FLEET_HEARTBEAT };
        RSU: { [id: string]: FLEET_HEARTBEAT };
    } | null>(null);
    const [carSpeedData, setCarSpeedData] = useState<{
        [id: string]: FLEET_CAR_SPEED;
    } | null>(null);
    const [locationData, setLocationData] = useState<{
        CAR: { [id: string]: FLEET_LOCATION };
        RSU: { [id: string]: FLEET_LOCATION };
    } | null>(null);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL ?? "<SOCKET-URL>", { transports: ['websocket', 'polling'] });
        socket.on('connect', () => {
            console.log('connected: fleeting websocket');
        })

        socket.on('heartbeat', (heartbeat: FLEET_HEARTBEAT) => {
            if (heartbeat.type === 'CAR') {
                setHeartbeatData((prev) => {
                    return {
                        CAR: {
                            ...prev?.CAR,
                            [heartbeat.id]: { ...heartbeat }
                        },
                        RSU: { ...prev?.RSU }
                    }
                })
            } else {
                setHeartbeatData((prev) => {
                    return {
                        CAR: { ...prev?.CAR },
                        RSU: {
                            ...prev?.RSU,
                            [heartbeat.id]: { ...heartbeat }
                        }
                    }
                })
            }
        })

        socket.on('location', (location: FLEET_LOCATION) => {
            if (location.type === 'CAR') {
                setLocationData((prev) => {
                    return {
                        CAR: {
                            ...prev?.CAR,
                            [location.id]: { ...location }
                        },
                        RSU: { ...prev?.RSU }
                    }
                })
            } else {
                setLocationData((prev) => {
                    return {
                        CAR: { ...prev?.CAR },
                        RSU: {
                            ...prev?.RSU,
                            [location.id]: { ...location }
                        }
                    }
                })
            }
        })

        socket.on('car_speed', (car_speed: FLEET_CAR_SPEED) => {
            setCarSpeedData((prev) => {
                return {
                    ...prev,
                    [car_speed.id]: { ...car_speed }
                }
            })
        })

        return () => {
            socket.disconnect();
            console.log('disconnected: fleeting websocket');
        }
    }, [])

    return (
        <HeartbeatFleetContext.Provider value={[heartbeatData, setHeartbeatData]}>
            <LocationFleetContext.Provider value={[locationData, setLocationData]}>
                <CarSpeedFleetContext.Provider value={[carSpeedData, setCarSpeedData]}>
                    {props.children}
                </CarSpeedFleetContext.Provider>
            </LocationFleetContext.Provider>
        </HeartbeatFleetContext.Provider>
    )
}
