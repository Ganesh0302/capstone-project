// submission.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { SubmissionService } from '../../services/submission.service';
import { Assessment, Submission } from '../models/eduModels';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
})
export class SubmissionComponent implements OnInit {
  submissionForm: FormGroup;
  submissions: Submission[] = [];
  assessmentId: number=0;
  assessments: Assessment[] = [];
  successAlertVisible: boolean=false;
  constructor(
    private fb: FormBuilder,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
    this.submissionForm = this.fb.group({
      content: ['', Validators.required],
      grade: [null],
      feedback: [''],
      assessmentId:[0,Validators.required]
    });
  }

  ngOnInit(): void {
  
    this.getAssesments();
  }

  getAssesments(): void {
    this.submissionService.getAllAssessments().subscribe(
      (data) => {
        this.assessments = data;
      },
      (error) => {
        console.error('Error loading submissions', error);
      }
    );
  }
  submitAssessment(value:any)
  {
    debugger;
    this.submissionForm.patchValue({
      assessmentId:value.id
    })
    this.assessmentId=value.id;
  }
  submit(): void {
    debugger;
    const userId= this.authService.getUserId;
    const submission: Submission = {
      content: this.submissionForm.value.content,
      assessmentId: this.submissionForm.value.assessmentId,
      submittedAt: new Date(),
      studentName:'',
      submissionDate:new Date(),
      id:0,
      studentId:userId ?userId : "0"
    };

    this.submissionService.addSubmission(submission).subscribe(
      () => {
        this.getAssesments(); // Reload submissions after adding
        this.submissionForm.reset();
        this.successAlertVisible = true
      },
      (error) => {
        console.error('Error submitting', error);
      }
    );
  }
}
