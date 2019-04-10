import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task-manager/task.service';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { ParentTask } from 'src/app/task-manager/parent-task.model';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';
import { Project } from 'src/app/add-project/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { ParentTaskService } from '../../service/parent-task.service';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-manager-update',
  templateUrl: './task-manager-update.component.html',
  styleUrls: ['./task-manager-update.component.css']
})
export class TaskManagerUpdateComponent implements OnInit {
  sliderPointerVal:number = 1;
  taskId:number;
  taskName:string;
  parentName:string;
  startDate:string;
  endDate:string;
  isParent:boolean;
  userName:string;
  project:string;
  status:string;
  
  parent:ParentTask;

  displayParentTask:string = "none";
  displayProject:string = "none";
  displayUser:string = "none";

  modalSelectedUser:User;
  modalSelectedProject:Project;
  modalSelectedTask:TaskDetails;

  userEngaged:boolean;
  
  constructor(private taskService:TaskService, 
              private parentTaskService:ParentTaskService,
              private userService:UserService, 
              private projectService:ProjectService,
              private router:Router,
              private utilService:UtilService) { }

  users:User[] = [];
  cachedusers:User[] = [];

  projects:Project[] = [];
  cachedProjects:Project[] = [];

  tasks:TaskDetails[] = [];
  cachedTasks:TaskDetails[];
  searchKey:string;

  ngOnInit() {
    let task = this.taskService.fetchUpdatableTask();
    this.sliderPointerVal = 1;
    this.taskId = task.taskId;
    this.taskName = task.task;
    this.parentName = task.parent != null ? task.parent.parentTask : "";
    this.startDate = task.startDate;
    this.parent = task.parent;
    this.endDate = task.endDate
    this.isParent = task.parent == null;
    this.userName = task.userId != null ? (task.userId.firstName + " " + task.userId.lastName) : "";
    this.modalSelectedUser = task.userId;
    this.project = task.projectId != null ? task.projectId.project : "";
    this.modalSelectedProject = task.projectId;
    this.status = task.status;
    this.sliderPointerVal = task.priority;
    // this.taskId = task.taskId;
    // this.sliderPointerVal = task.priority;
    // this.taskName = task.task;
    // this.parent = task.parent;
    // this.parentId = task.parent.parentId;
    // this.parentTask = this.parent.parentTask;
    // this.startDate = task.startDate;
    // this.endDate = task.endDate;
    // this.user = task.userId;
    // this.project = task.projectId;
    // this.status = task.status;
  }

  updateTask(){
    // let parentTask:ParentTask;
    // if(this.parentId != ""){
    //   parentTask = new ParentTask("0",this.parentTask);
    // }
    // alert("this.userEngaged: " + this.userEngaged);
    // if(this.userEngaged){
    //   alert("User is already busy with other task. Please assign to others");
    //   return;
    // }
    if(!this.isParent){
      let parentTask:ParentTask;
      if(this.parent == undefined || this.parent == null){
        parentTask = new ParentTask("", this.parentName);
      }else{
        parentTask = this.parent;
      }
    }
    let taskDetails = new TaskDetails(this.taskId,this.taskName, this.parent,
      this.sliderPointerVal, this.startDate, this.endDate, this.modalSelectedUser,this.modalSelectedProject, this.status );
    // let task = new TaskDetails(this.taskId,this.taskName,parentTask, this.sliderPointerVal,
    //                           this.startDate, this.endDate, this.user, this.project, this.status);
    this.taskService.updateTask(taskDetails)
      .subscribe(data => {
        console.log(data);
        if(data != null){
          alert("data updated successfully");
          this.cancelUpdate();
        }
      });
  }

  checkUserEngaged(){
    this.userService.getUserById(this.modalSelectedUser.userId).subscribe( data => {
      if(data != null && data != undefined){
        this.userEngaged = !(data.taskId != null || data.taskId.taskId != this.taskId);
      }
    });
  }

  cancelUpdate(){
    this.router.navigate(['/view']);
  }

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
    this.modalSelectedProject = modalSelectedProject;
  }

  onSelectFromProjectModal(){
    this.project = this.modalSelectedProject.project;
    this.onCloseHandleProjectModal();
  }

  searchProjectFromList(){
      if(this.searchKey != ""){
        this.projects = this.utilService.searchProjectFromList(this.cachedProjects, this.searchKey);
      }else{
        this.projects = this.cachedProjects;
      }
    }


//Parent task Modal
openParentModal(){
    this.taskService.getAllTask().subscribe(data => {
      this.tasks = data;
      this.cachedTasks = this.tasks;
    });
    this.displayParentTask="block"; 
}

onCloseHandleParentModal(){
    this.displayParentTask="none"; 
}

storeTask(modalSelectedTask){
  this.modalSelectedTask = modalSelectedTask;
  this.parent = new ParentTask(this.modalSelectedTask.taskId+"", this.modalSelectedTask.task);
}

onSelectParentModal(){
  this.parentName = this.parent.parentTask;
  this.onCloseHandleParentModal();
}
searchParentFromList(){
  if(this.searchKey != ""){
      this.tasks = this.utilService.searchParentFromList(this.cachedTasks, this.searchKey);
    }else{
      this.tasks = this.cachedTasks;
    }
  }

//User Modal
  openUserModal(){
      this.userService.getUnassignedUsers().subscribe(data => {
          this.users = data;
          this.cachedusers = this.users;
      });
      this.displayUser="block"; 
  }

  onCloseHandleUserModal(){
      this.displayUser="none"; 
  }

  onHandleSaveUserModal(){
      this.userName = this.modalSelectedUser.firstName + " " + this.modalSelectedUser.lastName;
      this.onCloseHandleUserModal();
  }

  storeUser(modalSelectedUser:User){
    this.modalSelectedUser = modalSelectedUser;
    // this.checkUserEngaged();
  }

  searchUserFromList(){
    if(this.searchKey != ""){
        this.users = this.utilService.searchUserFromList(this.cachedusers, this.searchKey);
      }else{
        this.users = this.cachedusers;
      }
    }
}
