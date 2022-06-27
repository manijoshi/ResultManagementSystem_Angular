import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HeroesComponent } from './heroes/heroes.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: 'heroes', component: HeroesComponent }
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: StudentDashboardComponent
  },
  {
    path: 'teacher',
    component: TeacherDashboardComponent
  },
  {
    path: 'student',
    component: StudentDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }