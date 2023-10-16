import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './delete-rsu-action-type';
import { IDeleteRSUQuery } from '@/types/models/rsu.model';
import ApiClient from '@/services/api-client';

export const FETCH_DELETE_RSU = createAsyncThunk(
	types.DELETE_RSU_FETCH,
	async (query: IDeleteRSUQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.RSU.DELETE_RSU(query);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
