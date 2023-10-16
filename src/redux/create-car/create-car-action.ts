import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './create-car-action-type';
import ApiClient from '@/services/api-client';
import { ICreateCarRequest } from '@/types/models/car.model';

export const FETCH_CREATE_CAR = createAsyncThunk(
	types.CREATE_CAR_FETCH,
	async (request: ICreateCarRequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.CAR.CREATE_CAR(request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
