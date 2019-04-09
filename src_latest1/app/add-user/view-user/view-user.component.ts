import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  @Input() users:User[] = [];
  cacheUserList:User[] = [];
  sortByFN:boolean = false;
  sortByLN:boolean = false;
  sortByID:boolean = false;
  
  @Output("editableUser") userEmitter: EventEmitter<User> = new EventEmitter<User>();
  searchKey:string = "Search...";
  constructor(private userService:UserService,
              private utilService:UtilService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(data => {
      this.users = data;
      this.cacheUserList = this.users;
      this.userService.setLocalUserList(this.users);
    });
  }

  editUser(editableUser:User){
    this.userEmitter.emit(editableUser);
  }

  deleteUser(userToDelete:User){
    if(confirm("Confirm deletion")){
      this.userService.deleteUserById(userToDelete.userId).subscribe( e => {
        const index: number = this.users.indexOf(userToDelete);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
      });
    }
  }

  sortList(criteria:string){
    if(criteria == "FN"){
      this.users.sort((a,b) => {
        return this.utilService.sortByParam(a.firstName, b.firstName, this.sortByFN);
      })
      this.sortByFN = !this.sortByFN;
    }

    if(criteria == "LN"){
      this.users.sort((a,b) => {
        return this.utilService.sortByParam(a.lastName, b.lastName, this.sortByLN);
      });
      this.sortByLN = !this.sortByLN;
    }

    if(criteria == "ID"){
      this.users.sort((a,b) => {
        return this.utilService.sortByParam(a.employeeId, b.employeeId, this.sortByID);
      });
      this.sortByID = !this.sortByID;
    }
  }

  clearField1(){
      if(this.searchKey == "Search..."){
        this.searchKey = "";
        return;
      }
    }
    
    searchUserFromList(){
      if(this.searchKey != ""){
        this.users = this.utilService.searchUserFromList(this.cacheUserList, this.searchKey);
      }else{
        this.users = this.cacheUserList;
      }
    }
  // searchUserFromList(){
  //   if(this.searchKey != "" && this.searchKey != "Search..."){
  //     let tempUserList:User[] = [];
  //     for(let user of this.cacheUserList){
  //       console.log("pushing...");
  //       if(user.firstName.includes(this.searchKey)
  //           || user.lastName.includes(this.searchKey)
  //           || user.employeeId == this.searchKey
  //           || user.userId == this.searchKey){
  //             tempUserList.push(user);
  //           }
  //       }
  //       this.users = tempUserList;
  //       }else{
  //         this.users = this.cacheUserList;
  //       }
  //   }
}
