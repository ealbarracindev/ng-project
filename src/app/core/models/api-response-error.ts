export class ApiResponseError{
    status!: number;
    message!:string;
    fluent!:FluentValidation[] 
    
    handlerCustomError(err:any): ApiResponseError{
        let respError: ApiResponseError=new ApiResponseError(); 
        if (err.status === 400 && err.error.errors) { 
            
            respError.fluent=[]
            for (var fieldName in err.error.errors) {
              
              let fluentApi:FluentValidation=new FluentValidation()
              //respError.fluent[0].fieldName =fieldName
                fluentApi.fieldName=fieldName
                fluentApi.errors=[]
                for (let item of Object.keys(err.error.errors)) {
                  var responseItem = err.error.errors[item];
                  for(var i=0; i<responseItem.length; i++) {              
                        var dato= responseItem[i]
                        fluentApi.errors.push(dato)     
                    }
                }
                respError.fluent.push(fluentApi);
              }
              //return respError
        }
        // else if(err.status === 400){
        //    respError.message=err.error.message;
        //    return respError
        // }
        // console.log('desde la clase--<',err?.error?.message);
        respError.message=err.error?.message;        
        
        return respError;
    }  

}
export class FluentValidation{
    fieldName!:string;
    errors!:Array<string>
}