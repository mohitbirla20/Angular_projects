import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs";

declare var jQuery: any;
@Injectable()
export class WebService {

  private _url: string = "http://localhost:8080";

  private timeOutObject: any;
  constructor(private _http: HttpClient) {
  }

  getAPI<T>(_action: string, _body?: any): Observable<any> {
    let params = new HttpParams();
    for (let key in _body) {
      params = params.set(key, _body[key]);
    }
    // this.addLoader(buttonId);
    return this._http
      .get<any>(this._url + _action, { headers: this.getHeader(), params })
      .pipe(
        tap((response: any) => {
          // this.removeLoader(buttonId); Spring Boot API Call
          response;
        }),
        catchError((e: ErrorEvent) => {
          // this.removeLoader(buttonId);
          return this._errorHandler(e);
        })
      );
  }

  postAPI<T>(_action: string, _body: any, buttonId: string): Observable<any> {
    this.addLoader(buttonId);
    return this._http
      .post<any>(this._url + _action, JSON.stringify(_body), this.addHeader())
      .pipe(
        tap((response: any) => {
          this.removeLoader(buttonId);
        }),
        catchError((e: ErrorEvent) => {
          this.removeLoader(buttonId);
          return this._errorHandler(e);
        })
      );
  }

  putAPI<T>(_action: string, _body: any, buttonId: string): Observable<any> {
    this.addLoader(buttonId);
    return this._http
      .put<any>(this._url + _action, JSON.stringify(_body), this.addHeader())
      .pipe(
        tap((response: any) => {
          this.removeLoader(buttonId);
        }),
        catchError((e: ErrorEvent) => {
          this.removeLoader(buttonId);
          return this._errorHandler(e);
        })
      );
  }

  deleteAPI<T>(_action: string, _id?: string): Observable<any> {
    // this.addLoader(buttonId);
    return this._http.delete<any>(this._url + _action, this.addHeader()).pipe(
      tap((response: any) => {
        // this.removeLoader(buttonId);
      }),
      catchError((e: ErrorEvent) => {
        // this.removeLoader(buttonId);
        return this._errorHandler(e);
      }) 
    );
  }



  _errorHandler(e: Event) {
    console.log(e)
    return "";
    // var errorMessage;
    // if (!e || !e.error || !e.status) {
    //   errorMessage = "Server Not Responding";
    // } else if (e.status == 401) {
    //   errorMessage = e.error.message || "Access Denied";
    // } else {
    //   errorMessage = e.error.message || "Bad Response";
    // }
    // return throwError(errorMessage);
  }

  private addHeader() {
    return { headers: this.getHeader() };
  }

  private getHeader() {
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("app_version", "1.0");
    headers = headers.append(
      "Authorization",
      "Bearer "
    );

    return headers;
  }


  public startLoader(id: string) {
    this.addLoader(id);
  }

  private addLoader(id: string) {
    if (id) {
      var button = document.getElementById(id);
      if (button) {
        (<HTMLInputElement>button).disabled = true;
        var loader = document.createElement("i");
        loader.className = 'fa fa-spinner fa-spin mr-2';
        button.prepend(loader);
      }
    }
  }

  public stopLoader(id: string) {
    this.removeLoader(id);
  }

  private removeLoader(id: string) {
    if (id) {
      var button = document.getElementById(id);
      if (button) {
        (<HTMLInputElement>button).disabled = false;
        button.removeChild(button.childNodes[0])
      }
    }
  }

}
