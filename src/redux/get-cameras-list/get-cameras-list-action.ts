import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-cameras-list-action-type';
import ApiClient from '@/services/api-client';

export const FETCH_GET_CAMERAS_LIST = createAsyncThunk(
	types.GET_CAMERAS_LIST_FETCH,
	async (_, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.CAMERA.GET_CAMERAS_LIST();
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
