import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { ToastrService } from '../../services/toastr.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  showPassword: boolean;
  token: any;
  IsDisabled = false
  constructor(   
    private route: ActivatedRoute,
    private router: Router,
    private location : Location,
    private apiservice: ApiService,
    private toasterService: ToastrService,){}
  ngOnInit(){
    this.initializeforgotpasswordForm()
    this.token = this.route.snapshot.paramMap.get('token');
  }

    initializeforgotpasswordForm() {
      this.forgotPasswordForm = new FormGroup(
        {
          email: new FormControl("", [
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
          ]),
        },
      );
    }
    NewMatchPassword: ValidatorFn = (
        AC: AbstractControl
      ): ValidationErrors | null => {
        let newpassword = AC.get("newPassword").value;
        let newverifyPassword = AC.get("confirmNewPassword").value;
        if (newpassword != newverifyPassword) {
          AC.get("confirmNewPassword")!.setErrors({ NewMatchPassword: true });
        } else {
          return;
        }
    };

    get email() {
      return this.forgotPasswordForm.get("email");
    }
    goBackBtn(){
      this.location.back();
    }
  
  sendLink(){
    if(this.forgotPasswordForm.valid){
      this.IsDisabled = true
      this.apiservice.CommonPostApi(this.forgotPasswordForm.value,`api/admins/forgot-password`).subscribe({
        next: (res) => {
          const data = res;
          this.forgotPasswordForm.reset()
          this.IsDisabled = false
          this.router.navigate(["/login"]);
          this.toasterService.success(data.message);
        },
        error: (error) => {
          console.log(error)
          this.IsDisabled = false
          let errorMessage = error.error?.error || error.message
          this.toasterService.danger(errorMessage);
        }
      })
    }
  }
}
