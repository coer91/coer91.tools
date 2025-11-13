import { Numbers } from './numbers';

export const Tools = {

    /** Generates a guid */
    GetGuid: (seed: string = 'coer91'): string => {
        let time = new Date().getTime();
        seed = seed.toString().trim()
        return seed + `-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
            const random = (time + Math.random() * 16) % 16 | 0
            time = Math.floor(time / 16)
            return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16)
        })
    },


    /** Returns true if the value is null or undefined, false otherwise */
    IsNull: (value: any): boolean => {
        return (value === undefined || value === null);
    },


    /** Returns true if the value is not null or undefined, false otherwise */
    IsNotNull: (value: any): boolean => {
        return !Tools.IsNull(value); 
    },


    /** Returns true if the value is null or undefined or is an empty string or contains only whitespace, false otherwise */
    IsOnlyWhiteSpace: (value: any): boolean => {
        return Tools.IsNull(value) || (typeof value === 'string' && value.trim() === '');
    },


    /** Returns true if it has a string value and is not all whitespace, false otherwise */
    IsNotOnlyWhiteSpace: (value: any): boolean => {
        return Tools.IsNotNull(value) && !Tools.IsOnlyWhiteSpace(value); 
    },


    /** Break reference of a object or array */
    BreakReference: <T>(object: T): T => { 
        if (Tools.IsNull(object) || ['string', 'number', 'boolean', 'function'].includes(typeof object)) return object; 
        return JSON.parse(JSON.stringify(object)) as T;
    }, 
      

    /** Get properties of an object */
    GetPropertyList: <T>(object: T | object | null | undefined): string[] => {
        return Tools.IsNotNull(object) && typeof object === 'object' 
            ? Object.keys(object!) 
            : [];
    }, 


    /** */
    HasProperty: (object: any, property: string): boolean => {
        return typeof object === 'object' && object.hasOwnProperty(property)
    }, 


    /** */
    IsBoolean: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'boolean'
            : Tools.IsNotNull(object) && object.hasOwnProperty(property) && (typeof object[property] === 'boolean'); 
    }, 


    /** */
    IsBooleanTrue: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'boolean' && object === true
            : Tools.IsNotNull(object) && object.hasOwnProperty(property) && (typeof object[property] === 'boolean') && object[property] === true;        
    },


    /** */
    IsBooleanFalse: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'boolean' && object === false
            : Tools.IsNotNull(object) && object.hasOwnProperty(property) && (typeof object[property] === 'boolean') && object[property] === false;        
    },


    /** */
    IsString: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'string'
            : Tools.IsNotNull(object) && object.hasOwnProperty(property) && (typeof object[property] === 'string'); 
    },


    /** */
    IsFunction: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'function'
            : Tools.IsNotNull(object) && object.hasOwnProperty(property) && (typeof object[property] === 'function'); 
    },


    /** Wait the time indicated */
    Sleep: (milliseconds: number = 0): Promise<void> => {
        return new Promise(Resolve => setTimeout(Resolve, milliseconds));         
    }, 

    
    /** Avoids null value and responds with the specified type */
    AvoidNull: <T>(value: T | null | undefined, type: 'string' | 'number' | 'boolean' = 'string'): T => {

        if (Tools.IsNull(value)) {
            return (type === 'string' ? '' : type === 'number' ? 0 : false) as T;
        }

        else if (typeof value === 'string') {
            if (type === 'string' ) return value as T;
            if (type === 'number' ) return (Numbers.IsNumber(Number(value)) ? Number(value) : 0) as T;
            if (type === 'boolean') return (
                Numbers.IsNumber(Number(value)) 
                    ? Number(value) > 0 
                    : (value.toLowerCase().trim() === 'true')
                ) as T;
        }       
        
        else if (typeof value === 'number') {
            if (type === 'string' ) return String(value) as T;
            if (type === 'number' ) return value as T;            
            if (type === 'boolean') return (value > 0) as T;
        }

        else if (typeof value === "boolean") { 
            if (type === 'string' ) return (value ? 'true' : 'false') as T;
            if (type === 'number' ) return (value ? 1 : 0) as T;  
            if (type === 'boolean') return value as T;
        }

        return (type === 'string' ? '' : type === 'number' ? 0 : false) as T;
    },   
};