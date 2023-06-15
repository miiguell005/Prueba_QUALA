import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { SessionService } from "./session.service";

const URI_API = 'https://localhost:44350';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private sSesion: SessionService
  ) {}
  
  public getOther(url: string): Observable<any> {
    return this.http
      .get<any>(
        url
      )
  }


  //GET
  public get(url: string): Observable<any> {
    return this.http
      .get<any>(
        this.getUrl(url),
        this.getHttpOption()
      );
  }

  // POST
  public post(url:string, data: any): Observable<any> {
    return this.http
      .post<any>(
        this.getUrl(url),
        JSON.stringify(data),
        this.getHttpOption()
      )
  }

  // PUT
  public put(url:string, data: any): Observable<any> {
    return this.http
      .put<any>(
        this.getUrl(url),
        JSON.stringify(data),
        this.getHttpOption()
      )
  }

  // DELETE
  public Delete(url:string): Observable<any> {
    return this.http
      .delete<any>(
        this.getUrl(url),
        this.getHttpOption()
      )
  }

  //Get header
  private getHttpOption(): any{
    return  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.sSesion.getToken()}`,
        'userId': this.sSesion.getUserId()
      }),
    };
  }

  //Concatenar URL
  private getUrl(url: string): string {
    var contain = url[0] == "/";
    return URI_API + (contain ? "" : "/") + url;
  }
}
