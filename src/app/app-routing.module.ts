import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { AuthGuardService } from './core/guards/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'HomeComponent',
    pathMatch: 'full',
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   },
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule),
      
      },
     
    

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
