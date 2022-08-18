import { HttpErrorResponse } from "@angular/common/http";

export class Error {
    status:string ='';
    title:string ='';
    detail:string ='';


    public _handleErrorResponse(error:HttpErrorResponse): Error[]{ 
        let errors: Error[]=[];
        errors=error.error                
        for(let i = 0; i < errors?.length; i++) {              
            var dato= errors[i]
        }   
        return errors;
    }
}

export interface Errors {
    status:string;
    title:string;
    detail:string;
}