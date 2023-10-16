import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './create-driver-action-type';
import ApiClient from '@/services/api-client';
import { ICreateDriverRequest } from '@/types/models/driver.model';

export const FETCH_CREATE_DRIVER = createAsyncThunk(
	types.CREATE_DRIVER_FETCH,
	async (request: ICreateDriverRequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.DRIVER.CREATE_DRIVER(request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
