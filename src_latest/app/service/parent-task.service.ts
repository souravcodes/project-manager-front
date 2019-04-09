import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentTask } from 'src/app/task-manager/parent-task.model';

const parentServiceUrl = "http://localhost:8585/task/parent";

@Injectable({
    providedIn: 'root'
})
export class ParentTaskService{
    
    constructor(private http:HttpClient){}

    addParentTask(parentTask:ParentTask):Observable<any>{
        return this.http.post(parentServiceUrl + "/add", parentTask);
    }
}