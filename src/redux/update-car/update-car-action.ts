import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './update-car-action-type';
import ApiClient from '@/services/api-client';
import { IUpdateCarQuery } from '@/types/models/car.model';

export const FETCH_UPDATE_CAR = createAsyncThunk(
	types.UPDATE_CAR_FETCH,
	async (query: IUpdateCarQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.CAR.UPDATE_CAR(query.query, query.request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
