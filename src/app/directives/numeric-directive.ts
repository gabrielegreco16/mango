import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[numeric]'
})

export class NumericDirective {

    @Input('decimals') decimals: any = 0;

    private check(value: string, decimals: any) {
        if (decimals <= 0) {
            return String(value).match(new RegExp(/^\d+$/));
        } else {
            var regExpString = "^\\s*((\\d+([\.\,]\\d{0," + decimals + "})?)|((\\d*(\\?:[\.\,]\\d{1," + decimals + "}))))\\s*$"
            return String(value).match(new RegExp(regExpString));
        }
    }

    private specialKeys = [
        'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete','Right','Left'];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event) {
        if ((this.specialKeys.indexOf(event.key) !== -1) ||
            (event.key === 'a' && event.ctrlKey === true) || // Allow: Ctrl+A
            (event.key === 'c' && event.ctrlKey === true) || // Allow: Ctrl+C
            (event.key === 'v' && event.ctrlKey === true) || // Allow: Ctrl+V
            (event.key === 'x' && event.ctrlKey === true)) {
            return;
        }

        let current: string = this.el.nativeElement.value;
        let next: string = current.substring(0, event.target.selectionStart) +
        event.key + current.substring(event.target.selectionStart, current.length);
        if ((next && !this.check(next, this.decimals)) || event.key === ' ') {
            event.preventDefault();
        }
    }

    @HostListener('paste', ['$event']) onPaste(event) {
        // Don't allow pasted text that contains non-numerics
        const pastedText = (event.originalEvent || event).clipboardData.getData('text/plain');
        if (pastedText && !this.check(pastedText, this.decimals)) {
            event.preventDefault();
        }
    }
}