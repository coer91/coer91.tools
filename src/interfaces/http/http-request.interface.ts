import { IPatch } from "./patch.interface";

export interface IHttpRequest<T> {
    url: string;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    body?: T | IPatch[] | {};
    queryParams?: { param: string, value: string | number | Date | null | undefined }[];
    headers?: { header: string, value: string | number | null | undefined }[]; 
}