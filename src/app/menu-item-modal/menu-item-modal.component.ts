import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.scss'],
})
export class MenuItemModalComponent {
  dialogData: any = {};

  constructor(
    private _mdr: MatDialogRef<MenuItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: {}
  ) {
    this.dialogData = data;
    console.log(data);
    console.log(this.dialogData);
    
  }

  close() {
    this._mdr.close(false);
  }
}
