import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ForumService } from '../services/forum.service';
import { ForumPost, ForumReply, Feedback, Course } from '../app/models/eduModels';

describe('ForumService', () => {
  let service: ForumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForumService],
    });
    service = TestBed.inject(ForumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all posts for a specific course', () => {
    const mockPosts: ForumPost[] = [
      {
        id: 1,
        authorId: 'author1',
        title: 'First Post',
        content: 'Content of the first post',
        postedAt: new Date(),
        courseId: 101,
        replies: [],
      },
    ];

    service.getAllPosts(101).subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/posts/101`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch a post by ID', () => {
    const mockPost: ForumPost = {
      id: 1,
      authorId: 'author1',
      title: 'First Post',
      content: 'Content of the first post',
      postedAt: new Date(),
      courseId: 101,
      replies: [],
    };

    service.getPostById(1).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/post/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should add a new post', () => {
    const newPost: ForumPost = {
      id: 2,
      authorId: 'author2',
      title: 'Second Post',
      content: 'Content of the second post',
      postedAt: new Date(),
      courseId: 101,
      replies: [],
    };

    service.addPost(newPost).subscribe((response) => {
      expect(response).toEqual(newPost);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/post`);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should fetch all feedbacks for a specific course', () => {
    const mockFeedbacks: Feedback[] = [
      {
        id: 1,
        studentId: 'student1',
        courseId: 101,
        comments: 'Great course!',
        submittedAt: new Date(),
        rating: 5,
      },
    ];

    service.getAllFeedbacks(101).subscribe((feedbacks) => {
      expect(feedbacks.length).toBe(1);
      expect(feedbacks).toEqual(mockFeedbacks);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/feedbacks/101`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFeedbacks);
  });

  it('should add feedback', () => {
    const newFeedback: Feedback = {
      id: 2,
      studentId: 'student2',
      courseId: 101,
      comments: 'Very informative!',
      submittedAt: new Date(),
      rating: 4,
    };

    service.addFeedback(newFeedback).subscribe((response) => {
      expect(response).toEqual(newFeedback);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/feedback`);
    expect(req.request.method).toBe('POST');
    req.flush(newFeedback);
  });

  it('should fetch all courses', () => {
    const mockCourses: Course[] = [
      {
        id: 101,
        title: 'Course 1',
        description: 'Description 1',
        instructor: 'Instructor 1',
        startDate: new Date(),
        endDate: new Date(),
        totalModules: 5,
      },
    ];

    service.getAllCourses().subscribe((courses) => {
      expect(courses.length).toBe(1);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/GetAllCourses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
