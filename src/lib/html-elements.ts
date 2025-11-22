import { Tools } from "./generic";

export class HTMLElements {

    /** */
    public static GetElement = (selector: string): HTMLElement | null => { 
        try {
            return Tools.IsOnlyWhiteSpace(selector) ? null : document.querySelector(selector);
        }

        catch(error) {
            console.warn(error);
            return null;
        }
    }


    /** */
    public static GetElementById = (id: string): HTMLElement | null => {         
        try {
            return Tools.IsOnlyWhiteSpace(id) ? null : document.getElementById(id);
        }

        catch(error) {
            console.warn(error);
            return null;
        }
    }


    /** */
    public static Scroll = (element: string | HTMLElement | null | undefined, y: number = 0, x: number = 0): void => { 
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 

        if(HTML_ELEMENT) { 
            Tools.Sleep().then(_ => HTML_ELEMENT.scroll({ 
                top: y,
                left: x,
                behavior: 'smooth' 
            })); 
        } 
    }


    /** */
    public static ScrollToElement = (element: string | HTMLElement | null | undefined, container: string | HTMLElement = ''): void => { 
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element;   

        if(HTML_ELEMENT) { 
            const HTML_CONTAINER = (typeof container === 'string') ? this.GetElement(container) : container;

            if(HTML_CONTAINER) {
                Tools.Sleep().then(_ => HTML_CONTAINER.scrollBy({ top: HTML_ELEMENT.offsetTop, behavior: 'smooth' }));
            }

            else {
                Tools.Sleep().then(_ => HTML_ELEMENT.scrollIntoView({ behavior: 'smooth', block: "start" }));  
            }
        } 
    }


    /** */
    public static GetOffsetTop = (element: string | HTMLElement | null | undefined): number => {  
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 

        return (HTML_ELEMENT)
            ? HTML_ELEMENT.offsetTop
            : 0; 
    } 


    /** */
    public static GetCssValue = (element: string | HTMLElement | null | undefined, style: string): string => {  
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 

        return (HTML_ELEMENT)
            ? window.getComputedStyle(HTML_ELEMENT).getPropertyValue(style)
            : ''; 
    } 


    /** Gets the width of the element in px */
    public static GetElementWidth = (element: string | HTMLElement | null | undefined, ...args: (number | HTMLElement | null | undefined)[]): string => {
        let width: number = 0;
        
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 
        if(Tools.IsNotNull(HTML_ELEMENT) && Tools.IsNotOnlyWhiteSpace(HTML_ELEMENT?.offsetWidth)) {
            width += HTML_ELEMENT!.offsetWidth;

            for (const arg of args) {
                if (typeof arg == 'number') width += arg;

                else if(Tools.IsNotNull(arg) && Tools.IsNotOnlyWhiteSpace(arg?.offsetWidth)) {
                    width += arg!.offsetWidth;
                } 
            }
        } 
        
        return `${width}px`; 
    }


    /** Gets the height of the element in px */
    public static GetElementHeight = (element: string | HTMLElement | null | undefined, ...args: (number | HTMLElement | null | undefined)[]): string => {
        let height: number = 0;

        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 
        if(Tools.IsNotNull(HTML_ELEMENT) && Tools.IsNotOnlyWhiteSpace(HTML_ELEMENT?.offsetHeight)) {
            height += HTML_ELEMENT!.offsetHeight;

            for (const arg of args) {
                if (typeof arg == 'number') height += arg;

                else if(Tools.IsNotNull(arg) && Tools.IsNotOnlyWhiteSpace(arg?.offsetHeight)) {
                    height += arg!.offsetHeight;
                }                
            }
        } 

        return `${height}px`;
    }


    /** */
    public static IsInvalidElement = (element: any): boolean => { 
        let isInvalid = true;

        if (Tools.IsNotNull(element)) {        
            if(typeof element === 'object') {
                const properties = Tools.GetPropertyList(element);  
    
                if (properties.includes('_isTouched') && properties.includes('_value')) {
                    isInvalid = element.isTouched  && Tools.IsOnlyWhiteSpace(element.value);
                }
            }    
        }

        return isInvalid;
    } 


    /** */
    public static HasClass = (element: string | HTMLElement | null | undefined, className: string): boolean => {
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element;  
        return Tools.IsNotNull(HTML_ELEMENT) 
            && HTML_ELEMENT?.classList.contains(className) || false;
    }


    /** */
    public static AddClass = async (element: string | HTMLElement | null | undefined, className: string) => { 
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element;  

        if(HTML_ELEMENT) {
            if (!this.HasClass(HTML_ELEMENT, className)) {
                HTML_ELEMENT?.classList.add(className);
                return true;
            }            
        }   
        
        return false;
    }


    /** */
    public static RemoveClass = (element: string | HTMLElement | null | undefined, className: string): boolean => {
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 

        if(HTML_ELEMENT) {
            if (this.HasClass(HTML_ELEMENT, className)) {
                HTML_ELEMENT?.classList.remove(className);
                return true;
            } 
        }  
        
        return false;
    }


    /** */
    public static HasChildren = (element: string | HTMLElement | null | undefined): boolean => {
        return this.GetChildren(element).length > 0;
    }


    /** */
    public static GetChildren = (element: string | HTMLElement | null | undefined): HTMLElement[] => {
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element;
        return (HTML_ELEMENT) 
            ? Array.from(HTML_ELEMENT?.children) as HTMLElement[] 
            : [];  
    }


    /** */
    public static GetFather = (element: string | HTMLElement | null | undefined): HTMLElement | null => {
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 

        return (HTML_ELEMENT) 
            ? HTML_ELEMENT.parentElement 
            : null;
    }


    /** */
    public static GetGrandfather = (element: string | HTMLElement | null | undefined): HTMLElement | null => {
        const HTML_ELEMENT = (typeof element === 'string') ? this.GetElement(element) : element; 

        return (HTML_ELEMENT) 
            ? HTML_ELEMENT.parentElement?.parentElement || null 
            : null;
    }
};