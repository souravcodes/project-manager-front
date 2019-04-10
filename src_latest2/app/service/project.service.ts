import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/add-project/project.model';
import { UserService } from 'src/app/service/user.service';

const projectURL:string = "http://localhost:8585/project";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private projects:Project[] = [];
    
    constructor(private http:HttpClient, private userService:UserService){}

    public setProjectList(projects:Project[]){
        this.projects = projects;
    }

    public getProjectList():Project[]{
        return this.projects;
    }

    public getAllProjects():Observable<any>{
        return this.http.get(projectURL + "/all");
    }

    public addProject(project:Project):Observable<any>{
        return this.http.post(projectURL + "/add", project);
    }

    public updateProject(project:Project):Observable<any>{
        return this.http.put(projectURL + "/update", project);
    }

    public deleteProject(project:Project):Observable<any>{
        if(project.manager != null){
            let id:string = project.projectId;
            project.manager.projectId = null;
            this.userService.updateUserByProject(project.manager).subscribe( data => {
                this.http.delete(projectURL + "/delete/" + id).subscribe();
            });
        }else{
            this.http.delete(projectURL + "/delete/" + project.projectId).subscribe();
        }
        return new Observable();
    }
}