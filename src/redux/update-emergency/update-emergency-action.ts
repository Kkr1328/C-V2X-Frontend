import { createAsyncThunk } from '@reduxjs/toolkit';
import types from './update-emergency-action-type';
import { IUpdateRSUQuery } from '@/types/models/rsu.model';
import ApiClient from '@/services/api-client';
import { IUpdateEmergencyQuery } from '@/types/models/emergency.model';

export const FETCH_UPDATE_EMERGENCY = createAsyncThunk(
	types.UPDATE_EMERGENCY_FETCH,
	async (query: IUpdateEmergencyQuery, { rejectWithValue }) => {
		const service = new ApiClient();
		try {
			await service.EMERGENCY.UPDATE_EMERGENCY(query.query, query.request);
			return;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);
