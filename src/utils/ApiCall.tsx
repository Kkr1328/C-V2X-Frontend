// services
import ApiClient from '@/services/api-client';
// types
import { ErrorCommon } from '@/types/common/error.model';

export const executeApiCall = async (
	apiCall: (service: ApiClient) => Promise<any>
) => {
	const service = new ApiClient();
	try {
		const { data } = await apiCall(service);
		return data;
	} catch (error) {
		throw new Error((error as ErrorCommon).data.error);
	}
};
