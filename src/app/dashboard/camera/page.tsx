'use client';
// tanstack
import { useQuery } from '@tanstack/react-query';
// components
import PageTitle from '@/components/common/PageTitle';
import CameraCard from '@/components/module/Camera/CameraCard';
import Loading from '@/components/common/Loading';
import NoData from '@/components/common/NoData';
// const
import { NAVBAR_LABEL, STATUS } from '@/constants/LABEL';
// types
import { ICar } from '@/types/models/car.model';
// utilities
import { useCarsHeartbeat } from '@/utils/FleetRetriever';
// services
import { getCarsAPI } from '@/services/api-call';

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
