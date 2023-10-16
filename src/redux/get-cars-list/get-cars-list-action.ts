import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-cars-list-action-type';
import ApiClient from '@/services/api-client';

export const FETCH_GET_CARS_LIST = createAsyncThunk(
	types.GET_CARS_LIST_FETCH,
	async (_, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.CAR.GET_CARS_LIST();
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
