import { Component, OnInit } from '@angular/core';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { TaskService } from 'src/app/task-manager/task.service';
import { Router } from '@angular/router';
import { ParentTask } from 'src/app/task-manager/parent-task.model';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-task-manager-view',
  templateUrl: './task-manager-view.component.html',
  styleUrls: ['./task-manager-view.component.css']
})
export class TaskManagerViewComponent implements OnInit {

  show:boolean = false;
  isEditable:boolean=false;
  editing:boolean=true;
  markedIndex:number = -1;
  displayParentTask:string = "none";
  displayProject:string = "none";
  displayUser:string = "none";

  modalSelectedTask:TaskDetails;

  editableTask:TaskDetails;
  
  reverseSDSort:boolean = false;
  reverseEDSort:boolean = false;
  reversePRSort:boolean = false;
  reverseCMSort:boolean = false;

  tasks: TaskDetails[] = [];
  constructor(private taskService:TaskService, 
              private router:Router,
              private utilService:UtilService) {
  }

  ngOnInit() {
    /*this.tasks = [
      new TaskDetails(1, 'task 1 ', '0', 5, '27-02-2018', null,),
      new TaskDetails(2, 'task 2', '1', 4, '27-02-2018', null,),
      new TaskDetails(3, 'task 3', '2', 3, '27-02-2018', null,),
      new TaskDetails(4, 'task 4', '3', 2, '27-02-2018', null,)
    ];*/
  }

  populateTasks(data){
    data.subscribe(e => {
      this.tasks = e;
      this.show = true;
      return;
    });
    this.tasks = [];
    this.show = false;
  }

  updateTask(editableTask:TaskDetails){
    // this.isEditable = !this.isEditable;
    // if(this.isEditable)
    //   this.editableTask = editableTask;
    // if(!this.isEditable){
    //   this.taskService.updateTask(this.editableTask)
    //   .subscribe(data => {
    //     console.log(data);
    //     if(data != null){
    //       alert("data updated successfully");
    //     }
    //   });
    // }
    this.taskService.storeUpdatableTask(editableTask);
    this.router.navigate(['/update']);
  }

  endTask(taskToEnd:TaskDetails){
    let proceed:boolean = confirm("Are you sure, want to complete the activity?");
    if(this.markedIndex != -1 && proceed){
      if(this.markedIndex == taskToEnd.taskId){
        this.markedIndex = -1;
        taskToEnd.status = "completed";
        this.taskService.endTask(taskToEnd).subscribe(data=>{
          const index: number = this.tasks.indexOf(taskToEnd);
          if (index !== -1) {
              //this.tasks.splice(index, 1);
          }
        });
      }
    }else {
      this.markedIndex = -1;
    }
  }

  markRow(index:number){
    if(this.markedIndex == -1)
      this.markedIndex = index;
    else
      this.markedIndex = -1;
  }

  sortList(criteria:string){

    if(criteria == "SD"){
      this.tasks.sort((a,b) => {
        return this.utilService.sortByParam(a.startDate, b.startDate, this.reverseSDSort);
      })
      this.reverseSDSort = !this.reverseSDSort;
    }

    if(criteria == "ED"){
      this.tasks.sort((a,b) => {
        return this.utilService.sortByParam(a.endDate, b.endDate, this.reverseEDSort);
      });
      this.reverseEDSort = !this.reverseEDSort;
    }

    if(criteria == "PR"){
      this.tasks.sort((a,b) => {
        return this.utilService.sortByParam(a.priority.toString(), b.priority.toString(), this.reversePRSort);
      });
      this.reversePRSort = !this.reversePRSort;
    }

    if(criteria == "CM"){
      this.tasks.sort((a,b):number => {
        if(b.status == "NEW")
          return this.reverseCMSort ? 1 : -1;
        else if(b.status == "completed")
          return this.reverseCMSort ? -1 : 1;
        else
          return 0;
      });
      this.reverseCMSort = !this.reverseCMSort;
    }
  }
  //Parent task Modal
  openParentModal(){
    this.taskService.getAllTask().subscribe(data => {
      this.tasks = data;
    });
    this.displayParentTask="block"; 
    }

    onCloseHandleParentModal(){
        this.displayParentTask="none"; 
    }

    storeTask(modalSelectedTask){
      let newParent = new ParentTask(modalSelectedTask.taskId, modalSelectedTask.task);
      this.editableTask.parent = newParent;
      this.modalSelectedTask = modalSelectedTask;
    }

    onSelectParentModal(){
      this.onCloseHandleParentModal();
    }
}
