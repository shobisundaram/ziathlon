import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { error } from 'console';
import { ToastrService } from '../../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginStatus: any;
  loginStatusMessage: any;
  IsDisabled = false 
  showPassword: boolean
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toasterService: ToastrService
  ){}
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
      ],
    ],
    password: ['', [Validators.required]],
  });

  login(){
    if (this.loginForm.valid) {
      this.IsDisabled = true
      this.apiService.CommonPostApi(this.loginForm.value,'api/admins/login').subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem(
            "AdminDetails",
            JSON.stringify(res.data)
          );
          localStorage.setItem("auth_app_token", res.token);
          this.router.navigate(["/pages"]);
          this.IsDisabled = false
          this.toasterService.success(res.message);
        },
        error: (error) => {
          this.IsDisabled = false
          let errorMessage = error.error?.error || error.message
          this.toasterService.danger(errorMessage);
        }
      })
    }
  }
}
