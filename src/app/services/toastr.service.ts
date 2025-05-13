import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  
  private toastSubject = new Subject<string>();

  constructor(
    private toastrService: NbToastrService
  ) {}

  // Observable to listen for toast messages
  getToastMessage() {
    return this.toastSubject.asObservable();
  }

  // Function to trigger toast
  triggerToast(message: string): void {
    this.toastSubject.next(message); // Emit toast message
  }

  success(message: string): void {
    this.toastrService.show(message,'', {
      status: 'success',
      icon: 'checkmark-circle-outline', // Use Nebular Eva Icons
      duration: 3000,
      destroyByClick: true,
    });

  }

  // Method to show error toast
  danger(message: string, title: string = 'Error'): void {
    this.toastrService.show(message,'', {
      status: 'danger',
      icon: 'close-circle-outline', // Change to a different Eva icon
      duration: 3000,
      destroyByClick: true,
    });
  }
}
