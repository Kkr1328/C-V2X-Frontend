// types
import { InputError, InputFieldProp, Option } from '@/types/COMMON';
import { IResponseList } from '@/types/common/responseList.model';
import { ICar } from '@/types/models/car.model';

export function DefaultDataGenerator<T>(template: InputFieldProp<T>[]): T {
	return template.reduce(
		(acc, item) => ({ ...acc, [item.id]: '' as T[keyof T] }),
		{} as T
	);
}

export function DefaultErrorGenerator<T>(
	template: InputFieldProp<T>[]
): InputError<T> {
	return template.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '',
		}),
		{} as InputError<T>
	);
}

export const OptionGenerator = (
	itemList: IResponseList[] | undefined
): Option[] => {
	if (!itemList || itemList.length === 0) return [];
	return itemList.map((item) => {
		return { value: item.id, label: item.name };
	});
};

export const CarDataTransformer = (data: ICar) => {
	const cameraPositions = ['Front', 'Back', 'Left', 'Right'];

	const updatedData = cameraPositions.reduce((accumulator: any, position) => {
		const camera = data.cameras.find((camera) => camera.position === position);
		accumulator[`${position.toLowerCase()}_cam_position`] = camera
			? camera.position
			: '';
		accumulator[`${position.toLowerCase()}_cam_name`] = camera
			? camera.name
			: '';
		return accumulator;
	}, {});

	return { ...data, ...updatedData };
};
