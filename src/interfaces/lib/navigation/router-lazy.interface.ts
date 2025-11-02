export interface IRouterLazy {
    path: string; 
    pageName?: string;
    load?: () => Promise<any>;
    children?: IRouterLazy[];
    activeKey?: string | null; 
}