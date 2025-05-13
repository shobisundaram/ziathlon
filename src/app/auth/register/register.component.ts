import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ToastrService } from '../../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  IsDisabled = false
  constructor(   
    private router: Router,
    private location : Location,
    private apiservice: ApiService,
    private toasterService: ToastrService,
    public fb: FormBuilder){
  }
  showPassword: boolean;
  registerForm = this.fb.group({
    name: ['',[
      Validators.required,
      Validators.pattern("[a-zA-Z ]*"),
    ]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
      ],
    ],
    password: ['', [ Validators.required,
    Validators.pattern(environment.PasswordPattern),]],

    confirmPassword: ["", [Validators.required]],
  });
  get name() {
    return this.registerForm.get("name");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  onKeyDownHandler(event: any){}
  onKeyPressHandler(event: any){}
  goBackBtn(){
    this.location.back();
  }

  register(){
    if (this.registerForm.valid) {
      this.IsDisabled = true
      this.apiservice.CommonPostApi(this.registerForm.value, "api/admins/create").subscribe({
        next: (res) => {
          console.log(res,"=======")
          const data = res.data;
          this.toasterService.success(res.message);
          this.IsDisabled = false
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.log(error)
          this.IsDisabled = false
          let errorMessage = error.error?.error || error.message
          this.toasterService.danger(errorMessage);
        },
      });
    }
  }
}
