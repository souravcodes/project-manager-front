import { User } from 'src/app/add-user/user.model';
import { TaskDetails } from 'src/app/task-manager/task.model';

export class Project {
    projectId:string;
	project:string;
	startDate:string;
	endDate:string;
	priority:number;
    manager:User;
    userId:User;
    tasks:TaskDetails[];
    size:number = 0;

    setTasks(tasks:TaskDetails[]){
        this.tasks = tasks;
    }

    constructor(projectId:string,
                project:string,
                startDate:string,
                endDate:string,
                priority:number,
                manager:User,
                tasks:TaskDetails[]){
        this.projectId = projectId;
        this.project = project;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.manager = manager;
        this.tasks = tasks;
    }
}