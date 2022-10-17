import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LogData, LogArray } from './logData';

const logUrl = "http://localhost:5001/api/voc/rugerlogsingleresult/";

const httpOptions = {
 withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private router: Router, private http: HttpClient) { }

  logResult(logData: LogData): Observable<any> {

    console.log(`Sending id: ${logData.wordId}`);
    let sendData = {...logData};
    return this.http.post(logUrl, sendData, httpOptions);
  }

  logArrayResult(logArr: LogArray): Observable<any> {

    let sendData = {...logArr};
    let text = JSON.stringify(logArr, null, '\t');
    console.log(text);
    return this.http.post(logUrl, sendData, httpOptions);
  }



}
