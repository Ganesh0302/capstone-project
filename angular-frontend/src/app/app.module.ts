import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

import { AuthInterceptor } from '../services/interceptors/auth.service';
import { CourseComponent } from './course/course.component';
import { ContentComponent } from './content/content.component';
import { SubmissionComponent } from './submission/submission.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { FourmComponent } from './fourm/fourm.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
      RegistrationComponent,
      DashbaordComponent, CourseComponent, ContentComponent, SubmissionComponent, AssessmentComponent, FourmComponent, ViewPostsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [HttpClientModule, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true // This ensures multiple interceptors can be chained
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
