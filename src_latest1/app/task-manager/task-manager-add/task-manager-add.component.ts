import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task-manager/task.service';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { ParentTask } from 'src/app/task-manager/parent-task.model';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';
import { UtilService } from 'src/app/service/util.service';
import { Project } from 'src/app/add-project/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { ParentTaskService } from '../../service/parent-task.service';

@Component({
  selector: 'app-task-manager-add',
  templateUrl: './task-manager-add.component.html',
  styleUrls: ['./task-manager-add.component.css']
})
export class TaskManagerAddComponent implements OnInit {

  sliderPointerVal:number = 1;
  taskId:number;
  taskName:string;
  parentName:string;
  startDate:string;
  endDate:string;
  isParent:boolean;
  userName:string;
  project:string;


  displayParentTask:string = "none";
  displayProject:string = "none";
  displayUser:string = "none";

  modalSelectedUser:User;
  modalSelectedProject:Project;
  modalSelectedTask:TaskDetails;
  searchKey:string;

  parent:ParentTask;

  users:User[] = [
    new User("1","User 1","Title 1", "112365", null, null),
    new User("2","User 2","Title 2", "212365", null, null),
    new User("3","User 3","Title 3", "312365", null, null),
    new User("4","User 4","Title 4", "412365", null, null),
    new User("5","User 5","Title 5", "512365", null, null)
    
  ];
  cachedusers:User[] = [];
  

  projects:Project[] = [
    new Project("1", "Project 1","1987-10-23", "1999-11-23", 9, new User("1","User 1","Title 1", "112365", null, null), null),
    new Project("2", "Project 2","1987-11-23", "1999-11-23", 5, new User("2","User 2","Title 2", "212365", null, null), null),
    new Project("3", "Project 3","1987-09-23", "1999-11-23", 7, new User("3","User 3","Title 3", "312365", null, null), null),
    new Project("4", "Project 4","1987-05-23", "1999-11-23", 2, new User("4","User 4","Title 4", "412365", null, null), null)
  ];
  cachedProjects:Project[] = [];

  tasks:TaskDetails[] = [
      new TaskDetails(1, 'task 1 ', new ParentTask("2","task 2"), 5, '27-02-2018', '27-02-2019', null, null, "NEW"),
      new TaskDetails(2, 'task 2', new ParentTask("3","task 3"), 4, '27-02-2018', '27-02-2020', null, null, "NEW"),
      new TaskDetails(3, 'task 3', new ParentTask("4","task 4"), 3, '27-02-2018', '27-02-2021', null, null, "NEW"),
      new TaskDetails(4, 'task 4', new ParentTask("1","task 1"), 2, '27-02-2018', '27-02-2022', null, null, "NEW")
    ];
  cachedTasks:TaskDetails[] = [];
  
  constructor(private taskService:TaskService, 
              private parentTaskService:ParentTaskService,
              private userService:UserService, 
              private projectService:ProjectService,
              private utilService:UtilService) { }

  ngOnInit() {
  }

  sliderPointerChange(pointerValue){
    this.sliderPointerVal = pointerValue;
  }

  addTask(){
      if(!this.isParent){
          let parentTask:ParentTask;
          if(this.parent == undefined || this.parent == null){
            parentTask = new ParentTask("", this.parentName);
          }else{
            parentTask = this.parent;
          }
        }
        let taskDetails = new TaskDetails(this.taskId,this.taskName, this.parent,
                            this.sliderPointerVal, this.startDate, this.endDate, this.modalSelectedUser,this.modalSelectedProject, "NEW" );
        
        this.taskService.addTask(taskDetails)
            .subscribe((data:TaskDetails) => {
              taskDetails = data;
              if(!this.isParent){
                alert("Task saved");
              }else{
                this.parentTaskService.addParentTask(new ParentTask(data.taskId.toString(), data.task));
                alert("Parent task added.");
              }
              this.resetPage();
            });
      // }else{
      //   let parentTask:ParentTask = new ParentTask("", this.taskName);
      //   this.parentTaskService.addParentTask(parentTask).subscribe(data => {
      //     alert("Parent task added.");
      //   });
      // }
  }

  resetPage(){
    this.sliderPointerVal = 1;
    this.taskName = "";
    this.parentName = "";
    this.startDate = "";
    this.endDate = "";
    this.isParent = false;
    this.userName = "";
    this.project = "";
  }

//Project Modal
  openProjectModal(){
      this.projectService.getAllProjects().subscribe(data => {
        this.projects = data;3
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
      this.userName = this.modalSelectedUser.firstName;
      this.onCloseHandleUserModal();
  }

  storeUser(modalSelectedUser:User){
    this.modalSelectedUser = modalSelectedUser;
  }

 searchUserFromList(){
  if(this.searchKey != ""){
      this.users = this.utilService.searchUserFromList(this.cachedusers, this.searchKey);
    }else{
      this.users = this.cachedusers;
    }
  }
}
