import { TaskDetails } from 'src/app/task-manager/task.model';
import { Injectable } from '@angular/core';
import { SearchCriteria } from 'src/app/task-manager/search.model';
import { Project } from 'src/app/add-project/project.model';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService implements OnInit {
    taskDetails: TaskDetails;
    backEndHostName:string = 'http://localhost:8585/task';

    constructor(private http:HttpClient){}

    ngOnInit(){}

    storeUpdatableTask(task:TaskDetails){
        this.taskDetails = task;
    }

    fetchUpdatableTask():TaskDetails {
        return this.taskDetails;
    }

    successUpdate(){
        this.taskDetails = null;
    }

    addTask(task:TaskDetails): Observable<any>{
        return this.http.post(this.backEndHostName + "/add", task);
    }

    fetchTask(searchCriteria:SearchCriteria): Observable<any>{
        return this.http.put(this.backEndHostName + "/filtered", searchCriteria);    
    }

    fetchTaskById(id:number): Observable<any>{
        return this.http.get(this.backEndHostName + "/" + id);
    }

    updateTask(task:TaskDetails): Observable<any>{
        return this.http.put(this.backEndHostName + "/update", task);
    }

    deleteTask(task:TaskDetails): Observable<any>{
        return this.http.delete(this.backEndHostName + "/delete" + "/" + task.taskId);
    }
    
    endTask(task:TaskDetails): Observable<any>{
        return this.http.put(this.backEndHostName + "/update", task);
    }

    getAllTask():Observable<any>{
        return this.http.get(this.backEndHostName + "/all");
    }

    getTaskByProjectId(project:Project):Observable<any>{
        return this.http.put(this.backEndHostName + "/project", project);
    }
}