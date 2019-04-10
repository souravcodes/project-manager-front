import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/add-project/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';
import { TaskService } from'src/app/task-manager/task.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  @Input() projects:Project[] = [
    new Project("1", "Project 1","1987-10-23", "1999-11-23", 9, new User("1","User 1","Title 1", "112365", null, null), null),
    new Project("2", "Project 2","1987-11-23", "1999-11-23", 5, new User("2","User 2","Title 2", "212365", null, null), null),
    new Project("3", "Project 3","1987-09-23", "1999-11-23", 7, new User("3","User 3","Title 3", "312365", null, null), null),
    new Project("4", "Project 4","1987-05-23", "1999-11-23", 2, new User("4","User 4","Title 4", "412365", null, null), null)
  ];
  searchKey:string;
  cachedProjects:Project[]

  reverseSDSort:boolean = false;
  reverseEDSort:boolean = false;
  reversePRSort:boolean = false;

  @Output("editableProject") editableProject:EventEmitter<Project> = new EventEmitter<Project>();

  constructor(private projectService:ProjectService, 
              private taskService:TaskService,
              private userService:UserService,
              private utilService:UtilService) { }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(data => {
      this.projectService.setProjectList(data);
      this.projects = data;
      // for(let project of this.projects){
      //   this.taskService.getTaskByProjectId(project).subscribe(data => {
      //       if(data != null && data != undefined && data != []){
      //         project.size = data.length;
      //       }else{
      //         project.size = 0;
      //       }
      //   });
      // }
      this.cachedProjects = this.projects;
    });
  }

  // getTaskList(project:Project){
  //   this.taskService.getTaskByProjectId(project).subscribe(data => {
  //     if(data != null && data != undefined && data != []){
  //       project.size = data.length;
  //     }else{
  //       project.size = 0;
  //     }
  // });
  // }
  // getTaskCount(project:Project):number{
  //   this.taskService.getTaskByProjectId(project).subscribe(data => {
  //       return data.length;
  //   });
  //   return 12;
  // }

  editProject(editableProject:Project){
    // console.log("editableProject.tasks.size : " + editableProject.manager.firstName);
    this.editableProject.emit(editableProject);
  }

  sortList(criteria:string){
    if(criteria == "SD"){
      this.projects.sort((a,b) => {
        return this.utilService.sortByParam(a.startDate, b.startDate, this.reverseSDSort);
      })
      this.reverseSDSort = !this.reverseSDSort;
    }

    if(criteria == "ED"){
      this.projects.sort((a,b) => {
        return this.utilService.sortByParam(a.endDate, b.endDate, this.reverseEDSort);
      });
      this.reverseEDSort = !this.reverseEDSort;
    }

    if(criteria == "PR"){
      this.projects.sort((a,b) => {
        return this.utilService.sortByParam(a.priority.toString(), b.priority.toString(), this.reversePRSort);
      });
      this.reversePRSort = !this.reversePRSort;
    }

    if(criteria == "CM"){
      for(let proejct of this.cachedProjects){

      }
    }
  }

  searchProjectFromList(){
      if(this.searchKey != ""){
        this.projects = this.utilService.searchProjectFromList(this.cachedProjects, this.searchKey);
      }else{
        this.projects = this.cachedProjects;
      }
    }

    deleteProject(projectToDelete:Project){
      if(confirm("Confirm deletion !!")){
        this.projectService.deleteProject(projectToDelete).subscribe(e => {
          
        });
      }
      const index: number = this.projects.indexOf(projectToDelete);
          if(index != -1){
            this.projects.splice(index, 1);
          }
    }
}
