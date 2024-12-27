import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Course } from '../models/eduModels';
import { CourseService } from '../../services/course.service';
import { AnalyticsService } from '../../services/analytics.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses: Course[] = [];
  courseForm: FormGroup;  // Form group for adding/updating a course
  isEditing: boolean = false;  // Track whether we are editing an existing course
  currentCourseId: number | null = null;  // Store the current course being edited
  courseProgress: any=[];
  courseEngagement: any={};

  constructor(private courseService: CourseService, private fb: FormBuilder, private analyticsService:AnalyticsService) {
    // Initialize the form
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      instructor: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalModules: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCourses();
  }

  // Get all courses
  getCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  // Add a new course
  addCourse(): void {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;
      this.courseService.addCourse(newCourse).subscribe(() => {
        this.getCourses();  // Reload the course list
        this.courseForm.reset();  // Clear the form
      });
    }
  }

  // Set the form values when editing a course
  editCourse(course: Course): void {
    this.isEditing = true;
    this.currentCourseId = course.id;
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      startDate: course.startDate,
      endDate: course.endDate,
      totalModules: course.totalModules
    });
  }

  // Update an existing course
  updateCourse(): void {
    if (this.isEditing && this.courseForm.valid && this.currentCourseId !== null) {
      const updatedCourse: Course = {
        id: this.currentCourseId,
        ...this.courseForm.value
      };
      this.courseService.updateCourse(this.currentCourseId, updatedCourse).subscribe(() => {
        this.getCourses();  // Reload the course list
        this.resetForm();  // Clear the form and reset editing mode
      });
    }
  }

  // Delete a course
  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.getCourses();  // Reload the course list after deletion
    });
  }

  // Reset the form and exit editing mode
  resetForm(): void {
    this.courseForm.reset();
    this.isEditing = false;
    this.currentCourseId = null;
  }
  viewCourseAnalytics(courseId:any)
  {
    this.analyticsService.getCourseProgress(courseId).subscribe(
      (data) => {
        this.courseProgress = data;
      },
      (error) => {
        console.error('Error fetching course progress', error);
      }
    );
  }
  loadCourseEngagement(courseId:any) {
    this.courseEngagement={}
    this.analyticsService.getCourseEngagement(courseId).subscribe(
      (data) => {
        this.courseEngagement = data;
      },
      (error) => {
        console.error('Error fetching course engagement', error);
      }
    );
  }
}
