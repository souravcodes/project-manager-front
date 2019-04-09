import { ParentTask } from "src/app/task-manager/parent-task.model";
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';
import { Project } from 'src/app/add-project/project.model';
import { ProjectService } from 'src/app/service/project.service';

export class TaskDetails {
    taskId:number;
    parent:ParentTask;
    projectId:Project;
    task:string;
    startDate:string;
    endDate:string;
    priority:number;
    status:string;
    userId:User;

    constructor(taskId:number,
                task:string,
                parent:ParentTask,
                priority:number,
                startDate:string,
                endDate:string,
                userId:User,
                projectId:Project,
                status:string){
        this.taskId = taskId;
        this.task = task;
        this.parent = parent;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
        this.projectId = projectId;
        this.status = status;
    }
}