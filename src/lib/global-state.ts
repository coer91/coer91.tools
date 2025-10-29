import type { IMenu } from "../interfaces";

export abstract class GlobalState {

    //User
    private static _user: string = '';

    public static get user() {
        return this._user;
    }

    public static set user(value: string) { 
        this._user = value;
    }


    //Role
    private static _role: string = '';

    public static get role() {
        return this._role;
    }

    public static set role(value: string) { 
        this._role = value;
    }
     
    
    //Menu
    private static _menu: IMenu[]; 

    public static get menu() {
        return this._menu;
    }

    public static set menu(value: IMenu[]) { 
        this._menu = [...value];
    }  
};