import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvironmentServiceService } from '../environment/environment-service.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceDataService {
  constructor(
    private http: HttpClient,
    private baseUrl: EnvironmentServiceService
  ) {}

  public getData(route: string) {
    return this.http.get(
      this.createCompleteRoute(route, this.baseUrl.urlAddress), this.generateHeadersfile()
    );
  }

  public postFile(route: string, body) {
    return this.http.post(
      this.createCompleteRoutefile(route, this.baseUrl.urlAddress),
      body,
      this.generateHeadersfile()
    );
  }

  public create(route: string, body: any) {
    return this.http.post(
      this.createCompleteRoute(route, this.baseUrl.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  private createCompleteRoutefile(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeadersfile() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
        // enctype: 'multipart/form-data',
      }),
    };
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }
}
