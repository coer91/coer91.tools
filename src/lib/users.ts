import { IUserStorage } from "../interfaces/index";
import { Tools } from "./generic";
declare const appSettings: any;

/** Controls user information in localStorage */
export class User {
      
    private static readonly storage = appSettings?.appInfo?.storage || 'coer91';
    
    /** Save the user to localStorage */    
    public static Set(user: IUserStorage): void { 
        let storage = localStorage.getItem(this.storage) as any;  

        if (storage) {
            storage = JSON.parse(storage);  
            user = Object.assign({}, storage.user, user);          
            storage = Object.assign({}, storage, { user });
        }

        else {
            storage = Object.assign({}, storage, { user });
        }

        localStorage.setItem(this.storage, JSON.stringify(storage));
    }
     

    /** Get the user from localStorage */
    public static Get(): IUserStorage | null {
        let storage = localStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);
            
            if (storage.hasOwnProperty('user')) {
                return { 
                    ...storage.user, 
                    roles: Tools.IsNotNull(storage.user?.roles) ? storage.user?.roles : [], 
                } 
            }
        }

        return null;
    }
     

    /** Validates if the user and the jwt exist in the localStorage */
    public static IsLogIn(): boolean {
        let storage = localStorage.getItem(this.storage) as any; 
        storage = JSON.parse(storage); 

        return Tools.IsNotNull(storage)
            && Tools.IsNotNull(storage?.user)
            && Tools.IsNotOnlyWhiteSpace(storage?.user?.user)
            && Tools.IsNotOnlyWhiteSpace(storage?.user?.jwt);
    }


    /** Removes data from localStorage and sessionStorage, except for the user and navigate to root */
    public static LogOut(): void {
        let storage = localStorage.getItem(this.storage) as any; 

        sessionStorage.removeItem(this.storage);
        localStorage.removeItem(this.storage); 

        if (Tools.IsNotOnlyWhiteSpace(storage)) {
            storage = JSON.parse(storage); 

            const STORAGE_USER = storage?.user;
            const user = STORAGE_USER?.user;
            const remember = Tools.AvoidNull<boolean>(STORAGE_USER?.remember, 'boolean');
             
            if (remember && Tools.IsNotOnlyWhiteSpace(user)) {
                localStorage.setItem(this.storage, JSON.stringify({ user: { user, remember }})); 
            }
        } 
        
        document.location.href = '/';
    }  
}