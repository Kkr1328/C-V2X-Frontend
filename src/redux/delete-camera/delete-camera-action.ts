import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './delete-camera-action-type';
import ApiClient from '@/services/api-client';
import { IDeleteCameraQuery } from '@/types/models/camera.model';

export const FETCH_DELETE_CAMERA = createAsyncThunk(
	types.DELETE_CAMERA_FETCH,
	async (query: IDeleteCameraQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.CAMERA.DELETE_CAMERA(query);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
