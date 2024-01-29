'use client';
// next
import Script from 'next/script';
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

export default function Home() {
	// query
	const { isLoading: isCarsLoading, data: cars } = useQuery<ICar[]>({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI({}),
	});

	const activeCarsLength = useCarsHeartbeat(cars ?? []).filter(
		(car) => car.status !== STATUS.INACTIVE
	).length;

	return (
		<>
			{isCarsLoading && <Loading size={48} isBackdrop />}
			<Script
				src="https://muazkhan.com:9001/dist/RTCMultiConnection.min.js"
				strategy="beforeInteractive"
			/>
			<Script
				src="https://muazkhan.com:9001/socket.io/socket.io.js"
				strategy="beforeInteractive"
			/>
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
