import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './update-camera-action-type';
import ApiClient from '@/services/api-client';
import { IUpdateCameraQuery } from '@/types/models/camera.model';

export const FETCH_UPDATE_CAMERA = createAsyncThunk(
	types.UPDATE_CAMERA_FETCH,
	async (query: IUpdateCameraQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.CAMERA.UPDATE_CAMERA(query.query, query.request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
