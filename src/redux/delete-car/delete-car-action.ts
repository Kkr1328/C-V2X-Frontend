import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './delete-car-action-type';
import ApiClient from '@/services/api-client';
import { IDeleteCarQuery } from '@/types/models/car.model';

export const FETCH_DELETE_CAR = createAsyncThunk(
	types.DELETE_CAR_FETCH,
	async (query: IDeleteCarQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.CAR.DELETE_CAR(query);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
