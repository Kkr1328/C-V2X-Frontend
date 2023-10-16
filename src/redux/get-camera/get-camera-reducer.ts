import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-camera-state';
import { FETCH_GET_CAMERA } from './get-camera-action';
import { ErrorCommon } from '@/types/common/error.model';

const getCameraReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_CAMERA.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_CAMERA.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_CAMERA.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getCameraReducer;
