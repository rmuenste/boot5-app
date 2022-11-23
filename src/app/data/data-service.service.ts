import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { dictionaryId } from 'src/app/data/logData';
const findAllUrl = "http://localhost:5001/api/voc/rugervocall/";
const findDicts = "http://localhost:5001/api/voc/rugervocdicts/";

const httpOptions = {
 withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private router: Router, private http: HttpClient) { }

  getWords(dictId: dictionaryId = {_id: "1", name: "A1"}): Observable<any> {
    let queryParams = dictId.name;
    console.log(`Asking for ${dictId}`)
    console.log(JSON.stringify(dictId))
    return this.http.get(findAllUrl, {params: {"dict":queryParams}, withCredentials: true});
  }

  getDictionaries(): Observable<any> {
    return this.http.get(findDicts, httpOptions);
  }

}
