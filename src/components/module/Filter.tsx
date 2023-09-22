'use client';

import { InputFieldProp } from '@/constants/TEMPLATE';
import { Stack } from '@mui/material';
import TextFieldCV2X from '../common/TextFieldCV2X';
import SelectCV2X, { SelectOption } from '../common/SelectCV2X';
import React from 'react';
import ButtonCV2X from '../common/ButtonCV2X';
import { BUTTON_LABEL } from '@/constants/LABEL';

interface FilterProp {
	template: InputFieldProp[];
}

export default function Filter(props: FilterProp) {
	const [textfieldvalue, settextfieldvalue] = React.useState<string>('');
	const [selectvalue, setselectvalue] = React.useState<SelectOption | null>(
		null
	);

	const maxRow =
		Math.max(...props.template.map((item) => item.row), 0) +
		Number(props.template.length % 4 === 0);

	return (
		<Stack className="w-full gap-8">
			{Array.from({ length: maxRow }, (_, index) => (
				<Stack direction="row" className="gap-16 items-end">
					{props.template
						.filter((inputField) => inputField.row === index + 1)
						.map((inputField) =>
							inputField.type === 'TextField' ? (
								<TextFieldCV2X
									title={inputField.label}
									placeholder={inputField.placeholder}
									value={textfieldvalue}
									onChange={(event) => {
										settextfieldvalue(event.target.value);
										console.log(event.target.value);
									}}
								/>
							) : (
								inputField.type === 'Select' && (
									<SelectCV2X
										title={inputField.label}
										placeholder={inputField.placeholder}
										value={selectvalue}
										onChange={(_, value) => {
											setselectvalue(value);
											console.log(value?.label, value?.value);
										}}
										options={[
											{
												value: '1',
												label: 'one',
											},
											{
												value: '2',
												label: 'two',
											},
											{
												value: '3',
												label: 'three',
											},
										]}
									/>
								)
							)
						)}
					{index + 1 === maxRow && (
						<Stack direction="row" className="w-full gap-8">
							<div className="grow " />
							<ButtonCV2X
								icon={BUTTON_LABEL.CLEAR}
								label={BUTTON_LABEL.CLEAR}
								variant="outlined"
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.SEARCH}
								label={BUTTON_LABEL.SEARCH}
								variant="contained"
							/>
						</Stack>
					)}
				</Stack>
			))}
		</Stack>
	);
}
