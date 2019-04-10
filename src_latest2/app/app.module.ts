import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskManagerAddComponent } from './task-manager/task-manager-add/task-manager-add.component';
import { TaskManagerViewComponent } from './task-manager/task-manager-view/task-manager-view.component';
import { TaskManagerSearchComponent } from './task-manager/task-manager-view/task-manager-search/task-manager-search.component';
import { TaskService } from 'src/app/task-manager/task.service';
import { TaskManagerUpdateComponent } from './task-manager/task-manager-update/task-manager-update.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './add-user/view-user/view-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewProjectComponent } from './add-project/view-project/view-project.component';

const routes:Route[] = [
  {
    path: 'view',
    component: TaskManagerViewComponent
  },
  {
    path: 'add',
    component: TaskManagerAddComponent
  },
  {
    path: "update",
    component: TaskManagerUpdateComponent
  },
  {
    path: "add-user",
    component: AddUserComponent
  },
  {
    path: "add-project",
    component: AddProjectComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerAddComponent,
    TaskManagerViewComponent,
    TaskManagerSearchComponent,
    TaskManagerUpdateComponent,
    AddUserComponent,
    ViewUserComponent,
    AddProjectComponent,
    ViewProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, HttpClient, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
