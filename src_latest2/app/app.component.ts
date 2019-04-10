import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-manager';
  operation:string = "Add Task";

  setOperation(val:string){
    this.operation = val;
  }
}
