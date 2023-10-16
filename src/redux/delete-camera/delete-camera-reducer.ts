import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './delete-camera-state';
import { FETCH_DELETE_CAMERA } from './delete-camera-action';
import { ErrorCommon } from '@/types/common/error.model';

const deleteCameraReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_DELETE_CAMERA.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_DELETE_CAMERA.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_DELETE_CAMERA.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default deleteCameraReducer;
