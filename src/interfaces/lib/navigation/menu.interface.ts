export interface IMenu {
    id?: number;
    label: string;
    icon?: string;
    path?: string | (string | number)[];
    show?: 'LIST' | 'GRID';
    readonly?: boolean;
    sequence?: number; 
    activeKey?: string;
    items?: IMenu[];
}