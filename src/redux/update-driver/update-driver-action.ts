import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './update-driver-action-type';
import ApiClient from '@/services/api-client';
import { IUpdateDriverQuery } from '@/types/models/driver.model';

export const FETCH_UPDATE_DRIVER = createAsyncThunk(
	types.UPDATE_DRIVER_FETCH,
	async (query: IUpdateDriverQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.DRIVER.UPDATE_DRIVER(query.query, query.request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
