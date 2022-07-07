import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const findAllUrl = "http://localhost:5001/api/voc/rugervocall/";

const httpOptions = {
 withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private router: Router, private http: HttpClient) { }

  getWords(): Observable<any> {
    return this.http.get(findAllUrl, httpOptions);
  }

}
