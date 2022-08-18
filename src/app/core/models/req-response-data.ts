//import { Meta } from "./meta";

export interface ReqResponseData<T>{
    isSuccess?: boolean;
    data?: T[];
    meta?: Meta;
}


export interface Meta {
    totalCount:      number;
    pageSize:        number;
    currentPage:     number;
    totalPages:      number;
    hasNextPage:     boolean;
    hasPreviousPage: boolean;
    nextPageUrl:     string;
    previousPageUrl: string;
}