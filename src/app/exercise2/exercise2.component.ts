import { Component, OnInit } from '@angular/core';
import { RangePrice } from '../model/rangePrice';
import { MockService } from '../services/mock.service';
import { RangeService } from '../services/range-service';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})
export class Exercise2Component implements OnInit {

  constructor(private rangeService:RangeService, private mockService:MockService) { }

  MAX_PRICE = 150;
  MIN_PRICE = 1;
  range:RangePrice=new RangePrice(this.MIN_PRICE,"0%",this.MAX_PRICE,"100%");
  type ="fixed";
  values:any[];

  ngOnInit(): void {
    this.mockService.getExercise2().subscribe(data=>{
      this.values=data.values;
    })
  }

  rangeChange(event){
    this.range = new RangePrice(event.min,event.minPosition,event.max,event.maxPosition);
    this.rangeService.setRange(this.range);
  }

}
