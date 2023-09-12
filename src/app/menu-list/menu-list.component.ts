import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import { SelectedMenu } from '../shared/models/selected-menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuItemModalComponent } from '../menu-item-modal/menu-item-modal.component';
// import * as data2 from '../../assets/menu-list.json';

declare var require: any;

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  matDialogRef: MatDialogRef<MenuItemModalComponent>;

  public data: any = [];
  public data3: any = [];
  public data2: any = [];

  public menuSelected: SelectedMenu[] = [];
  public totalMenuSum: number = 0;

  page = 0;
  size = 9;

  categories = [
    { id: 1, category: 'appetizers' },
    { id: 2, category: 'main courses' },
    { id: 3, category: 'bevarages' },
  ];


  constructor(private http: HttpClient, private matDialog: MatDialog) {}

  async ngOnInit() {
    this.data2 = require('../../assets/menu-list.json');
    console.log(this.data2);

    this.getData({ pageIndex: this.page, pageSize: this.size });
  }

  subscribeMenuList(): Observable<any> {
    return this.http.get('assets/menu-list.json');
  }

  getData(obj: any, categoryId?: number) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.data3 = categoryId
      ? this.data2.filter((item: any) => item.categoryId === categoryId)
      : this.data2;

    this.data = this.data3.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }

  getCategoryName(categoryId: number) {
    return this.categories.find((item) => item.id === categoryId)?.category;
  }

  buyItem(itemId: number) {
    let item = this.data.find((x: any) => x.id === itemId);
    let filteredMenu = this.menuSelected.filter((menu) => itemId === menu.id);
    if (this.menuSelected.length && filteredMenu.length) {
      filteredMenu[0].quantity += 1;
    } else {
      item = { ...item, quantity: 1 };
      this.menuSelected.push(item);
    }
    this.getTotalSum();
    console.log('44444444', this.menuSelected);
  }

  getTotalSum(): void {
    // var total = 0;
    this.menuSelected.forEach((item) => {
      this.totalMenuSum += item.price - item.discount * item.quantity;
    });
    // return total;
  }

  openItemModal(item:any) {
    let categoryN = this.getCategoryName(item.categoryId)
    this.matDialogRef = this.matDialog.open(MenuItemModalComponent, {
      data: {
        name: item.name,
        price: item.price,
        categoryName: categoryN

      },
    });
  }
}
