import { Collections } from "../../lib/collections";

declare global {
    interface Array<T> { 

        /** */
        setIndex(...args: T[][]): T[];

        /** */
        setId(...args: T[][]): T[];

        /** */
        distinct(): T[]; 

        /** */
        except(exceptions: T[]): T[];
        
        /** */
        intercept(array: T[]): T[];

        /** */
        search(text: string, properties?: string[]): T[];
    }
}  


Array.prototype.setIndex = function<T>(...args: T[][]): T[] {
    return Collections.SetIndex([...this], args);   
}


Array.prototype.setId = function<T>(...args: T[][]): T[] {
    return Collections.SetId([...this], args);   
}


Array.prototype.distinct = function<T>(): T[] {
    return Collections.Distinct(this);   
} 


Array.prototype.except = function<T>(exceptions: T[]): T[] {
    return Collections.Except(this, exceptions);   
} 


Array.prototype.intercept = function<T>(array: T[]): T[] {
    return Collections.Intercept(this, array);   
} 


Array.prototype.search = function<T>(text: string, properties: string[] = []): T[] {
    return Collections.Search(this, text, properties);   
}


export {};