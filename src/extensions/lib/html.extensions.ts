import { HTMLElements } from "../../lib/html-elements";

declare global {
    interface HTMLElement {

        /** Gets the height of the element in px */
        getElementHeight(...args: (number | HTMLElement | null | undefined)[]): string; 
    }
}


HTMLElement.prototype.getElementHeight = function(...args: (number | HTMLElement | null | undefined)[]): string {
    return HTMLElements.GetElementHeight(this, ...args);
};  

export {};