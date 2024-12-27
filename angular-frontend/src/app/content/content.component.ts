import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { CourseService } from '../../services/course.service';
import { Content, Course } from '../models/eduModels';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  contentForm: FormGroup;
  contents: Content[] = [];
  courses: Course[] = [];
  isEditing: boolean = false;
  currentContentId: number | null = null;

  constructor(private fb: FormBuilder, private contentService: ContentService, private courseService: CourseService) {
    // Initialize the form
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      courseId: [null, Validators.required],  // Dropdown for course selection
    });
  }

  ngOnInit(): void {
    this.getContents();
    this.getCourses();
  }

  // Fetch all contents
  getContents(): void {
    this.contentService.getAllContents().subscribe((data: Content[]) => {
      this.contents = data;
    });
  }

  // Fetch all courses for the dropdown
  getCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  // Add new content
  addContent(): void {
    if (this.contentForm.valid) {
      const newContent: Content = this.contentForm.value;
      this.contentService.addContent(newContent).subscribe(() => {
        this.getContents();  // Reload the list
        this.resetForm();  // Clear the form
      });
    }
  }

  // Edit content
  editContent(content: Content): void {
    this.isEditing = true;
    this.currentContentId = content.id;
    this.contentForm.patchValue({
      title: content.title,
      description: content.description,
      courseId: content.courseId
    });
  }

  // Update content
  updateContent(): void {
    if (this.isEditing && this.contentForm.valid && this.currentContentId !== null) {
      const updatedContent: Content = {
        id: this.currentContentId,
        ...this.contentForm.value
      };
      this.contentService.updateContent(this.currentContentId, updatedContent).subscribe(() => {
        this.getContents();
        this.resetForm();
      });
    }
  }

  // Delete content
  deleteContent(id: number): void {
    this.contentService.deleteContent(id).subscribe(() => {
      this.getContents();
    });
  }

  // Reset the form
  resetForm(): void {
    this.contentForm.reset();
    this.isEditing = false;
    this.currentContentId = null;
  }
}
