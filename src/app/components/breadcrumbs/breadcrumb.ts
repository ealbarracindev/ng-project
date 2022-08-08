import { Params } from "@angular/router";

export interface Breadcrumb{
    url:string;
    label:string;
    params:Params;
}