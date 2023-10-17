import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-rsus-list-state';
import { FETCH_GET_RSUS_LIST } from './get-rsus-list-action';
import { ErrorCommon } from '@/types/common/error.model';

const getRSUsListReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_RSUS_LIST.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_RSUS_LIST.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_RSUS_LIST.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getRSUsListReducer;
