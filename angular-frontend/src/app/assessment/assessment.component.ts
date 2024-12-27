import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessmentService } from '../../services/assessment.service';
import { CourseService } from '../../services/course.service';
import { Assessment, Course, Submission } from '../models/eduModels';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  assessments: Assessment[] = [];
  courses: Course[] = [];
  submissions:any= [];
  isEditing: boolean = false;
  currentAssessmentId: number | null = null;

  constructor(private fb: FormBuilder, private assessmentService: AssessmentService, private courseService: CourseService) {
    this.assessmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      courseId: [null, Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAssessments();
    this.getCourses();
  }

  getAssessments(): void {
    this.assessmentService.getAllAssessments().subscribe((data: Assessment[]) => {
      this.assessments = data;
      console.log(data)
    });
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  addAssessment(): void {
    if (this.assessmentForm.valid) {
      const newAssessment: Assessment = this.assessmentForm.value;
      this.assessmentService.addAssessment(newAssessment).subscribe(() => {
        this.getAssessments();
        this.resetForm();
      });
    }
  }

  editAssessment(assessment: Assessment): void {
    this.isEditing = true;
    this.currentAssessmentId = assessment.id;
    this.assessmentForm.patchValue({
      title: assessment.title,
      description: assessment.description,
      type: assessment.type,
      courseId: assessment.courseId,
      dueDate: assessment.dueDate
    });
  }

  updateAssessment(): void {
    if (this.isEditing && this.assessmentForm.valid && this.currentAssessmentId !== null) {
      const updatedAssessment: Assessment = {
        id: this.currentAssessmentId,
        ...this.assessmentForm.value
      };
      this.assessmentService.updateAssessment(this.currentAssessmentId, updatedAssessment).subscribe(() => {
        this.getAssessments();
        this.resetForm();
      });
    }
  }

  deleteAssessment(id: number): void {
    this.assessmentService.deleteAssessment(id).subscribe(() => {
      this.getAssessments();
    });
  }

  viewSubmissions(assessmentId: number): void {
    this.currentAssessmentId=assessmentId;
    this.assessmentService.getSubmissionsForAssessment(assessmentId).subscribe((data: Submission[]) => {
      this.submissions = data;
    });
  }

  gradeSubmission(submissionId: number, grade: number, feedback: string): void {
    debugger;
    this.assessmentService.gradeSubmission(submissionId, grade, feedback).subscribe(() => {
      this.viewSubmissions(this.currentAssessmentId!);  // Refresh the submissions list
    });
  }

  resetForm(): void {
    this.assessmentForm.reset();
    this.isEditing = false;
    this.currentAssessmentId = null;
  }
}
