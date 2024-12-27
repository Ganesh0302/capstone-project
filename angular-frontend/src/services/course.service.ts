import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content, Course } from '../app/models/eduModels';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  // Get all courses
  getCourses(): Observable<Course[]> {
  //todo: Complete missing code
  }

  // Get a course by ID
  getCourseById(id: number): Observable<Course> {
  //todo: Complete missing code
  }

  // Add a new course
  addCourse(course: Course): Observable<Course> {
    //todo: Complete missing code
  }

  // Update a course
  updateCourse(id: number, course: Course): Observable<void> {
    //todo: Complete missing code
  }

  // Delete a course
  deleteCourse(id: number): Observable<void> {
    //todo: Complete missing code
  }
  getCourseProgress(courseId: number): Observable<any[]> {
    //todo: Complete missing code
  }
  
}
