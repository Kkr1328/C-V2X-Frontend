import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './create-camera-state';
import { FETCH_CREATE_CAMERA } from './create-camera-action';
import { ErrorCommon } from '@/types/common/error.model';

const createCameraReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_CREATE_CAMERA.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_CREATE_CAMERA.fulfilled, (state) => ({
			...state,
			loading: false,
		}))
		.addCase(FETCH_CREATE_CAMERA.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default createCameraReducer;
