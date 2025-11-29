import { IAppSource, ITitleBreadcrumb, ITitleGoBack } from "../interfaces/index";
import { Breadcrumbs } from "./breadcrumbs";
import { Filters } from "./filters";
import { Tools } from "./generic";
import { PageResponse } from "./page-response";
import { Source } from "./source";
declare const appSettings: any;

export abstract class PageControl {

    /** */
    protected isUpdate: boolean = false;

    /** */
    protected isLoading: boolean = false;

    /** */
    protected isReadonlyPage: boolean = true;

    /** */
    protected isReadyPage: boolean = false;   

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

    /** */
    constructor(pageName: string) {
        this.SetName(pageName);
        Source.Set(this.__page);
        this.__source = Source.Get();
        this.__GetNavigation();
        this.__SetGoBack();
        this.pageFilters = Filters.Get(this.__path);
        this.pageResponse = PageResponse.Get(); 
    }


    protected destroy(): void { 
        if (!this.__preventDestroy) this.ClearResponse();
    }


    /** Rename the last breadcrumb and update the url id */
    protected SetName(pageName: string, id: string | number | null = null): void {
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

        document.location.href = Tools.IsBooleanTrue(appSettings?.navigation?.useHash) ? `/#${this.__path}` : this.__path;
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


    /** Navigate to previous page */
    protected GoToSource<T>(navigate: ((url: string) => void) | null = null, pageResponse: T | null = null): void {
        if(this.__source && Tools.IsFunction(navigate)) {
            Breadcrumbs.RemoveLast();
            this.SetResponse(pageResponse);
            this.RemoveFilter();
            Tools.Sleep().then(() => navigate!(this.__source!.path)); 
        }
    };


    /** */
    protected SetResponse<T>(pageResponse: T | null = null): void {
        if (Tools.IsNotNull(pageResponse)) {
            this.__preventDestroy = true;
            PageResponse.Set(pageResponse);
        }
    }; 


    /** */
    protected ClearResponse(): void {
        PageResponse.Clear();
    };


    /** */
    protected Reload(): void {
        Breadcrumbs.RemoveLast(); 
        Tools.Sleep().then(() => window.location.reload());
    }


    /** */
    protected SetFilters<T>(filters: T): void {
        this.pageFilters = Tools.BreakReference<T>(filters);
        Filters.Add(this.pageFilters, this.__path); 
    }


    /** */
    protected RemoveFilter(): void { 
        this.pageFilters = {};
        Filters.Remove(this.__path); 
    }
}