import { STATUS } from '@/constants/LABEL';

export function convertFleetStatusToFormat(str: string): STATUS | undefined {
	const newStr = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	const statusValue = Object.values(STATUS).find((value) => value === newStr);
	return statusValue as STATUS | undefined;
}
