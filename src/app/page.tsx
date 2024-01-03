'use client';
// react
import { useEffect } from 'react';
// next
import { useRouter } from 'next/navigation';
// const
import { ROUTE } from '@/constants/ROUTE';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push(ROUTE.OVERVIEW);
	}, []);

	return;
}
