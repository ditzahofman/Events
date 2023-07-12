import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventModel } from 'src/app/models/event-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent {

  @Input()
  public event:EventModel

  @Output() onDelete = new EventEmitter<void>();

  public constructor(private dataService:DataService){}
  
  public async deleteEvent(): Promise<void> {
    try {
      if (!(window.confirm('Are you sure?'))) return;
      await this.dataService.deleteEvent(this.event._id)
      alert('The event has  been successfully deleted');
         } catch (err: any) {
      alert(err.message);
    }
  }

  public IfPass(date:string):boolean{
    const now = new Date()
    const dateConventToDateValue=new Date(date)
    return now >= dateConventToDateValue
  }
}
