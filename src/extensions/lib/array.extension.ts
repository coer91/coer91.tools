import { Collections } from "../../lib/collections";

declare global {
    interface Array<T> { 

        /** */
        setIndex(...args: T[][]): T[];

        /** */
        setId(...args: T[][]): T[];

        /** */
        distinctStrings(): string[];

        /** */
        distinctNumbers(): number[];

        /** */
        exceptStrings(exceptions: string[]): string[];

        /** */
        exceptNumbers(exceptions: number[]): number[];
    }
}  


Array.prototype.setIndex = function<T>(...args: T[][]): T[] {
    return Collections.SetIndex([...this], args);   
}


Array.prototype.setId = function<T>(...args: T[][]): T[] {
    return Collections.SetId([...this], args);   
}


Array.prototype.distinctStrings = function(): string[] {
    return Collections.DistinctStrings(this);   
}


Array.prototype.distinctNumbers = function(): number[] {
    return Collections.DistinctNumbers(this);   
}


Array.prototype.exceptStrings = function(exceptions: string[]): string[] {
    return Collections.ExceptStrings(this, exceptions);   
}


Array.prototype.exceptNumbers = function(exceptions: number[]): number[] {
    return Collections.ExceptNumbers(this, exceptions);   
}


export {};