import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-rsu-action-type';
import ApiClient from '@/services/api-client';
import { IGetRSUQuery } from '@/types/models/rsu.model';

export const FETCH_GET_RSU = createAsyncThunk(
	types.GET_RSU_FETCH,
	async (query: IGetRSUQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.RSU.GET_RSU(query);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
