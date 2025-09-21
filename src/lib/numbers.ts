/** Provides several methods for string manipulation */
export class Numbers {  

    /** Validates if the value is a numeric type */
    public static IsNumber(value: any): boolean {
        return typeof value === 'number' && !Number.isNaN(Number(value));
    }


    /** Validates if the value isn't a numeric type */
    public static IsNotNumber(value: any): boolean {
        return !this.IsNumber(value);
    }


    /** */
    public static SetDecimals(value: string | number | null | undefined, decimals: number = 2): string {
        if(typeof value === 'string') value = Number(value);
        if (this.IsNotNumber(value)) return '0';

        let valueInteger = '';
        let valueDecimal = '';
        value = String(value);        

        if (value.includes('.') || (decimals > 0)) {
            valueInteger = value.includes('.') ? value.split('.')[0] : value;

            if (decimals > 0) { 
                valueDecimal = value.includes('.') ? value.split('.')[1] : '';
                for(let i = 0; i < decimals; i++) valueDecimal += '0';
                valueDecimal = valueDecimal.substring(0, decimals);
                valueDecimal = `.${valueDecimal}`;
            }
        }

        else {
            valueInteger = value;
        }
       
        return `${valueInteger}${valueDecimal}`;
    }


    /** Return a string with numeric format */
    public static GetNumericFormat(value: string | number | null | undefined, decimals: number = 0): string {
        const [INTEGER, DECIMAL = ''] = this.SetDecimals(value).split('.');

        return decimals > 0
            ? `${INTEGER.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${DECIMAL}`
            : INTEGER.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    
    /** Return a string with currency format */
    public static GetCurrencyFormat(value: string | number | null | undefined, symbol: string = '$', currency: string = ''): string { 
        return `${symbol}${this.GetNumericFormat(value, 2)}${currency.length > 0 ? ` ${currency}` : ''}`;
    }
}