export interface IHttpResponse<T> {
    body: T;
    status: number;
    message: string;
    text: string;
    arraybuffer: ArrayBuffer | null;
    ok: boolean;
}