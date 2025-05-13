import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  @Input() PData: any;
  @Output() childEvent = new EventEmitter();
  constructor() {}

  onClick(value: string) {
    this.childEvent.emit(value);
  }
}
