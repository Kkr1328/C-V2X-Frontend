import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

class HttpClient {
	protected _traceId = '';

	constructor(traceId: string) {
		this._traceId = traceId;
	}

	protected initHttp(): AxiosInstance {
		const http = axios.create();
		http.interceptors.request.use(
			(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
				config.headers.set('X-Correlation-Id', this._traceId);
				const contentType = config.headers.get('Content-Type');
				if (!contentType) {
					config.headers.set('Content-type', 'application/json; charset=utf-8');
				}
				return config;
			}
		);

		http.interceptors.response.use(
			(config: AxiosResponse): AxiosResponse => config,
			({ response }: AxiosError) => {
				return Promise.reject({
					isError: true,
					data: response?.data,
					message: response?.statusText,
					status: response?.status,
					traceId: this._traceId,
				});
			}
		);
		return http;
	}

	setTraceId(traceId: string): void {
		this._traceId = traceId;
	}

	async get<R>(endpoint: string, options: AxiosRequestConfig = {}) {
		return await this.initHttp()
			.get<R>(endpoint, options)
			.then((res: any) => res.data);
	}

	async post<T, R>(
		endpoint: string,
		body: T,
		options: AxiosRequestConfig = {}
	) {
		return await this.initHttp()
			.post<R>(endpoint, body, options)
			.then((res: any) => res.data);
	}

	async put<T, R>(endpoint: string, body: T, options: AxiosRequestConfig = {}) {
		return await this.initHttp()
			.put<R>(endpoint, body, options)
			.then((res: any) => res.data);
	}

	async delete<R>(endpoint: string, options: AxiosRequestConfig = {}) {
		return await this.initHttp()
			.delete<R>(endpoint, options)
			.then((res: any) => res.data);
	}

	async formData<R>(
		endpoint: string,
		body: FormData,
		options: AxiosRequestConfig = {}
	) {
		return await this.post<FormData, R>(endpoint, body, {
			...options,
			headers: {
				...options.headers,
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}

export default HttpClient;
