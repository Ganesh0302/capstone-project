import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AssessmentService } from '../services/assessment.service';
import { Assessment, Submission } from '../app/models/eduModels';


describe('AssessmentService', () => {
  let service: AssessmentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssessmentService]
    });
    service = TestBed.inject(AssessmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllAssessments', () => {
    it('should return expected assessments', () => {
      const mockAssessments: Assessment[] = [
        { id: 1, title: 'Assessment 1', description: 'Description 1', type: 'Quiz', createdAt: new Date(), dueDate: new Date(), courseId: 1 },
        { id: 2, title: 'Assessment 2', description: 'Description 2', type: 'Exam', createdAt: new Date(), dueDate: new Date(), courseId: 2 }
      ];

      service.getAllAssessments().subscribe(assessments => {
        expect(assessments.length).toBe(2);
        expect(assessments).toEqual(mockAssessments);
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockAssessments);
    });

    it('should handle error response', () => {
      service.getAllAssessments().subscribe({
        next: () => fail('expected an error, not assessments'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}`);
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getAssessmentById', () => {
    it('should return expected assessment', () => {
      const mockAssessment: Assessment = { id: 1, title: 'Assessment 1', description: 'Description 1', type: 'Quiz', createdAt: new Date(), dueDate: new Date(), courseId: 1 };

      service.getAssessmentById(1).subscribe(assessment => {
        expect(assessment).toEqual(mockAssessment);
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockAssessment);
    });

    it('should handle error response', () => {
      service.getAssessmentById(1).subscribe({
        next: () => fail('expected an error, not assessment'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('addAssessment', () => {
    it('should add a new assessment', () => {
      const mockAssessment: Assessment = { id: 1, title: 'Assessment 1', description: 'Description 1', type: 'Quiz', createdAt: new Date(), dueDate: new Date(), courseId: 1 };

      service.addAssessment(mockAssessment).subscribe(assessment => {
        expect(assessment).toEqual(mockAssessment);
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockAssessment);
    });

    it('should handle error response', () => {
      const mockAssessment: Assessment = { id: 1, title: 'Assessment 1', description: 'Description 1', type: 'Quiz', createdAt: new Date(), dueDate: new Date(), courseId: 1 };

      service.addAssessment(mockAssessment).subscribe({
        next: () => fail('expected an error, not assessment'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}`);
      expect(req.request.method).toEqual('POST');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('updateAssessment', () => {
    it('should update an existing assessment', () => {
      const mockAssessment: Assessment = { id: 1, title: 'Assessment 1', description: 'Updated Description', type: 'Quiz', createdAt: new Date(), dueDate: new Date(), courseId: 1 };

      service.updateAssessment(1, mockAssessment).subscribe(() => {
        // Expect no response body for void
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush({});
    });

    it('should handle error response', () => {
      const mockAssessment: Assessment = { id: 1, title: 'Assessment 1', description: 'Updated Description', type: 'Quiz', createdAt: new Date(), dueDate: new Date(), courseId: 1 };

      service.updateAssessment(1, mockAssessment).subscribe({
        next: () => fail('expected an error, not assessment'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
      expect(req.request.method).toEqual('PUT');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('deleteAssessment', () => {
    it('should delete the specified assessment', () => {
      service.deleteAssessment(1).subscribe(() => {
        // Expect no response body for void
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });

    it('should handle error response', () => {
      service.deleteAssessment(1).subscribe({
        next: () => fail('expected an error, not deletion'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
      expect(req.request.method).toEqual('DELETE');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getSubmissionsForAssessment', () => {
    it('should return expected submissions for an assessment', () => {
      const mockSubmissions: any = [
        { SubmissionId: 1, StudentId: 'student1', AssessmentId: 1, Content: 'Submission 1', SubmittedAt: new Date(), Grade: null, Feedback: null },
        { SubmissionId: 2, StudentId: 'student2', AssessmentId: 1, Content: 'Submission 2', SubmittedAt: new Date(), Grade: null, Feedback: null }
      ];
      

      service.getSubmissionsForAssessment(1).subscribe(submissions => {
        expect(submissions.length).toBe(2);
        expect(submissions).toEqual(mockSubmissions);
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1/submissions`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockSubmissions);
    });

    it('should handle error response', () => {
      service.getSubmissionsForAssessment(1).subscribe({
        next: () => fail('expected an error, not submissions'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/1/submissions`);
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('gradeSubmission', () => {
    it('should grade a submission', () => {
      const submissionId = 1;
      const grade = 90;
      const feedback = 'Good job';

      service.gradeSubmission(submissionId, grade, feedback).subscribe(() => {
        // Expect no response body for void
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/GradeSubmission/${submissionId},${grade},${feedback}`);
      expect(req.request.method).toEqual('POST');
      req.flush({});
    });

    it('should handle error response', () => {
      const submissionId = 1;
      const grade = 90;
      const feedback = 'Good job';

      service.gradeSubmission(submissionId, grade, feedback).subscribe({
        next: () => fail('expected an error, not grading'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/GradeSubmission/${submissionId},${grade},${feedback}`);
      expect(req.request.method).toEqual('POST');
      req.error(new ErrorEvent('Network error'));
    });
  });
});
