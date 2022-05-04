import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { TrascrittoreComponent } from './trascrittore/trascrittore.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  }, 
  {
    path:'trascrittore',
    component:TrascrittoreComponent
  },
  {
    path:'adduser',
    component:AdduserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
