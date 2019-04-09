import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { SearchCriteria } from 'src/app/task-manager/search.model';
import { TaskService } from 'src/app/task-manager/task.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/add-project/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-task-manager-search',
  templateUrl: './task-manager-search.component.html',
  styleUrls: ['./task-manager-search.component.css']
})
export class TaskManagerSearchComponent implements OnInit {

  @Output("taskDetailsEmitter")
  taskEventEmitter: EventEmitter<Observable<any>> = new EventEmitter<Observable<any>>();
  @Output()
  sortCriteria: EventEmitter<string> = new EventEmitter<string>();

  lastInputTime:number = 0;

  variable:TaskDetails[];
  taskName:string;
  parentId:string;
  priorityFrom:number;
  priorityTo:number;
  startDate:string;
  endDate:string;
  error:boolean = false;
  proceed:boolean = false;

  projectName:string;
  project:Project;
  projects:Project[] = [];
  cachedProjects:Project[] = [];
  displayProject:string="none";

  searchKey:string;
  
    
  constructor(private taskService:TaskService, 
              private projectService:ProjectService,
              private utilService:UtilService) {
  }

  ngOnInit() {
    this.taskName = "";
    this.parentId = "";
    this.priorityFrom = 0;
    this.priorityTo = 0;
    this.startDate = "";
    this.endDate = "";
    // this.taskName = sessionStorage.getItem("task-name");
    // this.parentId = sessionStorage.getItem("parent-id");
    // this.priorityFrom = sessionStorage.getItem("priority-from");
    // this.priorityTo = sessionStorage.getItem("priority-to");
    // this.startDate = sessionStorage.getItem("start-date");
    // this.endDate = sessionStorage.getItem("end-date");
  }

  public getTask(){
    // let project:Project = new Project(this.project.projectId, "","","",0,null,null);
        this.taskEventEmitter.emit(this.taskService.getTaskByProjectId(this.project));
  }
  sortList(criteria:string){
    this.sortCriteria.emit(criteria);
  }
  //  this.validate();
  //   if(!this.error && this.proceed){
  //     // this.storeSearchData();
  //     let searchCriteria = new SearchCriteria(this.taskName,
  //                                             this.parentId,
  //                                             this.priorityFrom,
  //                                             this.priorityTo,
  //                                             this.startDate,
  //                                             this.endDate);
  //     this.taskEventEmitter.emit(this.taskService.fetchTask(searchCriteria));
  //   } else {
  //     this.taskEventEmitter.emit(new Observable());
  //   }

  // private validate(){
  //     this.error = (this.priorityFrom > this.priorityTo) 
  //                  || (this.startDate == "" && this.endDate != "")
  //                  || (this.startDate != "" && this.endDate == "")
  //                  || (this.startDate > this.endDate);
      
  //     this.proceed = (this.taskName != "")
  //                    || (this.parentId != "" && this.parentId != "0")
  //                    || (this.priorityTo != 0)
  //                    || (this.startDate != "")
  //                    || (this.endDate != "");
  // }
  //Project Modal
  openProjectModal(){
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data;
      this.cachedProjects = this.projects;
    });
    this.displayProject="block"; 
    }

    onCloseHandleProjectModal(){
        this.displayProject="none"; 
    }

    storeProject(modalSelectedProject){
      this.project = modalSelectedProject;
    }

    onSelectFromProjectModal(){
      this.projectName = this.project.project;
      this.onCloseHandleProjectModal();
      this.getTask();
    }

    searchProjectFromList(){
      if(this.searchKey != ""){
        this.projects = this.utilService.searchProjectFromList(this.cachedProjects, this.searchKey);
      }else{
        this.projects = this.cachedProjects;
      }
    }
  // private storeSearchData(){
  //   sessionStorage.setItem("task-name", this.taskName);
  //   sessionStorage.setItem("parent-id", this.parentId);
  //   // sessionStorage.setItem("priority-from", this.priorityFrom);
  //   // sessionStorage.setItem("priority-to", this.priorityTo);
  //   sessionStorage.setItem("start-date", this.startDate);
  //   sessionStorage.setItem("end-date", this.endDate);
  // }
}
