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
		accumulator[`${position.toLowerCase()}_cam_id`] = camera ? camera.id : '';
		return accumulator;
	}, {});

	return { ...data, ...updatedData };
};

export function DateOptionGenerator(): Option[] {
	const dates: Option[] = [];

	const endDate: Date = new Date();
	endDate.setDate(endDate.getDate() - 1); // set end date to be yesterday

	for (let i = 0; i <= 30; i++) {
		const date: Date = new Date(endDate);
		date.setDate(endDate.getDate() - i);

		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'short' });
		const year = date.getFullYear();

		const dateValue: string = date.toDateString();
		const dateLabel: string = `${day} ${month} ${year}`;
		dates.push({ value: dateValue, label: dateLabel });
	}

	return dates;
}
