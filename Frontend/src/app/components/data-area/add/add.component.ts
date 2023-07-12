import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event-model';
import { EventTypeModel } from 'src/app/models/eventTypes-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  [x: string]: any;

  public event= new EventModel()
  public eventsTypes:EventTypeModel[]=[]

  public constructor(private dataService:DataService , public router:Router){}
  
  async ngOnInit() {
    try {
      this.eventsTypes = await this.dataService.getAllTypes()
    
    } catch (error:any) {
      alert(error)
    }
      }

      public async send() {
        try {
            await this.dataService.addEvent(this.event);
            alert("Event has been successfully added");
            this.router.navigateByUrl("/list");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

}
