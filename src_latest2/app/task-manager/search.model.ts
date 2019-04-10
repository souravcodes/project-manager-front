export class SearchCriteria {
    task:string = "";
    parentTask:string = "";
    priorityFrom:number = 0;
    priorityTo:number = 0;
    startDate:string = "";
    endDate:string = "";

    constructor(
            task:string,
            parentTask:string,
            priorityFrom:number,
            priorityTo:number,
            startDate:string,
            endDate:string){
                this.task = task;
                this.parentTask = parentTask;
                this.priorityFrom = priorityFrom;
                this.priorityTo = priorityTo;
                this.startDate = startDate;
                this.endDate = endDate;
            } 
}