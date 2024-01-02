'use client';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import { BUTTON_LABEL } from '@/constants/LABEL';
import { WidthObserver } from '@/utils/WidthObserver';
import { Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export interface FilterActionButtonsProp {
	fieldPerRow?: number;
	handleClearSearch: () => void;
	handleSubmitSearch: () => void;
}

export default function FilterActionButtons(props: FilterActionButtonsProp) {
	const buttonsRef = useRef<HTMLDivElement>(null);
	const [buttonsWidth, setButtonsWidth] = useState<number>(
		buttonsRef.current?.clientWidth as number
	);
	useEffect(
		() => WidthObserver(buttonsRef.current, setButtonsWidth),
		[buttonsRef.current]
	);
	const buttonsSize = buttonsWidth < 380 ? 's' : buttonsWidth < 500 ? 'm' : 'l';

	return (
		<Stack ref={buttonsRef} direction="row" className="w-full gap-8">
			<div className="grow" />
			<ButtonCV2X
				icon={BUTTON_LABEL.CLEAR}
				label={
					props.fieldPerRow === 1 && buttonsSize === 's'
						? ''
						: BUTTON_LABEL.CLEAR
				}
				variant="outlined"
				onClick={props.handleClearSearch}
			/>
			<ButtonCV2X
				icon={BUTTON_LABEL.SEARCH}
				label={
					props.fieldPerRow === 1 && buttonsSize === 's'
						? ''
						: BUTTON_LABEL.SEARCH
				}
				variant="contained"
				onClick={props.handleSubmitSearch}
			/>
		</Stack>
	);
}
