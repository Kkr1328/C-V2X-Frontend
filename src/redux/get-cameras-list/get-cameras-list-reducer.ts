import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-cameras-list-state';
import { FETCH_GET_CAMERAS_LIST } from './get-cameras-list-action';
import { ErrorCommon } from '@/types/common/error.model';

const getCamerasListReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_CAMERAS_LIST.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_CAMERAS_LIST.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_CAMERAS_LIST.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getCamerasListReducer;
