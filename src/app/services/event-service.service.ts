import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public _subject = new BehaviorSubject<any>("");
  emit<T>(data:T){
    this._subject.next(data);
  }
  on<T>():Observable<T>{
    return this._subject.asObservable();
  }
  constructor() { }
}
