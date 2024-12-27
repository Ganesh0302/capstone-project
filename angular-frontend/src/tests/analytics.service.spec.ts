import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnalyticsService } from '../services/analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [AnalyticsService], // Provide the AnalyticsService
    });
    service = TestBed.inject(AnalyticsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCourseProgress', () => {
    it('should return expected course progress', () => {
      const mockCourseId = 1;
      const mockProgress = [
        { Id: 1, StudentId: 'student1', CourseId: mockCourseId, CompletedModules: 3, TotalModules: 5, LastActiveDate: new Date() },
        { Id: 2, StudentId: 'student2', CourseId: mockCourseId, CompletedModules: 5, TotalModules: 5, LastActiveDate: new Date() }
      ];

      service.getCourseProgress(mockCourseId).subscribe(progress => {
        expect(progress.length).toBe(2);
        expect(progress).toEqual(mockProgress);
      });

      // Set up HTTP request expectation
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress/${mockCourseId}`);
      expect(req.request.method).toEqual('GET'); // Ensure it’s a GET request
      req.flush(mockProgress); // Respond with mock data
    });

    it('should handle error response', () => {
      const mockCourseId = 1;

      service.getCourseProgress(mockCourseId).subscribe({
        next: () => fail('expected an error, not courses'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      // Set up HTTP request expectation
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress/${mockCourseId}`);
      expect(req.request.method).toEqual('GET'); // Ensure it’s a GET request
      req.error(new ErrorEvent('Network error')); // Respond with an error
    });
  });

  describe('getCourseEngagement', () => {
    it('should return expected engagement metrics', () => {
      const mockCourseId = 1;
      const mockEngagementMetrics = {
        CourseId: mockCourseId,
        ActiveStudents: 10,
        TotalPosts: 5,
        TotalReplies: 20,
        LastUpdated: new Date(),
      };

      service.getCourseEngagement(mockCourseId).subscribe(metrics => {
        expect(metrics).toEqual(mockEngagementMetrics);
      });

      // Set up HTTP request expectation
      const req = httpTestingController.expectOne(`${service.apiUrl}/engagement/${mockCourseId}`);
      expect(req.request.method).toEqual('GET'); // Ensure it’s a GET request
      req.flush(mockEngagementMetrics); // Respond with mock data
    });

    it('should handle error response', () => {
      const mockCourseId = 1;

      service.getCourseEngagement(mockCourseId).subscribe({
        next: () => fail('expected an error, not metrics'),
        error: error => {
          expect(error).toBeTruthy();
        }
      });

      // Set up HTTP request expectation
      const req = httpTestingController.expectOne(`${service.apiUrl}/engagement/${mockCourseId}`);
      expect(req.request.method).toEqual('GET'); // Ensure it’s a GET request
      req.error(new ErrorEvent('Network error')); // Respond with an error
    });
  });
});
