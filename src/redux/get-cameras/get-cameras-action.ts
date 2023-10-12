import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-cameras-action-type';
import ApiClient from '@/services/api-client';

export const FETCH_GET_CAMERAS = createAsyncThunk(
	types.GET_CAMERAS_FETCH,
	async (_, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.CAMERA.GET_CAMERAS();
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
