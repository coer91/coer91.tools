import { Tools } from "./generic";
 
export class Collections {
    
    /** Set an index and concat more arrays of the same type */
    public static SetIndex<T>(array: T[], ...args: T[][]): T[] {  
        return [...array].concat(...args).map((item, index) => ({ ...item, index }));
    }  


    /** */
    public static DistinctStrings(array: string[]): string[] { 
        return Tools.IsNotNull(array) 
            ? Array.from(new Set(array))
            : []; 
    } 


    /** */
    public static DistinctNumbers(array: number[]): number[] { 
        return Tools.IsNotNull(array) 
            ? Array.from(new Set(array))
            : []; 
    } 


    /** */
    public static ExceptStrings(array: string[], exceptions: string[]): string[] {
        if(Tools.IsNull(array)) return []; 
        if(Tools.IsNull(exceptions) || exceptions.length <= 0) return [...array];
        exceptions = Collections.DistinctStrings(exceptions);
        return [...array].filter(item => !exceptions.includes(item)); 
    }


    /** */
    public static ExceptNumbers(array: number[], exceptions: number[]): number[] {
        if(Tools.IsNull(array)) return []; 
        if(Tools.IsNull(exceptions) || exceptions.length <= 0) return [...array];
        exceptions = Collections.DistinctNumbers(exceptions);
        return [...array].filter(item => !exceptions.includes(item)); 
    }
}