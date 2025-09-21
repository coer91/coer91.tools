import { IHttpRequest, IHttpResponse } from "../interfaces";
import { Files } from "./files";
import { Tools } from "./generic";
import { saveAs } from 'file-saver';
import { User } from "./users";
import { Dates } from "./dates"; 

declare const appSettings: any; 

export class Http {

    public static readonly CODE = {
        Ok: 200,
        Created: 201,
        NoContent: 204,
        BadRequest: 400,
        Unauthorize: 401,
        Forbidden: 403,
        NotFound: 404,
        NotAllowed: 405,
        NotAcceptable: 406,
        Conflict: 409,
        PayloadTooLarge: 413,
        InnerError: 500
    }


    /** */ 
    public static async GET<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        try { 
            const { url, headers, credentials, method } = this.BuildRequest(request, 'GET');                        
            
            const fetchResponse = await fetch(url, {
                method, headers, credentials
            });  
            
            return await this.BuildResponse(request?.responseType || 'json', fetchResponse);  
        } 
        
        catch (error: any) {  
            return this.Error(error);
        } 
    }


    /** */ 
    public static async POST<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        try { 
            const { url, body, headers, credentials, method } = this.BuildRequest(request, 'POST');                      
           
            const fetchResponse = await fetch(url, {
                method, body, headers, credentials
            });

            return await this.BuildResponse(request?.responseType || 'json', fetchResponse);  
        } 
        
        catch (error: any) {  
            return this.Error(error);
        } 
    }


    /** */ 
    public static async PUT<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        try { 
            const { url, body, headers, credentials, method } = this.BuildRequest(request, 'PUT');
                                   
            const fetchResponse = await fetch(url, {
                method, body, headers, credentials
            });

            return await this.BuildResponse(request?.responseType || 'json', fetchResponse);  
        } 
        
        catch (error: any) {  
            return this.Error(error);
        } 
    }


    /** */ 
    public static async PATCH<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        try { 
            const { url, body, headers, credentials, method } = this.BuildRequest(request, 'PATCH');                      
            
            const fetchResponse = await fetch(url, {
                method, body, headers, credentials
            });

            return await this.BuildResponse(request?.responseType || 'json', fetchResponse);   
        } 
        
        catch (error: any) {   
            return this.Error(error);
        } 
    }


    /** */ 
    public static async DELETE<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        try { 
            const { url, headers, credentials, method } = this.BuildRequest(request, 'DELETE');                        
            
            const fetchResponse = await fetch(url, {
                method, headers, credentials
            });

            return await this.BuildResponse(request?.responseType || 'json', fetchResponse);  
        } 
        
        catch (error: any) {  
            return this.Error(error);
        } 
    }


    /** Download a csv file from browser */
    public static DOWNLOAD_CSV(buffer: ArrayBuffer, fileName: string = ''): Blob {

        if(Tools.IsOnlyWhiteSpace(fileName)) {            
            fileName = Tools.IsNotNull(appSettings) 
                && Tools.IsNotNull(appSettings?.appInfo) 
                && Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.storage) 
                ? appSettings.appInfo.storage : 'coer91';
        }

        if(!fileName.endsWith('.csv')) fileName += ".csv";        

        const BLOB = new Blob([buffer], { type: 'application/csv' });
        saveAs(BLOB, fileName);
        return BLOB;
    }


    /** Download a txt file from browser */
    public static DOWNLOAD_TXT(buffer: ArrayBuffer, fileName: string = ''): Blob {

        if(Tools.IsOnlyWhiteSpace(fileName)) {            
            fileName = Tools.IsNotNull(appSettings) 
                && Tools.IsNotNull(appSettings?.appInfo) 
                && Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.storage) 
                ? appSettings.appInfo.storage : 'coer91';
        }

        if(!fileName.endsWith('.txt')) fileName += ".txt";        

        const BLOB = new Blob([buffer], { type: 'text/plain' });
        saveAs(BLOB, fileName);
        return BLOB;
    }


    /** Download a pdf file from browser */
    public static DOWNLOAD_PDF(buffer: ArrayBuffer, fileName: string = ''): Blob {

        if(Tools.IsOnlyWhiteSpace(fileName)) {            
            fileName = Tools.IsNotNull(appSettings) 
                && Tools.IsNotNull(appSettings?.appInfo) 
                && Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.storage) 
                ? appSettings.appInfo.storage : 'coer91';
        }

        if(!fileName.endsWith('.pdf')) fileName += ".pdf";        

        const BLOB = new Blob([buffer], { type: 'application/pdf' });
        saveAs(BLOB, fileName);
        return BLOB;
    }


    /** Download an image file from browser */
    public static DOWNLOAD_IMAGE(buffer: ArrayBuffer, fileName: string = ''): Blob {

        if(Tools.IsOnlyWhiteSpace(fileName)) {            
            fileName = Tools.IsNotNull(appSettings) 
                && Tools.IsNotNull(appSettings?.appInfo) 
                && Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.storage) 
                ? appSettings.appInfo.storage : 'coer91';
        }

        let extension: string = 'png';
        if(fileName.includes('.')) { 
            extension = fileName.split('.')?.at(-1)?.trim().toLowerCase() || '';
            if(![...Files.IMAGE_EXTENSIONS.keys()].includes(extension)) { 
                extension = 'png';
                fileName += `.${extension}`;
            }  
        }   

        else fileName += `.${extension}`;

        const type = Files.IMAGE_EXTENSIONS.get(extension) || ''; 

        const BLOB = new Blob([buffer], { type });
        saveAs(BLOB, fileName);
        return BLOB;
    }


    /** */ 
    private static BuildRequest<T>(request: IHttpRequest<T>, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'): { 
        url: string, 
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        headers: Headers, 
        body: BodyInit | null, 
        credentials: 'include' | 'same-origin' 
    } {
        //Build URL
        const _URL = new URL(request.url);
        if (request.queryParams && request.queryParams.length > 0) {
            for(const query of request.queryParams.filter(x => Tools.IsNotNull(x.value))) {
                _URL.searchParams.append(query.param, query?.value?.toString() || '');
            } 
        }

        //Build Headers
        const _HEADERS = this.IntercepHeaders();
        if (request.headers && request.headers.length > 0) {
            for (const header of request.headers.filter(x => Tools.IsNotNull(x.value))) {
                _HEADERS.append(header.header, header?.value?.toString() || '');
            }
        }  

        let _BODY: BodyInit | null = null;            
        if (['POST', 'PUT', 'PATCH'].includes(method) && request.body) {
            _BODY = request.body instanceof FormData
                ? request.body
                : JSON.stringify(request.body);
            
            if (!(request.body instanceof FormData)) {
                _HEADERS.set('Content-Type', 'application/json');
            }
        }

        return { 
            url: _URL.toString(),
            method,
            headers: _HEADERS,
            body: _BODY,
            credentials: (request.withCredentials ? 'include' : 'same-origin')
        }
    }


    private static IntercepHeaders(): Headers {
        const headers = new Headers();

        const USER = User.Get();
        if(Tools.IsNotOnlyWhiteSpace(USER?.jwt)) headers.append('Authorization', String(USER?.jwt));
        if(Tools.IsNotOnlyWhiteSpace(USER?.user)) headers.append('Clien-User'  , String(USER?.user)); 
        if(Tools.IsNotOnlyWhiteSpace(USER?.role)) headers.append('User-Role'   , String(USER?.role)); 
        headers.append('Utc-Offset', `${Dates.GetOffset() / 60}`);
        
        return headers;
    }


    /** */
    private static async BuildResponse<T>(responseType: 'arraybuffer' | 'blob' | 'json' | 'text', fetchResponse: Response): Promise<IHttpResponse<T>> {
         
        let response: any = null;  

        if(fetchResponse.status >= 400) {
            return await this.BuildError(fetchResponse);
        }
         
        if(fetchResponse.status == 200 || fetchResponse.status == 201) {
            switch(responseType) {
                case 'json': {
                    response = await fetchResponse.json();
                    break;
                }
    
                case 'text': {
                    response = await fetchResponse.text();
                    break;
                }
    
                case 'arraybuffer': {
                    response = await fetchResponse.arrayBuffer();
                    break;
                } 
                
                case 'blob': {
                    response = await fetchResponse.blob();
                    break;
                } 
            } 
        }

        return {
            body: response,
            status: fetchResponse.status,
            message: fetchResponse.statusText,
            text: responseType === 'text' ? response : '',
            arraybuffer: responseType === 'arraybuffer' ? response : null,
            ok: fetchResponse.ok
        };
    }


    /** */
    private static async BuildError<T>(fetchResponse: Response): Promise<IHttpResponse<T>> {
        let text: string = 'BUG';
        let message: string = ''; 

        try {
            message = await fetchResponse.text();
            message = (message as any instanceof ArrayBuffer)
                ? new TextDecoder().decode(new Uint8Array(message as any)) : message; 
        } catch {}  
         
        switch(fetchResponse.status) {
            case 0: { 
                text = 'WEB API DOWN';
                message = 'Without Connection';
                break;
            }

            case 400: { 
                text = 'Bad Request';
                break;
            }

            case 401: {
                text = 'Unauthorize';
                break;
            }

            case 403: {
                text = 'Forbidden';
                break;
            }

            case 404: { 
                text = 'Not Found';
                break;
            }

            case 405: {
                text = 'Not Allowed';
                break;
            }

            case 406: {
                text = 'Not Acceptable';
                break;
            }

            case 409: {
                text = 'Conflict';
                break;
            }

            case 413: {
                text = 'Too Large';
                break;
            } 
        } 

        return this.Error({ status: fetchResponse.status, message, text });
    }


    /** */
    private static Error<T>(error: any): IHttpResponse<T> {
        return {
            body: {} as any,
            status: error?.status || 500,
            message: error?.message || '',
            text: error?.text || 'BUG',
            arraybuffer: null,
            ok: false
        };
    }
}