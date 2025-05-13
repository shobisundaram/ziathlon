import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly rowData = new BehaviorSubject<any>({});
  
  constructor() { }
  setNewRowInfo(data: any) {
    this.rowData.next(data);
  }


  getNewRowInfo() {
    console.log('Current Row Info:', this.rowData.getValue());
    return this.rowData.asObservable();
  }
}
