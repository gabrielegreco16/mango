export class RangePrice {
    constructor(min:number,minPosition:String,max:number,maxPosition:String){
        this.min=min;
        this.max=max;
        this.maxPosition= maxPosition;
        this.minPosition = minPosition;
    }
    max:number;
    maxPosition:String
    min:number;
    minPosition:String;
}