import { Component } from '@angular/core';
import { LedService } from './led.service';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent {
    ledState: string = '';

    constructor(private ledService: LedService) { }

    getLedState(): void {
        this.ledService.getLedState().subscribe((response) => {
            this.ledState = response ? 'ON' : 'OFF';
            console.log('State of the LED : ',  this.ledState);
        }, (error) => {
            console.log('Error in getting the led state : ', error);
        });
    }
}
