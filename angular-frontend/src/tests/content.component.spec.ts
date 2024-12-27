import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from '../app/content/content.component';
import { ContentService } from '../services/content.service';
import { CourseService } from '../services/course.service';
import { of } from 'rxjs';

// Mock for the ContentService
class MockContentService {
  getAllContents() {
    return of([]); // Return an empty array initially for the test
  }
  addContent(content: any) {
    return of(null); // Mock addContent
  }
  updateContent(id: number, content: any) {
    return of(null); // Mock updateContent
  }
  deleteContent(id: number) {
    return of(null); // Mock deleteContent
  }
}

// Mock for the CourseService
class MockCourseService {
  getCourses() {
    return of([{ 
      id: 1, 
      title: 'Course 1', 
      description: 'Description 1', 
      instructor: 'Instructor 1', 
      startDate: new Date(), 
      endDate: new Date(), 
      totalModules: 5 
    }]); // Provide mock course data
  }
}

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ContentService, useClass: MockContentService },
        { provide: CourseService, useClass: MockCourseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require course selection', () => {
    expect(component.contentForm.valid).toBeFalsy(); // Form should be invalid initially

    // Set form values
    component.contentForm.patchValue({
      title: 'Valid Title',
      description: 'Valid Description',
      courseId: null // No course selected
    });

    expect(component.contentForm.valid).toBeFalsy(); // Still invalid

    component.contentForm.patchValue({
      courseId: 1 // Valid course selected
    });

    expect(component.contentForm.valid).toBeTruthy(); // Now valid
  });
});
