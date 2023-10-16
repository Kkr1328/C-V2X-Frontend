import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './update-camera-state';
import { ErrorCommon } from '@/types/common/error.model';
import { FETCH_UPDATE_CAMERA } from './update-camera-action';

const updateCameraReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_UPDATE_CAMERA.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_UPDATE_CAMERA.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_UPDATE_CAMERA.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default updateCameraReducer;
