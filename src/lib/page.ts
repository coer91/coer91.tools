import { IAppSource, ITitleBreadcrumb, ITitleGoBack } from "../interfaces/index";
import { Breadcrumbs } from "./breadcrumbs";
import { Filters } from "./filters";
import { Tools } from "./generic";
import { PageResponse } from "./page-response";
import { Source } from "./source";

export abstract class Page {

    /** */
    protected isUpdate: boolean = false;

    /** */
    protected isLoading: boolean = false;

    /** */
    protected isReadonlyPage: boolean = true;

    /** */
    protected isReadyPage: boolean = false;  

    /** */
    protected routeParams: any;

    /** */
    protected queryParams: any;

    /** */
    protected breadcrumbs: ITitleBreadcrumb[] = [];

    /** */
    protected pageResponse: any = null;

    /** */
    protected pageFilters: any = {};

    /** */
    protected goBack: ITitleGoBack = { show: false };

    //Private Variables
    private __path: string = '';
    private __page: string = '';
    private __source: IAppSource | null = null;
    private __preventDestroy: boolean = false;
    private __router: ((path: string) => void) | null = null;


    /** */
    constructor(pageName: string, router?: (path: string) => void) {
        this.__router = Tools.IsFunction(router) ? router! : null;
        this.SetPageName(pageName);
        this.__SetSource();
        this.__GetSource();
        this.__GetNavigation();
        this.__SetGoBack();
        this.__GetPageFilter();
        this.__GetPageResponse();
    }


    protected destroy(): void { 
        if (!this.__preventDestroy) this.ClearPageResponse();
    }


    /** Rename the last breadcrumb and update the url id */
    protected SetPageName(pageName: string, id: string | number | null = null): void {
        this.__page = pageName;

        this.__path = document.location.href;
        if (this.__path.includes('#')) this.__path = this.__path.split('#')[1]; 
        if (this.__path.includes('?')) this.__path = this.__path.split('?')[0];      

        if (Tools.IsNotOnlyWhiteSpace(id)) {
            const PATH_ARRAY = this.__path.split('/');
            const PATH_ID = [...PATH_ARRAY].pop();

            if (Tools.IsNotOnlyWhiteSpace(PATH_ID)) {
                PATH_ARRAY[PATH_ARRAY.length - 1] = String(id);
                this.__path = PATH_ARRAY.join('/');
            }
        }

        if (this.breadcrumbs.length > 0) {
            this.breadcrumbs[this.breadcrumbs.length - 1].page = pageName;
            this.breadcrumbs[this.breadcrumbs.length - 1].path = this.__path;
            Breadcrumbs.UpdateLast(pageName, this.__path);
        }

        document.location.href = this.__path;
    }


    /** */
    private __SetSource(): void {
        Source.Set(this.__page);
    }


    /** */
    private __GetSource(): void {
        this.__source = Source.Get();
    }


    /** */
    private __GetNavigation(): void {
        if (Tools.IsNotNull(this.__source)) {
            this.breadcrumbs = Breadcrumbs.Get().map(item => ({
                page: item.page,
                path: item.path,
                click: this.__GoBack(item.path)
            })); 
        }

        else this.breadcrumbs = [{ page: this.__page }];
    }


    /** */
    private __GoBack = (path?: string) => (() => { 
        if (path) Breadcrumbs.RemoveByPath(path);
        else Breadcrumbs.RemoveLast();
    });


    /** */
    private __SetGoBack(): void {
        if (Tools.IsNotNull(this.__source)) {
            this.goBack = {
                show: true,
                path: this.__source!.path,
                click: this.__GoBack()
            };
        }
    }


    /** */
    private __GetPageFilter(): void { 
        this.pageFilters = Filters.Get(this.__path);   
    }


    /** */
    private __GetPageResponse(): void {
        this.pageResponse = PageResponse.Get(); 
    }


    /** Navigate to previous page */
    protected GoToSource<T>(pageResponse: T | null = null, navigate?: (url: string) => void): void {
        if(this.__source) {
            Breadcrumbs.RemoveLast();
            this.SetPageResponse(pageResponse);
            this.RemovePageFilter();

            Tools.Sleep().then(() => {
                if(Tools.IsFunction(navigate)) navigate!(this.__source!.path);
                else if(Tools.IsFunction(this.__router)) this.__router!(this.__source!.path);
            }); 
        }
    };


    /** */
    protected SetPageResponse<T>(pageResponse: T | null = null): void {
        if (Tools.IsNotNull(pageResponse)) {
            this.__preventDestroy = true;
            PageResponse.Set(pageResponse);
        }
    }; 


    /** */
    protected ClearPageResponse(): void {
        PageResponse.Clear();
    };


    /** */
    protected ReloadPage(): void {
        Breadcrumbs.RemoveLast(); 
        Tools.Sleep().then(() => window.location.reload());
    }


    /** */
    protected SetPageFilters<T>(filters: T): void {
        this.pageFilters = Tools.BreakReference<T>(filters);
        Filters.Add(this.pageFilters, this.__path); 
    }


    /** */
    protected RemovePageFilter(): void { 
        this.pageFilters = {};
        Filters.Remove(this.__path); 
    }
}