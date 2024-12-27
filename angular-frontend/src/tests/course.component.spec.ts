import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from '../app/course/course.component';
import { CourseService } from '../services/course.service';
import { AnalyticsService } from '../services/analytics.service';
import { of } from 'rxjs';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let courseServiceMock: jasmine.SpyObj<CourseService>;
  let analyticsServiceMock: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    // Create mock services
    courseServiceMock = jasmine.createSpyObj('CourseService', ['getCourses', 'addCourse', 'updateCourse', 'deleteCourse']);
    analyticsServiceMock = jasmine.createSpyObj('AnalyticsService', ['getCourseProgress', 'getCourseEngagement']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Make sure to import this
      declarations: [CourseComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;

    // Mock the getCourses method to return an empty array
    courseServiceMock.getCourses.and.returnValue(of([]));

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the form with default values', () => {
    expect(component.courseForm).toBeDefined();
    expect(component.courseForm.controls['title'].value).toBe('');
    expect(component.courseForm.controls['description'].value).toBe('');
    expect(component.courseForm.controls['instructor'].value).toBe('');
    expect(component.courseForm.controls['startDate'].value).toBe('');
    expect(component.courseForm.controls['endDate'].value).toBe('');
    expect(component.courseForm.controls['totalModules'].value).toBe(0);
  });

  it('should require title, description, instructor, start date, end date, and total modules', () => {
    const titleControl = component.courseForm.controls['title'];
    const descriptionControl = component.courseForm.controls['description'];
    const instructorControl = component.courseForm.controls['instructor'];
    const startDateControl = component.courseForm.controls['startDate'];
    const endDateControl = component.courseForm.controls['endDate'];
    const totalModulesControl = component.courseForm.controls['totalModules'];

    // Initially, all controls should be invalid
    expect(titleControl.valid).toBeFalse();
    expect(descriptionControl.valid).toBeFalse();
    expect(instructorControl.valid).toBeFalse();
    expect(startDateControl.valid).toBeFalse();
    expect(endDateControl.valid).toBeFalse();


    // Set values to valid ones
    titleControl.setValue('Test Course');
    descriptionControl.setValue('Course Description');
    instructorControl.setValue('Instructor Name');
    startDateControl.setValue(new Date());
    endDateControl.setValue(new Date());
    totalModulesControl.setValue(5);

    // Now all controls should be valid
    expect(titleControl.valid).toBeTrue();
    expect(descriptionControl.valid).toBeTrue();
    expect(instructorControl.valid).toBeTrue();
    expect(startDateControl.valid).toBeTrue();
    expect(endDateControl.valid).toBeTrue();
    expect(totalModulesControl.valid).toBeTrue();
  });
});
