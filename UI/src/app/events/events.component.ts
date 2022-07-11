import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { Event } from './event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
    events: Event[] = [];

    constructor(private eventsService: EventsService) { }
    
    ngOnInit(): void {
        this.getEvents();
    }

    getEvents(): void {
        this.eventsService.getEvents().subscribe((response) => {
            this.events = response;
        }, (error) => {
            console.log('Error in function getEvents : ', error);
        });
    }
}
