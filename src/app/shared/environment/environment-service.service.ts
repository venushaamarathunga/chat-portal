import { Injectable } from '@angular/core';
import {environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentServiceService {

  public urlAddress: string = environment.urlAddress;

  constructor() { }
}
