import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-cameras-state';
import { FETCH_GET_CAMERAS } from './get-cameras-action';
import { ErrorCommon } from '@/types/common/error.model';

const getCamerasReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_CAMERAS.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_CAMERAS.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_CAMERAS.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getCamerasReducer;
