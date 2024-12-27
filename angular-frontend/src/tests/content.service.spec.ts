import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContentService } from '../services/content.service';
import { Content } from '../app/models/eduModels';

describe('ContentService', () => {
  let service: ContentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentService]
    });

    service = TestBed.inject(ContentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all contents', () => {
    const mockContents: Content[] = [
      { id: 1, title: 'Content 1', description: 'Description 1', courseId: 1 },
      { id: 2, title: 'Content 2', description: 'Description 2', courseId: 2 }
    ];

    service.getAllContents().subscribe(contents => {
      expect(contents.length).toBe(2);
      expect(contents).toEqual(mockContents);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockContents);
  });

  it('should retrieve a specific content by id', () => {
    const mockContent: Content = { id: 1, title: 'Content 1', description: 'Description 1', courseId: 1 };

    service.getContentById(1).subscribe(content => {
      expect(content).toEqual(mockContent);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockContent);
  });

  it('should add a new content', () => {
    const newContent: Content = { id: 3, title: 'Content 3', description: 'Description 3', courseId: 3 };

    service.addContent(newContent).subscribe(content => {
      expect(content).toEqual(newContent);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newContent);
  });

  it('should update an existing content', () => {
    const updatedContent: Content = { id: 1, title: 'Updated Content 1', description: 'Updated Description', courseId: 1 };

    service.updateContent(1, updatedContent).subscribe();

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('PUT');
    req.flush(null); // Respond with nothing on success
  });

  it('should delete a content', () => {
    service.deleteContent(1).subscribe();

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null); // Respond with nothing on success
  });
});
