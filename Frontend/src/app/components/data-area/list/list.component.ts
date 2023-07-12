import { Component, OnInit } from '@angular/core';
import { EventType } from '@angular/router';
import { findIndex } from 'rxjs';
import { EventModel } from 'src/app/models/event-model';
import { EventTypeModel } from 'src/app/models/eventTypes-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  public isTableView = true;
  public events:EventModel[]=[]
  public eventsTypes:EventTypeModel[]=[]

  public constructor(private dataService:DataService){}
  
  async ngOnInit() {
try {
  this.eventsTypes = await this.dataService.getAllTypes()

} catch (error:any) {
  alert(error)
}
  }

  public async displayEvents(arg:Event){
    try {
      const selected = arg.target as HTMLSelectElement 
      const value = selected.value
      this.events = await this.dataService.getAllEventsByTypes(value)

    } catch (error) {
      alert(error)
    }
  }

  
  

  public async deleteMe(_id:string){
    try {
      if(!window.confirm("Are you sure that you want to delete event?")) return
      await this.dataService.deleteEvent(_id)
      alert("The Event has been deleted")
      this.events.splice(this.events.findIndex((v)=>v._id===_id))
     
    } catch (error) {
      alert(error)
    }
  
  }

  public IfPass(date:string):boolean{
    const now = new Date()
    const dateConventToDateValue=new Date(date)
    return now >= dateConventToDateValue
  }

  toggleView() {
    this.isTableView = !this.isTableView;
  }

   // Handle delete (from card)
   public handleDelete(_id: string): void {
    this.events.splice(this.events.findIndex(e => e._id === _id), 1);
  }
}
