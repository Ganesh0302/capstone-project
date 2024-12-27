import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumPost, ForumReply, Feedback, Course } from '../app/models/eduModels';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class ForumService {

  // Forum Post Methods
  getAllPosts(courseId: number): Observable<ForumPost[]> {
    
  }
  getAllCourses(): Observable<Course[]> {
  //doto complete missing code..
  }
  

  getPostById(id: number): Observable<ForumPost> {
  
  }

  addPost(post: ForumPost): Observable<any> {
   //doto complete missing code..
  }

  addReply(reply: ForumReply): Observable<any> {
   //doto complete missing code..
  }

  // Feedback Methods
  getAllFeedbacks(courseId: number): Observable<Feedback[]> {
//doto complete missing code..
  }

  addFeedback(feedback: Feedback): Observable<any> {
   //doto complete missing code..
  }
  formReply(feedback: Feedback): Observable<any> {
    //doto complete missing code..
  }
}
