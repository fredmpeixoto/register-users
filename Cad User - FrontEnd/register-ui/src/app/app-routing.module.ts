import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'default', component: AppComponent },
  { path: 'user', component: UserFormComponent},
  { path: 'user/:id', component: UserFormComponent},
  { path: 'users', component: UserListComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
