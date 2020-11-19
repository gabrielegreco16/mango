import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  URL="http://demo2924932.mockable.io/";
  EXERCISE_1="exercise1";
  EXERCISE_2="exercise2";

  constructor(private http:HttpClient) { }

  getExercise1():Observable<any>{
    return this.http.get(this.URL+this.EXERCISE_1);
  }

  getExercise2():Observable<any>{
    return this.http.get(this.URL+this.EXERCISE_2);
  }
}
