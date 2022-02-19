import axios, { AxiosRequestConfig } from 'axios';

const makeRequest = async <T>(request: AxiosRequestConfig): Promise<T> => {
    const response = await axios.request<T>({
        ...request,
        validateStatus: (status: number) => status >= 200 && status <= 299,
    });

    return response.data;
};

const getRequest = <T>(url: string): Promise<T> =>
    makeRequest<T>({
        url,
        method: 'GET',
    });

const postRequest = <T>(url: string, payload: any): Promise<T> =>
    makeRequest<T>({
        url,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

const patchRequest = <T>(url: string, payload: any): Promise<T> =>
    makeRequest<T>({
        url,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
    });

const deleteRequest = <T>(url: string): Promise<T> => makeRequest<T>({ url, method: 'DELETE' });

export const Rest = { getRequest, postRequest, patchRequest, deleteRequest };
