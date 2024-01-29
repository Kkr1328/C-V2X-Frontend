'use client';
// components
import PageTitle from '@/components/common/PageTitle';
import CameraCard from '@/components/module/Camera/CameraCard';
// const
import { NAVBAR_LABEL, STATUS } from '@/constants/LABEL';
// utilities
import { useQuery } from '@tanstack/react-query';
import { ICar } from '@/types/models/car.model';
import { getCarsAPI } from '@/services/api-call';
import Loading from '@/components/common/Loading';
import NoData from '@/components/common/NoData';
import { useCarsHeartbeat } from '@/utils/FleetRetriever';
import { useEffect, useState } from 'react';

export default function Home() {
	// query
	const { isLoading: isCarsLoading, data: cars } = useQuery<ICar[]>({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI({}),
	});

	const activeCarsLength = useCarsHeartbeat(cars ?? []).filter(
		(car) => car.status !== STATUS.INACTIVE
	).length;

	const [scriptsLoaded, setScriptsLoaded] = useState(false);

	useEffect(() => {
		const script1 = document.createElement('script');
		script1.src = 'https://muazkhan.com:9001/dist/RTCMultiConnection.min.js';
		script1.async = false; // Set to true if you want async loading

		const script2 = document.createElement('script');
		script2.src = 'https://muazkhan.com:9001/socket.io/socket.io.js';
		script2.async = false; // Set to true if you want async loading

		const loadScripts = async () => {
			document.body.appendChild(script1);
			document.body.appendChild(script2);

			await new Promise((resolve) => {
				script1.onload = script2.onload = resolve;
			});

			setScriptsLoaded(true);
		};

		loadScripts();

		// Cleanup scripts on component unmount
		return () => {
			document.body.removeChild(script1);
			document.body.removeChild(script2);
		};
	}, []);

	return (
		<>
			{(isCarsLoading || scriptsLoaded) && <Loading size={48} isBackdrop />}
			<div className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.CAMERA} />
				<div className="flex flex-col min-h-[calc(100vh-192px)] gap-16">
					{isCarsLoading ? (
						<>
							<CameraCard carId="" carName="" cameras={[]} isLoading />
							<CameraCard carId="" carName="" cameras={[]} isLoading />
							<CameraCard carId="" carName="" cameras={[]} isLoading />
						</>
					) : activeCarsLength === 0 ? (
						<NoData size="large" />
					) : (
						<>
							{cars?.map((car: ICar, index) => (
								<CameraCard
									key={index}
									carId={car.id}
									carName={car.name}
									cameras={car.cameras}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</>
	);
}
