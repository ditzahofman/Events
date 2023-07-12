import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventTypeModel } from '../models/eventTypes-model';
import { appConfig } from '../utils/app-config';
import { Observable, firstValueFrom } from 'rxjs';
import { EventModel } from '../models/event-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient ) { }

  public async getAllTypes():Promise<EventTypeModel[] >{
    
    const obsevable= this.http.get<EventTypeModel[]>(appConfig.eventsTypesUrl)
    const types = await firstValueFrom(obsevable)
    return types
  }

  public async  getAllEventsByTypes(eventTypeId:string):Promise<EventModel[]> {
    
    const obsevable= this.http.get<EventModel[]>(appConfig.eventsUrl+eventTypeId)
    const types = await firstValueFrom(obsevable)
    return types
  }

  public async addEvent(event:EventModel):Promise<void>{
    const observable = this.http.post(appConfig.eventsUrl,event)
    await firstValueFrom(observable)
  }

  public async deleteEvent(_id:string):Promise<void>{
    const observable = this.http.delete(appConfig.eventsUrl+_id)
    await firstValueFrom(observable)
  }

}
