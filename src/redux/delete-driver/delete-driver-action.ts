import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './delete-driver-action-type';
import ApiClient from '@/services/api-client';
import { IDeleteDriverQuery } from '@/types/models/driver.model';

export const FETCH_DELETE_DRIVER = createAsyncThunk(
	types.DELETE_DRIVER_FETCH,
	async (query: IDeleteDriverQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.DRIVER.DELETE_DRIVER(query);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
