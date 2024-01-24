'use client';
// react
import { useEffect } from 'react';
// next
import { useRouter } from 'next/navigation';
// const
import { ROUTE } from '@/constants/ROUTE';
import Loading from '@/components/common/Loading';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push(ROUTE.OVERVIEW);
	}, [router]);

	return <Loading size={48} isBackdrop />;
}
