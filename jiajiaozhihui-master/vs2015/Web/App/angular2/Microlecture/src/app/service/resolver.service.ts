import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from './../appconfig/config';

@Injectable()
export class ResolverService {

  constructor(protected http:Http) { }
  public resover(url:string,o:string) {
    const serverUrl =AppConfig.baseURL+'/app/appstart/microlecture/Resolver.ashx';
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({ headers:headers });
    return this.http.post(serverUrl,{o:o,url:url},options).map((res: Response) => {
      return res.json().data ;
    }).catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
