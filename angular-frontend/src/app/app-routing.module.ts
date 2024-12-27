import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

import { CourseComponent } from './course/course.component';
import { ContentComponent } from './content/content.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { SubmissionComponent } from './submission/submission.component';
import { FourmComponent } from './fourm/fourm.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashbaordComponent }, 
  { path: 'course', component: CourseComponent }, 
  { path: 'content', component: ContentComponent }, 
  { path: 'assessment', component: AssessmentComponent }, 
  { path: 'submission', component: SubmissionComponent }, 
  { path: 'forum', component: FourmComponent }, 
  { path: 'view-posts', component: ViewPostsComponent },
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
