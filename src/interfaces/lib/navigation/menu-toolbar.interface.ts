export interface IMenuToolbar {
    label: string;
    icon?: string;
    path?: string | (string | number)[];
    preventDefault?: boolean;
}