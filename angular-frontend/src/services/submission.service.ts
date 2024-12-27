import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment, Submission } from '../app/models/eduModels';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  //doto complete missing code.. Adjust based on your API structure

 //doto complete missing code..

  addSubmission(submission: Submission): Observable<Submission> {
    //doto complete missing code..
  }
  
  getSubmissionsForAssessment(assessmentId: number): Observable<Submission[]> {
    //doto complete missing code..
  }
  getAllAssessments(): Observable<Assessment[]> {
     //doto complete missing code..
  }
}
