import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-cars-action-type';
import ApiClient from '@/services/api-client';
import { IGetCarsRequest } from '@/types/models/car.model';

export const FETCH_GET_CARS = createAsyncThunk(
	types.GET_CARS_FETCH,
	async (request: IGetCarsRequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.CAR.GET_CARS(request);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
