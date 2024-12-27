import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Assessment, Submission } from '../app/models/eduModels';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

 

  constructor() {}

  getAllAssessments(): Observable<Assessment[]> {
    //todo: Complete missing code
  }

  getAssessmentById(id: number): Observable<Assessment> {
    //todo: Complete missing code
  }

  addAssessment(assessment: Assessment): Observable<Assessment> {
    //todo: Complete missing code
  }

  updateAssessment(id: number, assessment: Assessment): Observable<void> {
    //todo: Complete missing code
  }

  deleteAssessment(id: number): Observable<void> {
    //todo: Complete missing code
  }

  getSubmissionsForAssessment(id: number): Observable<Submission[]> {
    //todo: Complete missing code
  }

  gradeSubmission(submissionId: number, grade: number, feedback: string): Observable<void> {
    //todo: Complete missing code
  }
}
