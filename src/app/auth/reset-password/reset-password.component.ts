import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from '../../services/toastr.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  showPassword: boolean;
  IsDisabled = false
  token: any;
  constructor(   
    private route: ActivatedRoute,
    private router: Router,
    private location : Location,
    private apiservice: ApiService,
    private toasterService: ToastrService,){}
  ngOnInit(){
    this.initializeresetpasswordForm()
    this.token = this.route.snapshot.paramMap.get('token');
  }

    initializeresetpasswordForm() {
      this.resetPasswordForm = new FormGroup(
        {
          newPassword: new FormControl("", [
            Validators.required,
            Validators.pattern(environment.PasswordPattern),
          ]),
          confirmNewPassword: new FormControl("", [Validators.required]),
        },
        {
          validators: this.NewMatchPassword,
        }
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

    get newPassword() {
      return this.resetPasswordForm.get("newPassword");
    }
    get confirmNewPassword() {
      return this.resetPasswordForm.get("confirmNewPassword");
    }

    onKeyDownHandler(event: any){}
    onKeyPressHandler(event: any){}
    goBackBtn(){
      this.location.back();
    }
  
  reset(){
    if(this.resetPasswordForm.valid){
      this.IsDisabled = true
      this.apiservice.CommonPostApi(this.resetPasswordForm.value,`api/admins/reset-password/${this.token}`).subscribe({
        next: (res) => {
          const data = res;
          this.router.navigate(['/login']);
          this.IsDisabled = false
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
