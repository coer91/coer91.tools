export interface ITitleGoBack {
    show: boolean;
    path?: string | null;
    queryParams?: any;
    click?: (() => any);
}