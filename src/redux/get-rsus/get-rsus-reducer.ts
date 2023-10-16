import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-rsus-state';
import { FETCH_GET_RSUS } from './get-rsus-action';
import { ErrorCommon } from '@/types/common/error.model';

const getRSUsReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_RSUS.pending, (state) => ({ ...state, loading: true }))
		.addCase(FETCH_GET_RSUS.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_RSUS.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getRSUsReducer;
