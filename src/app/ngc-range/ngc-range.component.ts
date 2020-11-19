import { AfterViewInit, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild, ɵConsole } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RangePrice } from '../model/rangePrice';
import { RangeService } from '../services/range-service';

@Component({
  selector: 'app-ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.css']
})
export class NgcRangeComponent implements OnInit, AfterViewInit {

  @ViewChild('myTestDiv1') divElementRef1: ElementRef;
  @ViewChild('myTestDiv2') divElementRef2: ElementRef;
  @ViewChild('sliderTrack') sliderTrack: ElementRef;
  @ViewChild('divTrack') divTrack: ElementRef;

  @Input('min') public min: number;
  @Input('max') public max: number;
  @Input('values') public values: any[];

  @Input('range') public range: RangePrice;
  @Input('type') public type: String;
  @Output('rangeChange') rangeChange = new EventEmitter();



  last: any;
  mouseDown: boolean;
  public isMouseDown: boolean;
  public isMouseDown2: boolean;
  decimals:any;

  public minPrice: any;
  public maxPrice: any;
  lastPercent1: number;
  lastPercent2: number;

  constructor(private renderer: Renderer2, private rangeService: RangeService) {
    //when i change the values of range input||mouse, i subscribe to this observable 
    this.rangeService.getRange().subscribe((data) => {
      this.setPrices(data);
    })
  }
  ngAfterViewInit(): void {
    if(this.values!=undefined){
      this.min=this.values[0];
      this.minPrice=this.min;
      this.max=this.values[this.values.length-1];
      this.maxPrice =this.max;
      this.divElementRef1.nativeElement.style.left = '0%'
      this.divElementRef2.nativeElement.style.left = '100%'


    }else{
    this.setPrices(this.range);
    }

  }
  setPrices(data: RangePrice) {
    this.divElementRef1.nativeElement.style.left = data.minPosition
    this.minPrice = data.min
    this.maxPrice = data.max
    this.divElementRef2.nativeElement.style.left = data.maxPosition

  }

  ngOnInit(): void {
    this.isMouseDown = false;
    this.decimals=this.type=='fixed'?2:0;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.isMouseDown2 = false;
    this.divTrack.nativeElement.style.cursor = ''
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (event.buttons == 1) {
      this.divTrack.nativeElement.style.cursor = 'grabbing'

      if (this.isMouseDown) {
        let position = this.offSetXPercent(event, this.lastPercent1) + '%';
        let price:Number = this.getPricePercent(this.offSetXPercent(event, this.lastPercent1));
        if(this.values!=undefined){
          price = this.findNearest(price);
          position = this.priceToPercent(price);
        }else{
          price = this.priceFormat(price);
        }

        if (Number(price) < Number(this.maxPrice)) {
          this.emitRange(price, position, this.maxPrice, this.divElementRef2.nativeElement.style.left);
        }
      } else if (this.isMouseDown2) {
        let position = this.offSetXPercent(event, this.lastPercent2) + '%';
        let price = this.getPricePercent(this.offSetXPercent(event, this.lastPercent2));
        if(this.values!=undefined){
          price = this.findNearest(price);
          position = this.priceToPercent(price);
        }else{
        price = this.priceFormat(price);
        }
        if (Number(price) > Number(this.minPrice)) {
          this.emitRange(this.minPrice, this.divElementRef1.nativeElement.style.left, price, position);
        }
      }
    }
  }

  findNearest(price){
    const closest = this.values.reduce((a, b) => {
      return Math.abs(b - price) < Math.abs(a - price) ? b : a;
  });
  return Number(closest);
  }
  priceFormat(price){
    return this.type=="fixed"?price.toFixed(2):price.toFixed(0);
  }

  emitRange(min, minPosition, max, maxPosition) {
    const event = {
      min: min,
      minPosition: minPosition,
      max: max,
      maxPosition: maxPosition,
    }
    this.rangeChange.emit(event);
  }

  offSetXPercent(event, lastPercent) {
    let actualOFFset = lastPercent + ((event.clientX - this.last.clientX) * 100) / 857;
    return actualOFFset >= 0 && actualOFFset <= 100 ? actualOFFset : actualOFFset < 0 ? 0 : 100;
  }

  getPricePercent(percentInput): Number {
    let value = ((percentInput * this.max) / 100);
  //  console.log(value)
    return value > this.min && value <= this.max ? value : value < this.min ? this.min : this.max;

  }


  onMouseDown(event, input) {
    if (input == 1) {
      this.isMouseDown = true;
      this.lastPercent1 = Number(this.divElementRef1.nativeElement.style.left.toString().replace('%', ''));

      console.log("porcentaje" + event.clientX / 857)

    } else {
      this.isMouseDown2 = true;
      this.lastPercent2 = Number(this.divElementRef2.nativeElement.style.left.toString().replace('%', ''));
    }
    this.last = event;
  }

  onInputMin(value) {
    let number = this.values!=undefined?this.findNearest(Number(value)):Number(value);
    console.log(number)
    if (value&&!isNaN(number) && number >= this.min && number < this.max && number < this.maxPrice) {
      this.emitRange(number, this.priceToPercent(number), this.maxPrice, this.divElementRef2.nativeElement.style.left);
    }
  }

  onInputMax(value) {
    let number = this.values!=undefined?this.findNearest(Number(value)):Number(value);
    console.log(number)
    if (number&&!isNaN(number) && number > this.min && number <= this.max && number > this.minPrice) {
      this.emitRange(this.minPrice, this.divElementRef1.nativeElement.style.left, number, this.priceToPercent(number));
    }
  }

  priceToPercent(price) {
    return price==this.min?'0%':price==this.max?'100%':(price * 100) / this.max + "%";
  }

}
