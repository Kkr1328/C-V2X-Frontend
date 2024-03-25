'use client';
// next
import { useSearchParams } from 'next/navigation';
// react
import { useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider } from '@mui/material';
// tanstack
import { useMutation, useQuery } from '@tanstack/react-query';
// components
import Loading from '@/components/common/Loading';
import PageTitle from '@/components/common/PageTitle';
import CameraVideo from '@/components/module/Camera/CameraVideo';
import Filter from '@/components/module/Filter/Filter';
// const
import { NAVBAR_LABEL } from '@/constants/LABEL';
// types
import { IGetPanopticRequest } from '@/types/COMMON';
import { ICar } from '@/types/models/car.model';
// templates
import { PanopticFilterTemplate } from '@/templates/FILTER';
// services
import { getCarsAPI, listVideoUrl } from '@/services/api-call';
// utilities
import { DateOptionGenerator, OptionGenerator } from '@/utils/DataGenerator';

export default function Home() {
	// check initial select camera
	const searchParams = useSearchParams();
	const carId = searchParams.get('car_id') ?? '';
	const cameraId = searchParams.get('camera_id') ?? '';

	// query
	const { isLoading: isCarsLoading, data: cars } = useQuery({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI({}),
	});


	// set data
	const emptyFilterData = {
		car_id: '',
		camera_id: '',
	};
	const defaultFilterData = {
		car_id: carId,
		camera_id: cameraId,
	};

	//states
	const [search, setSearch] = useState<IGetPanopticRequest>(defaultFilterData);
	console.log(search)

	const carList = cars ?? [];
	const cameraList =
		carList.find((car: ICar) => car.id === search.car_id)?.cameras ?? [];

	const { data: dateList } = useQuery({
		queryKey: ['listVideoUrl', search.car_id, search.camera_id],
		queryFn: async () => await listVideoUrl(search.car_id, search.camera_id),
		enabled: !!search.car_id && !!search.camera_id,
	});


	const options = [
		{
			id: 'car_id',
			option: OptionGenerator(carList),
		},
		{
			id: 'camera_id',
			option: OptionGenerator(cameraList),
		},
		{
			id: 'date',
			option: dateList
			? dateList.map((item:any) => ({ value: item.url, label: item.videosTimestamp }))
			: [],
		},
	];


	return (
		<>
			{isCarsLoading && <Loading size={48} isBackdrop />}
			<div className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.PANOPTIC} />
				<Card className="flex flex-col gap-16 w-full min-w-[400px] h-auto min-h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Filter
						template={PanopticFilterTemplate}
						handleSubmitSearch={() => {console.log("test")}}
						search={search}
						setSearch={setSearch}
						handleClearSearch={() => setSearch(emptyFilterData)}
						options={options}
					/>
					<Divider />
					
					<div className="aspect-video bg-dark_background_grey flex justify-center items-center">
						<iframe
                            className="w-full h-full"
                            src={search.date}
                            allowFullScreen
                        />
					</div>
				</Card>
			</div>
		</>
	);
}
