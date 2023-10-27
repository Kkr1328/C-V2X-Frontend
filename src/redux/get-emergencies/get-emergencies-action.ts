import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-emergencies-action-type';
import ApiClient from '@/services/api-client';

export const FETCH_GET_EMERGENCIES = createAsyncThunk(
	types.GET_EMERGENCIES_FETCH,
	async (_, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.EMERGENCY.GET_EMERGENCIES();
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
