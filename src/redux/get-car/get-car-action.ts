import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-car-action-type';
import ApiClient from '@/services/api-client';
import { IGetCarQuery } from '@/types/models/car.model';

export const FETCH_GET_CAR = createAsyncThunk(
	types.GET_CAR_FETCH,
	async (query: IGetCarQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.CAR.GET_CAR(query);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
