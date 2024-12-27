import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel:any={};
  showError:boolean=false;
  errorMessage:any;
  constructor(public router:Router, public adminService:AccountService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        username: [this.formModel.username,[ Validators.required]],
        password: [this.formModel.password,[ Validators.required]],
       
    });
  }

  ngOnInit(): void {
  }
  onLogin() {
  if (this.itemForm.valid) {
    this.showError = false;
    this.adminService.Login(this.itemForm.value).subscribe((data: any) => {
      if (data.userNo != 0) {
        debugger;
    
        // localStorage.setItem('role', data.role);
        this.authService.SetRole(data.role);
        this.authService.saveToken(data.token)
        this.authService.saveUserId(data.userId)
        this.router.navigateByUrl('/dashboard');
      
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.showError = true;
        this.errorMessage = "Wrong User or Password";
      }
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  } else {
    this.itemForm.markAllAsTouched();
  }
}

registration()
  {
    this.router.navigateByUrl('/registration');
  }
}
