import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-driver-action-type';
import ApiClient from '@/services/api-client';
import { IGetDriverQuery } from '@/types/models/driver.model';

export const FETCH_GET_DRIVER = createAsyncThunk(
	types.GET_DRIVER_FETCH,
	async (query: IGetDriverQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.DRIVER.GET_DRIVER(query);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
