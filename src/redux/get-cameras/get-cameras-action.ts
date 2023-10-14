import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-cameras-action-type';
import ApiClient from '@/services/api-client';
import { IGetCamerasRequest } from '@/types/models/camera.model';

export const FETCH_GET_CAMERAS = createAsyncThunk(
	types.GET_CAMERAS_FETCH,
	async (request: IGetCamerasRequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.CAMERA.GET_CAMERAS(request);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
