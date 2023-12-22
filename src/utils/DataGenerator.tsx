import { InputFieldProp } from '@/types/COMMON';
import { IResponseList } from '@/types/common/responseList.model';

export function DefaultDataGenerator<T>(template: InputFieldProp<T>[]): T {
	return template.reduce(
		(acc, item) => ({ ...acc, [item.id]: '' as T[keyof T] }),
		{} as T
	);
}

export const OptionGenerator = (itemList: IResponseList[] | undefined) => {
	if (!itemList || itemList.length === 0) return [];
	return itemList.map((item) => {
		return { value: item.id, label: item.name };
	});
};
