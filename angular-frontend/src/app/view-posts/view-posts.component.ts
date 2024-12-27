import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ForumService } from '../../services/forum.service';
import { ForumPost, Feedback, Course } from '../models/eduModels';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {
  feedbackForm: FormGroup;
  remarksMd:any;
  posts: ForumPost[] = [];
  feedbacks: Feedback[] = [];
  courses: Course[] = []; // List of courses
 // Reactive form for posting replies
 feedbackForms: { [key: number]: FormGroup } = {}; // Store feedback forms for each post
  courseId: number = 0; // Set this to the current course ID
; // Set to the current course ID

  constructor(private fb: FormBuilder, private forumService: ForumService,private authService:AuthService) {
    this.feedbackForm = this.fb.group({
      comments: ['', Validators.required],
      rating: [null, Validators.required],
    });
  }

  ngOnInit(): void {
   
    this.loadCourses(); // Fetch the courses for the dropdown
  }

  loadPosts(course:any): void {
    this.courseId=course.id;
    this.loadFeedbacks();
    this.forumService.getAllPosts(course.id).subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error loading posts', error);
      }
    );
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
  createFeedbackForms(): void {
    this.posts.forEach((post) => {
      this.feedbackForms[post.id] = this.fb.group({
        comments: ['', Validators.required],
        rating: [null, Validators.required],
      });
    });


}
submitFeedback(): void {
  if (this.feedbackForm.valid) {
    const userId = this.authService.getUserId;
    const feedback: any = {
      studentId: userId ? userId : "",
      courseId: this.courseId,
      comments: this.feedbackForm.value.comments,
      submittedAt: new Date(),
      rating: this.feedbackForm.value.rating,
    };

    this.forumService.addFeedback(feedback).subscribe(
      () => {
        alert('Feedback submitted successfully');
        this.loadFeedbacks();
        this.feedbackForm.reset(); // Reset the form after submission
      },
      (error) => {
        console.error('Error submitting feedback', error);
      }
    );
  }
}
submitReply(form:any): void {
  debugger;

    const userId = this.authService.getUserId;
    const replay: any = {
      authorId: userId ? userId : "",
      forumPostId: form.id,
      content: this.remarksMd,
      repliedAt: new Date()
    };

    this.forumService.formReply(replay).subscribe(
      () => {
        alert('submitted successfully');
        this.loadFeedbacks(); // Reset the form after submission
      },
      (error) => {
        console.error('Error submitting feedback', error);
      }
    );
  
}
}
  
