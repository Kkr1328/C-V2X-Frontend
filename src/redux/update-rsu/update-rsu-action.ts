import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './update-rsu-action-type';
import { IUpdateRSUQuery } from '@/types/models/rsu.model';
import ApiClient from '@/services/api-client';

export const FETCH_UPDATE_RSU = createAsyncThunk(
	types.UPDATE_RSU_FETCH,
	async (query: IUpdateRSUQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.RSU.UPDATE_RSU(query.query, query.request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
