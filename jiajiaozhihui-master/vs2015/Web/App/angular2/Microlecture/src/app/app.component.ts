import { Component,OnInit } from '@angular/core';
import {Location}from '@angular/common'
import {ActivatedRoute} from '@angular/router';
import { ResolverService } from './service/resolver.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(protected resolverService:ResolverService ) {}
  ngOnInit() {
    var addressUrl = location.search.slice(1);//取参数
    var searchParams = new URLSearchParams(addressUrl);
    let param = searchParams.get('o')
    if(param!=null){
      this.resolverService.resover(location.toString(),param).subscribe(res => {
        console.log(res);
      })
    }
  }
}
