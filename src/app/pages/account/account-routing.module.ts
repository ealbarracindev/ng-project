import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserContainerComponent } from './user-container/user-container.component';

const routes: Routes = [
  { path:'', component: UserContainerComponent },
  //{ path:'profile', component: UserContainerComponent, data: { breadcrumb:'profile'} }
  //{ path:':id', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
