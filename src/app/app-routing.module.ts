import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),        
    title: 'App - Login'
  },
  {
    path: ``,
    canActivate: [AuthGuard],
    component: LayoutComponent,    
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      //   loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),        
      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),        
        title: 'App - Dashboard Lazy loading'
      },
      {
        path: 'form',
        loadChildren: () => import('./pages/form/form.module').then((m) => m.FormModule),    
        title: 'App - Form'
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule), 
        title: 'App - About'
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then((m) => m.AccountModule), 
        title: 'App - Account'
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
