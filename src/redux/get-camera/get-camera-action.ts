import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './get-camera-action-type';
import ApiClient from '@/services/api-client';
import { IGetCameraQuery } from '@/types/models/camera.model';

export const FETCH_GET_CAMERA = createAsyncThunk(
	types.GET_CAMERA_FETCH,
	async (query: IGetCameraQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			const { data } = await service.CAMERA.GET_CAMERA(query);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
