import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUsers:User[] = [];
  userId:string = "";
  firstName:string = "";
  lastName:string = "";
  employeeId:string = "";
  // editableUser:User;

  addUpdateButtonName:string = "add";

  constructor(private userService:UserService) { }

  ngOnInit() {

  }
  
 addUser(){
   if(this.userId == ""){
      let user:User = new User("", this.firstName, this.lastName, this.employeeId, null, null);
      this.userService.addUser(user).subscribe(data => {
        let userList:User[] = this.userService.getLocalUserList();
        if(userList == undefined || userList == [] || userList == null){
          this.userService.setLocalUserList([data]);
        }else{
          this.userService.getLocalUserList().push(data);
        }
        alert("User added successfully.");
        this.newUsers = this.userService.getLocalUserList();
        this.reset();
      });
    }else{
      this.editUser();
    }
 }
 
 reset(){
    this.firstName = "";
    this.lastName = "";
    this.employeeId = "";
 }
 editUserReceiver(userData:User){
    // this.editableUser = userData;
    this.userId = userData.userId;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.employeeId = userData.employeeId;
    this.addUpdateButtonName = "update";
 }

 editUser(){
   let userToUpdate:User = new User(this.userId, this.firstName, this.lastName, this.employeeId, null, null);
   this.userService.updateUser(userToUpdate).subscribe(e => {
     alert("Data update successful.")
     this.addUpdateButtonName = "add";
    //  this.editableUser = userToUpdate;
      this.userService.getAllUser().subscribe(data => {
        this.newUsers = data;
        this.userService.setLocalUserList(this.newUsers);
      });
      this.userId = "";
      this.reset();
   });
 }
}
