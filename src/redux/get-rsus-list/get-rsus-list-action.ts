import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-rsus-list-action-type';
import ApiClient from '@/services/api-client';

export const FETCH_GET_RSUS_LIST = createAsyncThunk(
	types.GET_RSUS_LIST_FETCH,
	async (_, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.RSU.GET_RSUS_LIST();
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
