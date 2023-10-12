import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './create-rsu-action-type';
import { ICreateRSURequest } from '@/types/models/rsu.model';
import ApiClient from '@/services/api-client';

export const FETCH_CREATE_RSU = createAsyncThunk(
	types.CREATE_RSU_FETCH,
	async (request: ICreateRSURequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.RSU.CREATE_RSU(request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
