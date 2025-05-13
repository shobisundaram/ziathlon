import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { PagestateService } from '../../services/pagestate.service';
import { TableService } from '../../services/table.service';


// ng update @angular/core@19 @angular/cli@19


@Component({
  selector: 'ngx-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent {
  @Input() headers: any[] = [];
  @Input() data: any[] = [];

  @Output() viewItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() navigatePage = new EventEmitter<any>();
  first: any = 0
  rows: number = 10;
  totalRecords: number = 100; // or however many rows in your dataset

 rowsOptions = [
  { label: '10 per page', value: 10 },
  { label: '20 per page', value: 20 },
  { label: '50 per page', value: 50 },
];
currentPage: any;
ngOnInit(){}
get rowsPerPageValues(): number[] {
  return this.rowsOptions.map(opt => opt.value);
}
onRowsChange(event: any) {
  this.rows = event.value;
  // Optionally fetch new data if using server-side
}
  handleAction(type: string, rowData: any) {
    switch (type) {
      case 'viewItem':
        this.viewItem.emit(rowData);
        break;
      case 'editItem':
        this.editItem.emit(rowData);
        break;
      case 'deleteItem':
        this.deleteItem.emit(rowData);
        break;
      case 'navigatePage':
        this.navigatePage.emit(rowData);
        break;
    }
  }
  getActionButtonClass(type: string): string {
  if (type === 'deleteItem') return 'custom-delete-btn';
  return '';
  }

  isAction(col: any): boolean {
    return !!col.type;
  }

  changePage(event){
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = event.page;
  }
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      default:
        return '';
    }
  }

}
