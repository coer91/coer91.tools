import { Tools } from "./generic";
declare const appSettings: any;
 
export class PageResponse {

    private static readonly storage = appSettings?.appInfo?.storage || 'coer91'; 


    /** Save the pageResponse to sessionStorage */
    public static Set<T>(pageResponse: T): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { pageResponse });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** Gets the pageResponse from sessionStorage */
    public static Get<T>(): T | null {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (Tools.IsNotNull(storage?.pageResponse)) {
                return storage.pageResponse;
            }
        }

        return null;
    }


    /** Remove the pageResponse from sessionStorage */
    public static Clear(): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);

        if(Tools.IsNotNull(storage)) {
            if (storage.hasOwnProperty('pageResponse')) {
                delete storage.pageResponse;
            }
    
            storage = { ...storage };
            sessionStorage.setItem(this.storage, JSON.stringify(storage));
        }
    }
}