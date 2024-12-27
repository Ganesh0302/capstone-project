import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ForumPost, Feedback, Course } from '../models/eduModels';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fourm',
  templateUrl: './fourm.component.html',
  styleUrls: ['./fourm.component.scss']
})
export class FourmComponent implements OnInit {
  posts: ForumPost[] = [];
  feedbacks: Feedback[] = [];
  courses: Course[] = []; // List of courses
  newPostForm: FormGroup; // Reactive form for posting replies
  courseId: number = 1; // Set to the current course ID

  constructor(private fb: FormBuilder, private forumService: ForumService,private authService:AuthService) {
    // Initialize the reactive form
    this.newPostForm = this.fb.group({
      courseId: [null, Validators.required],   // Course selection
      title: ['', Validators.required],        // Post title
      content: ['', Validators.required], 
      authorId:['']     // Post content
    });
  }

  ngOnInit(): void {
    this.loadPosts();
    this.loadFeedbacks();
    this.loadCourses(); // Fetch the courses for the dropdown
  }

  loadPosts(): void {
    this.forumService.getAllPosts(this.courseId).subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error loading posts', error);
      }
    );
  }
  onCourseChange(): void {
    this.courseId = this.newPostForm.value.courseId; // Get the selected course ID
    this.loadPosts(); // Load posts for the selected course
  }
  loadFeedbacks(): void {
    this.forumService.getAllFeedbacks(this.courseId).subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error loading feedbacks', error);
      }
    );
  }

  loadCourses(): void {
    // Assuming there's a service method to fetch courses
    this.forumService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error loading courses', error);
      }
    );
  }

  submitNewPost(): void {
    debugger;
    if (this.newPostForm.valid) {
      const userId = this.authService.getUserId; 
      const newPost: ForumPost = {
        id: 0, // For new post
        title: this.newPostForm.value.title,
        content: this.newPostForm.value.content,
        courseId: this.newPostForm.value.courseId,
        replies: [],
        postedAt: new Date(),
        authorId: userId ? userId : "" 
      };

      this.forumService.addPost(newPost).subscribe(
        () => {
          this.loadPosts(); // Reload posts after adding a new one
          this.newPostForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error adding post', error);
        }
      );
    }
  }
}
  