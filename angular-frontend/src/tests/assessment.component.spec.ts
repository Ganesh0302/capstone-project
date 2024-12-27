import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentComponent } from '../app/assessment/assessment.component';
import { AssessmentService } from '../services/assessment.service';
import { CourseService } from '../services/course.service';
import { of } from 'rxjs';

describe('AssessmentComponent', () => {
  let component: AssessmentComponent;
  let fixture: ComponentFixture<AssessmentComponent>;
  let assessmentServiceMock: jasmine.SpyObj<AssessmentService>;
  let courseServiceMock: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    // Create mock services
    assessmentServiceMock = jasmine.createSpyObj('AssessmentService', ['getAllAssessments', 'addAssessment', 'updateAssessment', 'deleteAssessment', 'getSubmissionsForAssessment', 'gradeSubmission']);
    courseServiceMock = jasmine.createSpyObj('CourseService', ['getCourses']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AssessmentComponent],
      providers: [
        { provide: AssessmentService, useValue: assessmentServiceMock },
        { provide: CourseService, useValue: courseServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentComponent);
    component = fixture.componentInstance;

    // Mock the return value of getAllAssessments and getCourses
    assessmentServiceMock.getAllAssessments.and.returnValue(of([])); // Return an observable of an empty array
    courseServiceMock.getCourses.and.returnValue(of([])); // Mock the getCourses to return an empty array

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the form with default values', () => {
    expect(component.assessmentForm).toBeDefined();
    expect(component.assessmentForm.controls['title'].value).toBe('');
    expect(component.assessmentForm.controls['description'].value).toBe('');
    expect(component.assessmentForm.controls['type'].value).toBe('');
    expect(component.assessmentForm.controls['courseId'].value).toBe(null);
    expect(component.assessmentForm.controls['dueDate'].value).toBe('');
  });

  it('should retrieve assessments on initialization', () => {
    // Given: an assessment service returning mock data
    const mockAssessments = [
      { id: 1, title: 'Assessment 1', description: 'Description 1', type: 'Quiz', createdAt: new Date(), dueDate: new Date(), courseId: 1 },
      { id: 2, title: 'Assessment 2', description: 'Description 2', type: 'Assignment', createdAt: new Date(), dueDate: new Date(), courseId: 1 }
    ];
    assessmentServiceMock.getAllAssessments.and.returnValue(of(mockAssessments));

    // When: the component is initialized
    component.ngOnInit();

    // Then: the assessments should be set correctly
    expect(component.assessments.length).toBe(2);
    expect(component.assessments).toEqual(mockAssessments);
  });

  // ... [Rest of the tests]
});
