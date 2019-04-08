import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/add-project/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projects:Project[] = [];
  addUpdateButtonName:string ="add";
  projectId:string = "";
  project:string = "";
  setdates:boolean = false;
  startDate:string = "";
  endDate:string = "";
  manager:string = "";
  priority:number = 1;

  searchKey:string;

  displayUser:string="none";
  modalSelectedUser:User;
  userToUpdate:User;

  cachedusers:User[] = [];
  
  users:User[] = [
    new User("1","User 1","Title 1", "112365", null, null),
    new User("2","User 2","Title 2", "212365", null, null),
    new User("3","User 3","Title 3", "312365", null, null),
    new User("4","User 4","Title 4", "412365", null, null),
    new User("5","User 5","Title 5", "512365", null, null),
    
  ];
  tasks:TaskDetails[] = [];

  constructor(private projectService:ProjectService, 
              private userService:UserService,
              private utilService:UtilService) { }

  ngOnInit() {
    
  }
  // openModal(){
  //     this.display="block"; 
  // }

  // onCloseHandled(){
  //     this.display="none"; 
  // }
  receiveUpdate(data:Project){
    this.projectId = data.projectId;
    this.project = data.project;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.priority = data.priority;
    if(data.manager != null){
      this.manager = data.manager.firstName + " " + data.manager.lastName;
      this.userToUpdate = data.manager;
      this.modalSelectedUser = data.manager;
    }else{
      this.manager = "";
      this.userToUpdate = null;
      this.modalSelectedUser = null;
    }
    this.addUpdateButtonName = "update";
    this.tasks = data.tasks;
  }

  addProject(){
    if(!this.checkDates()){
      return;
    }
    if(this.projectId == ""){
      let newProject:Project = new Project("", this.project, this.startDate, this.endDate, this.priority,this.modalSelectedUser, this.tasks);
      this.projectService.addProject(newProject).subscribe(data => {
        let projectList:Project[] = this.projectService.getProjectList();
        if(projectList == undefined || projectList == [] || projectList == null){
          this.projectService.setProjectList([data]);
        }else{
          this.projectService.getProjectList().push(data);
        }
        this.projects = this.projectService.getProjectList();
        alert("Project added successfully");
        this.reset();
      });
    }else{
      let newProject:Project = new Project(this.projectId, this.project, this.startDate, this.endDate, this.priority,this.modalSelectedUser, this.tasks);
      this.projectService.updateProject(newProject).subscribe(data => {
         this.projectService.getAllProjects().subscribe(e => {
            this.projects = e;
         });
        alert("data update successful.");
        this.reset();
      });
    }
  }

  reset(){
    this.projectId = "";
    this.project = "";
    this.setdates = false;
    this.startDate = "";
    this.endDate = "";
    this.manager = "";
    this.priority = 1;
    this.addUpdateButtonName = "add";
  }

  checkDates():boolean{
    if(this.startDate != "" && this.endDate != ""){
      if(this.startDate > this.endDate){
        alert("End date can't be prior to start date.");
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

searchUserFromList(){
  if(this.searchKey != ""){
      this.users = this.utilService.searchUserFromList(this.cachedusers, this.searchKey);
    }else{
      this.users = this.cachedusers;
    }
  }

  //User Modal
  openUserModal(){
      this.userService.getAllUser().subscribe(data => {
          this.users = data;
          this.cachedusers = this.users;
      });
      this.displayUser="block"; 
  }

  onCloseHandleUserModal(){
      this.displayUser="none"; 
  }

  onHandleSaveUserModal(){
      this.manager = this.modalSelectedUser.firstName + " " + this.modalSelectedUser.lastName;
      this.onCloseHandleUserModal();
  }

  storeUser(modalSelectedUser:User){
    this.modalSelectedUser = modalSelectedUser;
  }
}
