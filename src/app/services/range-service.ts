import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { RangePrice } from '../model/rangePrice';

@Injectable({
  providedIn: 'root'
})
export class RangeService {

  range = new Subject<RangePrice>();

  constructor() { }

  getRange():Observable<RangePrice>{
    return this.range.asObservable();
  }

  setRange(data){
    this.range.next(data);
  }
}
