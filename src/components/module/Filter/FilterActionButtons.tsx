'use client';
// react
import { useEffect, useRef, useState } from 'react';
// components
import Button from '@/components/common/Button';
// consts
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';

export interface FilterActionButtonsProp {
	isCompact?: boolean;
	handleClearSearch: () => void;
	handleSubmitSearch: () => void;
}

export default function FilterActionButtons(props: FilterActionButtonsProp) {
	const buttonsRef = useRef<HTMLDivElement>(null);
	const [buttonsWidth, setButtonsWidth] = useState<number>(
		buttonsRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(buttonsRef.current, setButtonsWidth), []);

	return (
		<div ref={buttonsRef} className="flex flex-row w-full gap-8">
			<div className="grow" />
			<Button
				icon={BUTTON_LABEL.CLEAR}
				label={props.isCompact && buttonsWidth < 374 ? '' : BUTTON_LABEL.CLEAR}
				variant="outlined"
				onClick={props.handleClearSearch}
			/>
			<Button
				icon={BUTTON_LABEL.SEARCH}
				label={props.isCompact && buttonsWidth < 374 ? '' : BUTTON_LABEL.SEARCH}
				variant="contained"
				onClick={props.handleSubmitSearch}
			/>
		</div>
	);
}
