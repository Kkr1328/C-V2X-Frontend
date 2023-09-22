'use client';

import SelectCV2X, { SelectOption } from '@/components/common/SelectCV2X';
import TextFieldCV2X from '@/components/common/TextFieldCV2X';
import { InputFieldProp } from '@/constants/TEMPLATE';
import { Stack } from '@mui/material';
import React from 'react';

interface ModalInputsProp {
	template: InputFieldProp[];
}

export default function ModalInputs(props: ModalInputsProp) {
	const [textfieldvalue, settextfieldvalue] = React.useState<string>('');
	const [selectvalue, setselectvalue] = React.useState<SelectOption | null>(
		null
	);

	const maxRow = Math.max(...props.template.map((item) => item.row), 0);

	return (
		<Stack className="w-full gap-16">
			{Array.from({ length: maxRow }, (_, index) => (
				<Stack direction="row" className="gap-16">
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
				</Stack>
			))}
		</Stack>
	);
}
