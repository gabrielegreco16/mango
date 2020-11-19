import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RangePrice } from '../model/rangePrice';
import { MockService } from '../services/mock.service';
import { RangeService } from '../services/range-service';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit, AfterViewInit {

  MAX_PRICE;
  MIN_PRICE;
  range: RangePrice;
  type = "fixed";
  constructor(private rangeService: RangeService, private mockService: MockService) {
    this.mockService.getExercise1().subscribe(data => {
      this.range = new RangePrice(data.min, "0%", data.max, "100%");
    })
  }
  ngAfterViewInit(): void {
    this.mockService.getExercise1().subscribe(data => {
      this.range = new RangePrice(data.min, "0%", data.max, "100%");
      this.MIN_PRICE = this.range.min;
      this.MAX_PRICE = this.range.max
    })
  }

  ngOnInit(): void {

  }

  rangeChange(event) {
    this.range = new RangePrice(event.min, event.minPosition, event.max, event.maxPosition);
    this.rangeService.setRange(this.range);
  }

}
