'use client';
// react
import { useEffect } from 'react';
// next
import { useRouter } from 'next/navigation';
// const
import { ROUTE } from '@/constants/ROUTE';
import Loading from '@/components/common/Loading';
// tanstack
import { useQueryClient } from '@tanstack/react-query';
// services
import {
	getCamerasAPI,
	getCarsAPI,
	getDriversAPI,
	getEmergencyListAPI,
	getRSUsAPI,
} from '@/services/api-call';

export default function Home() {
	const router = useRouter();
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchQuery({
			queryKey: ['getEmergencyList'],
			queryFn: async () => await getEmergencyListAPI(),
		});
		queryClient.prefetchQuery({
			queryKey: ['getCameras'],
			queryFn: async () => await getCamerasAPI({}),
		});
		queryClient.prefetchQuery({
			queryKey: ['getCars'],
			queryFn: async () => await getCarsAPI({}),
		});
		queryClient.prefetchQuery({
			queryKey: ['getDrivers'],
			queryFn: async () => await getDriversAPI({}),
		});
		queryClient.prefetchQuery({
			queryKey: ['getRSUs'],
			queryFn: async () => await getRSUsAPI({}),
		});
		router.push(ROUTE.OVERVIEW);
	}, [router]);

	return <Loading size={48} isBackdrop />;
}
