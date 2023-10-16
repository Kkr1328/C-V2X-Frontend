import { ErrorCommon } from './error.model';

export interface StorageState<T> {
	data?: T;
	loading?: boolean;
	error?: ErrorCommon;
}
