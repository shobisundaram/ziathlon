import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient,
    //  private toastrService : ToastrService
    ) {}

  CommonGetApi(path: string): Observable<any> {
    return this.http.get<any>(environment.API_ENDPOINT + path);
  }
  CommonGetApiwithparams(path: string, params: any): Observable<any> {
    let httpParams = new HttpParams();
  
    // Append each parameter to the HttpParams object
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
  
    return this.http.get<any>(environment.API_ENDPOINT + path, { params: httpParams });
  }
  // CommonGetOneApi(path: string, id: string): Observable<any> {
  //   return this.http.get<any>(environment.API_ENDPOINT + path + "/" + id);
  // }
  // CommonGetOneApiwithParams(path: string, id: string): Observable<any> {
  //   return this.http.get<any>(
  //     environment.API_ENDPOINT + path + "" + `?id=` + id
  //   );
  // }

  CommonPostApi(inputs: any, path: string): Observable<any> {
    return this.http.post<any>(environment.API_ENDPOINT + path, inputs);
  }
  CommonPostOneApiwithParams(path: string, id: string): Observable<any> {
    return this.http.post<any>(
      environment.API_ENDPOINT + path + "" + `?id=` + id,
      {}
    );
  }
  CommonLoginPostApi(inputs: any, path: string): Observable<any> {
    const headers = new HttpHeaders().set("deviceid", "Abservetech@27");
    return this.http.post<any>(environment.API_ENDPOINT + path, inputs, {
      headers: headers,
    });
  }

  CommonPatchApi(inputs: any, path: string): Observable<any> {
    return this.http.patch<any>(environment.API_ENDPOINT + path, inputs);
  }

  CommonPutApi(path: string, inputs: any): Observable<any> {
    return this.http.put<any>(environment.API_ENDPOINT + path, inputs);
  }

  CommonDeleteApi(id: any, path: string): Observable<any> {
    return this.http.delete<any>(environment.API_ENDPOINT + path + "/" + id);
  }
}
