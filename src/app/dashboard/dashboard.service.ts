import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private headers: Headers;

  constructor(private http: Http) { }

  private setHTTPHeaders() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    return this.headers;
  }
 
  public GetData = (): Observable<any> => {
    const _url = '../../assets/data.json';
    return this.http
      .get(_url, { headers: this.setHTTPHeaders() })
      .pipe(map(res => <any>res.json()));
  }
}


