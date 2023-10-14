import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './create-camera-action-type';
import ApiClient from '@/services/api-client';
import { ICreateCameraRequest } from '@/types/models/camera.model';

export const FETCH_CREATE_CAMERA = createAsyncThunk(
	types.CREATE_CAMERA_FETCH,
	async (request: ICreateCameraRequest, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.CAMERA.CREATE_CAMERA(request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
