// react
import { useEffect, useRef, useState } from 'react';
// components
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import TableContent, { TableContentProps } from './TableContent';
// const
import { BUTTON_LABEL } from '@/constants/LABEL';
// types
import { TableRowProps } from '@/types/ENTITY';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';

interface TableProp<T extends TableRowProps> extends TableContentProps<T> {
	numberOfRow: Number;
	registerLabel: BUTTON_LABEL;
	handleOnClickRegister: () => void;
	handleOnClickRefresh: () => void;
}

export default function Table<T extends TableRowProps>(props: TableProp<T>) {
	const buttonsRef = useRef<HTMLDivElement>(null);
	const [buttonsWidth, setButtonsWidth] = useState<number>(
		buttonsRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(buttonsRef.current, setButtonsWidth), []);
	const buttonsSize = buttonsWidth < 380 ? 's' : buttonsWidth < 500 ? 'm' : 'l';

	return (
		<>
			<div ref={buttonsRef} className="flex flex-row gap-8">
				<Text
					style="text-dark_text_grey text-h5 self-center"
					content={`Total (${props.numberOfRow})`}
				/>
				<div className="grow" />
				<Button
					icon={BUTTON_LABEL.REGISTER}
					label={
						buttonsSize === 's'
							? ''
							: buttonsSize === 'm'
							? BUTTON_LABEL.REGISTER
							: props.registerLabel
					}
					variant="contained"
					onClick={props.handleOnClickRegister}
				/>
				<Button
					icon={BUTTON_LABEL.REFRESH}
					label={buttonsSize === 's' ? '' : BUTTON_LABEL.REFRESH}
					variant="outlined"
					onClick={props.handleOnClickRefresh}
				/>
			</div>
			<TableContent {...props} />
		</>
	);
}
