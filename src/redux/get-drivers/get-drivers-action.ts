import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-drivers-action-type';
import ApiClient from '@/services/api-client';
import { IGetDriversRequest } from '@/types/models/driver.model';

export const FETCH_GET_DRIVERS = createAsyncThunk(
	types.GET_DRIVERS_FETCH,
	async (request: IGetDriversRequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.DRIVER.GET_DRIVERS(request);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
