import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubmissionService } from '../services/submission.service';
import { Submission, Assessment } from '../app/models/eduModels';

describe('SubmissionService', () => {
  let service: SubmissionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubmissionService],
    });
    service = TestBed.inject(SubmissionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a submission', () => {
    const newSubmission: any = {
      id: 1,
      studentId: 'student1',
      assessmentId: 1,
      content: 'This is my submission.',
      submittedAt: new Date(),
      grade: 0,
      feedback: "",
    };

    service.addSubmission(newSubmission).subscribe((submission) => {
      expect(submission).toEqual(newSubmission);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(newSubmission);
  });

  it('should fetch submissions for a specific assessment', () => {
    const mockSubmissions: any[] = [
      {
        id: 1,
        studentId: 'student1',
        assessmentId: 1,
        content: 'Submission content 1',
        submittedAt: new Date(),
        grade: 0,
        feedback: "",
      },
      {
        id: 2,
        studentId: 'student2',
        assessmentId: 1,
        content: 'Submission content 2',
        submittedAt: new Date(),
        grade: null,
        feedback: null,
      },
    ];

    service.getSubmissionsForAssessment(1).subscribe((submissions) => {
      expect(submissions.length).toBe(2);
      expect(submissions).toEqual(mockSubmissions);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/assessment/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubmissions);
  });

  it('should fetch all assessments', () => {
    const mockAssessments: Assessment[] = [
      {
        id: 1,
        title: 'Assessment 1',
        description: 'Description of Assessment 1',
        type: 'Quiz',
        createdAt: new Date(),
        dueDate: new Date(),
        courseId: 101,
        course: { id: 101, title: 'Course 1' },
        submissions: [],
      },
      {
        id: 2,
        title: 'Assessment 2',
        description: 'Description of Assessment 2',
        type: 'Assignment',
        createdAt: new Date(),
        dueDate: new Date(),
        courseId: 102,
        course: { id: 102, title: 'Course 2' },
        submissions: [],
      },
    ];

    service.getAllAssessments().subscribe((assessments) => {
      expect(assessments.length).toBe(2);
      expect(assessments).toEqual(mockAssessments);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAssessments);
  });
});
