import { Injectable } from '@angular/core';
import { TaskService } from 'src/app/task-manager/task.service';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { ParentTask } from 'src/app/task-manager/parent-task.model';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';
import { Project } from 'src/app/add-project/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { ParentTaskService } from 'src/app/service/parent-task.service';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    searchProjectFromList(projects:Project[], searchKey:string):Project[]{
        if(searchKey != ""){
        let tempProjectList:Project[] = [];
        for(let project of projects){
            if(project.project.includes(searchKey)
                || project.projectId == searchKey){
                tempProjectList.push(project);
                }
            }
            projects = tempProjectList;
            return projects;
        }else{
            return null;
        }
    }

    searchParentFromList(tasks:TaskDetails[], searchKey:string):TaskDetails[]{
        if(searchKey != ""){
        let tempTaskList:TaskDetails[] = [];
        for(let task of tasks){
            if(task.task.includes(searchKey)){
                tempTaskList.push(task);
                }
            }
            tasks = tempTaskList;
            return tasks;
        }else{
            return null;
        }
    }

    searchUserFromList(users:User[], searchKey:string):User[]{
     if(searchKey != ""){
        let tempUserList:User[] = [];
        for(let user of users){
            if(user.firstName.includes(searchKey)
                || user.lastName == searchKey){
                tempUserList.push(user);
                }
            }
            users = tempUserList;
            return users;
        }else{
            return null;
        }
    }


  sortByParam(val1:string, val2:string, reversed:boolean){
    if(val1 > val2)
      return !reversed ? 1 : -1;
    else if(val1 < val2)
      return !reversed ? -1 : 1;
    else
      return 0;
  }


}