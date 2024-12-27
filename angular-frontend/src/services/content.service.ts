import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from '../app/models/eduModels';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContentService {



  getAllContents(): Observable<Content[]> {
    //todo: Complete missing code
  }

  getContentById(id: number): Observable<Content> {
    //todo: Complete missing code
  }

  addContent(content: Content): Observable<Content> {
    //todo: Complete missing code
  }

  updateContent(id: number, content: Content): Observable<void> {
    //todo: Complete missing code
  }

  deleteContent(id: number): Observable<void> {
    //todo: Complete missing code
  }
}
