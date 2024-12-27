import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment.development';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  const mockLoginData = { userName: 'testUser', password: 'testPassword' };
  const mockRegisterData = { userName: 'newUser', password: 'newPassword', email: 'user@example.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService, AuthService]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test case for Login
  it('should make a POST request to login', () => {
    const mockResponse = {
      userId: 1,
      userName: 'testUser',
      token: 'fake-jwt-token',
      role: 'Guest'
    };

    service.Login(mockLoginData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Test the POST request to the correct URL
    const req = httpMock.expectOne(`${environment.apiUrl}/api/Account/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    // Respond with mock data
    req.flush(mockResponse);
  });

  // Test case for registerUser
  it('should make a POST request to registerUser', () => {
    const mockResponse = { success: true };

    service.registerUser(mockRegisterData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Test the POST request to the correct URL
    const req = httpMock.expectOne(`${environment.apiUrl}/api/Account/RegisterUser`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    // Respond with mock data
    req.flush(mockResponse);
  });
});
