import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-rsus-action-type';
import ApiClient from '@/services/api-client';
import { IGetRSUsRequest } from '@/types/models/rsu.model';

export const FETCH_GET_RSUS = createAsyncThunk(
	types.GET_RSUS_FETCH,
	async (request: IGetRSUsRequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.RSU.GET_RSUS(request);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
