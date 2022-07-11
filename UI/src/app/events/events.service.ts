import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    constructor(private http: HttpClient) {}

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>("http://localhost:3000/api/events");
    }
}
