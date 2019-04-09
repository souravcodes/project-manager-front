import { Project } from 'src/app/add-project/project.model';
import { TaskDetails } from 'src/app/task-manager/task.model';

export class User{

    userId:string;
    firstName:string;
    lastName:string;
    employeeId:string;
    projectId:Project;
    taskId:TaskDetails;

    constructor(userId:string,
                firstName:string,
                lastName:string,
                employeeId:string,
                projectId:Project,
                taskId:TaskDetails){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeId = employeeId;
        this.projectId = projectId;
        this.taskId = taskId;
    }
}