import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LedService {
    constructor(private http: HttpClient) {}

    getLedState(): Observable<boolean> {
        return this.http.get<boolean>("http://localhost:3001/getLEDState");
    }
}
