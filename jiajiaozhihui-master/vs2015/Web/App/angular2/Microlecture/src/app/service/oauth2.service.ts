import { AppConfig } from './../appconfig/config';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Oauth2Service {
  
  constructor(public http:Http,public requestOptions: RequestOptions) {  }

  public entry():Observable<any>{
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({ headers:headers });
    var data={Url:AppConfig.redirectUrl} ;
    const url =AppConfig.baseURL+'/api/wx/oauth2/';
    return this.http.post(url, data,options).map((res: Response) => {
      console.log("redirect");
      console.log(res);
      return res.json().data ;
      
    }).catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
