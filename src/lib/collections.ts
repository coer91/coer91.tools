import { Tools } from "./generic";
 
export class Collections {
    
    /** Set an index and concat more arrays of the same type */
    public static SetIndex<T>(array: T[], ...args: T[][]): T[] {  
        return [...array].concat(...args).map((item, index) => ({ ...item, index }));
    }
    
    
    /** Set an id and concat more arrays of the same type */
    public static SetId<T>(array: T[], ...args: T[][]): T[] {  
        return [...array].concat(...args).map((item, index) => ({ ...item, id: (index + 1) }));
    } 
    
    
    /** */
    public static Distinct<T>(array: T[]): T[] { 
        try {
            if(!Array.isArray(array) || array.length <= 0) return []; 

            const TYPE = typeof array[0];
            if(['string', 'number', 'bigint', 'boolean'].includes(TYPE)) {
                return Array.from(new Set(array));
            } 

            if(TYPE === 'object') { 
                const objectList = array.reduce((map, item) => { 
                    map.set(JSON.stringify(item), item); 
                    return map; 
                }, new Map<string, T>());
            
                return [...objectList.values()];
            }

            console.warn('Distinct: unsupported data type');
            return array;    
        } 

        catch (error) {
            console.warn(error);
            return array;
        }
    } 


    /** */
    public static Except<T>(array: T[], exceptions: T[]): T[] {
        try {
            if(!Array.isArray(array)      || array.length <= 0)      return []; 
            if(!Array.isArray(exceptions) || exceptions.length <= 0) return [...array]; 

            const TYPE = typeof array[0];
            if(['string', 'number', 'bigint', 'boolean'].includes(TYPE)) { 
                return [...array].filter(item => !Collections.Distinct(exceptions).includes(item));
            } 

            if(TYPE === 'object') {  
                const ARRAY = [...array].map(item => ({ key: JSON.stringify(item), value: item }));
                const EXCEPTIONS = new Set([...exceptions].map(item => JSON.stringify(item)));                  
                return ARRAY.filter(item => !EXCEPTIONS.has(item.key)).map(item => item.value);
            }

            console.warn('Except: unsupported data type');
            return array;    
        } 

        catch (error) {
            console.warn(error);
            return array;
        }
    } 


    /** */
    public static Intercept<T>(array: T[], array2: T[]): T[] {
        try {
            if(!Array.isArray(array)  || array.length <= 0) return []; 
            if(!Array.isArray(array2) || array2.length <= 0) return []; 

            const TYPE = typeof array[0];
            if(['string', 'number', 'bigint', 'boolean'].includes(TYPE)) { 
                return [...array].filter(item => Collections.Distinct(array2).includes(item));
            } 

            if(TYPE === 'object') {  
                const ARRAY = [...array].map(item => ({ key: JSON.stringify(item), value: item }));
                const ARRAY2 = new Set([...array2].map(item => JSON.stringify(item)));                  
                return ARRAY.filter(item => ARRAY2.has(item.key)).map(item => item.value);
            }

            console.warn('Intercept: unsupported data type');
            return array;    
        } 

        catch (error) {
            console.warn(error);
            return array;
        }
    } 


    /** */
    public static SortAsc<T>(array: T[], property: string | null = null): T[] {
        return [...this._Sort(array, property, 'ascending')]; 
    }


    /** */
    public static SortDesc<T>(array: T[], property: string | null = null): T[] {
        return [...this._Sort(array, property, 'descending')]; 
    }


    /** */
    private static _Sort<T>(array: T[], property: string | null = null, direction: 'ascending' | 'descending' = 'ascending'): T[] {
        try {
            if(!Array.isArray(array) || array.length <= 0) return [];  

            const TYPE = typeof array[0];
            if(['string', 'number', 'bigint', 'boolean'].includes(TYPE)) { 
                if(['string', 'boolean'].includes(TYPE)) {
                    return direction == 'ascending' 
                        ? array.sort((x: any, y: any) => String(x).localeCompare(String(y)))
                        : array.sort((x: any, y: any) => String(y).localeCompare(String(x)));
                }

                if(['number', 'bigint'].includes(TYPE)) {
                    return direction == 'ascending'
                        ? array.sort((x: any, y: any) => Number(x) - Number(y))
                        : array.sort((x: any, y: any) => Number(y) - Number(x));
                }
            } 

            if(TYPE === 'object') {  
                if(Tools.IsNotOnlyWhiteSpace(property)) {
                    const PROPERTY = String(property);
                    const PROPERTY_TYPE = typeof (array[0] as any)[PROPERTY];
                    if(['string', 'number', 'bigint', 'boolean'].includes(PROPERTY_TYPE)) { 
                        if(['string', 'boolean'].includes(PROPERTY_TYPE)) { 
                            return direction == 'ascending'
                                ? array.sort((x: any, y: any) => String(x[PROPERTY]).localeCompare(String(y[PROPERTY])))
                                : array.sort((x: any, y: any) => String(y[PROPERTY]).localeCompare(String(x[PROPERTY])));
                        }
                    
                        if(['number', 'bigint'].includes(PROPERTY_TYPE)) {
                            return direction == 'ascending'
                                ? array.sort((x: any, y: any) => Number(x[PROPERTY] - Number(y[PROPERTY])))
                                : array.sort((x: any, y: any) => Number(y[PROPERTY] - Number(x[PROPERTY])));
                        }
                    } 
                } 

                else {
                    console.warn('Sort: property is required');
                    return array;  
                }
            }

            console.warn('Sort: unsupported data type');
             
            return array;    
        } 

        catch (error) {
            console.warn(error);
            return array;
        }
    }


    /** */
    public static Search<T>(array: T[], text: string, properties: string[] = []): T[] {
        try {
            if(!Array.isArray(array) || array.length <= 0) return [];  

            const TYPE = typeof array[0];
            text = text.cleanUpBlanks().toUpperCase().removeAccents();

            if(TYPE === 'object') { 
                if(properties.length <= 0 && array.length > 0) {
                    properties = Tools.GetPropertyList(array[0]);
                }
                
                return [...array].filter((item: any) => properties.some(property => String(item[property] || '').cleanUpBlanks().toUpperCase().removeAccents().includes(text)));    
            } 

            else if(['string', 'number', 'bigint', 'boolean'].includes(TYPE)) { 
                return [...array].filter((item: any) => String(item).cleanUpBlanks().toUpperCase().removeAccents().includes(text));
            } 

            console.warn('Search: unsupported data type');
            return array;  
        } 

        catch (error) {
            console.warn(error);
            return array;
        }
    } 
}