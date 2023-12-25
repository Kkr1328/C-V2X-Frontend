// react
import { Dispatch, SetStateAction } from 'react';

export function WidthObserver(
	element: HTMLDivElement | null,
	handleSizeChange: Dispatch<SetStateAction<number>>
) {
	const resizeObserver = new ResizeObserver(() => {
		handleSizeChange(element?.clientWidth as number);
	});

	if (element) {
		resizeObserver.observe(element);
	}

	return () => {
		if (element) {
			resizeObserver.unobserve(element);
		}
	};
}

export function WindowWidthObserver(
	handleSizeChange: Dispatch<SetStateAction<number>>
) {
	const handleResize = () => {
		handleSizeChange(window.innerWidth);
	};

	window.addEventListener('resize', handleResize);

	return () => {
		window.removeEventListener('resize', handleResize);
	};
}
