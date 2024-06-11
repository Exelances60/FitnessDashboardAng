import { Component, Input, SimpleChanges } from '@angular/core';
import { Order } from '../../../interfaces/order-interfaces';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

interface ColumnItem {
  name: string;
  responsive?: string[];
  customFilter?: boolean;
  sortFn?: NzTableSortFn<Order> | null;
  sortDirections?: NzTableSortOrder[] | null;
  sortOrder?: NzTableSortOrder | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<Order> | null;
  filterMultiple?: boolean;
}

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css',
})
export class OrderTableComponent {
  @Input() loading = true;
  @Input() orders: Order[] = [];
  displayData: Order[] = [];
  idFilter = false;
  orderOwnerFilter = false;
  constructor() {
    this.displayData = this.orders;
  }
  listOfColumms: ColumnItem[] = [
    { name: 'Address' },
    { name: 'Total Price' },
    { name: 'Status' },
    { name: 'Phone' },
    { name: 'Category' },
    { name: 'Created At' },
    { name: 'Action' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    this.displayData = this.orders;
  }

  onFilterById(value: string): void {
    this.displayData = this.orders.filter(
      (order: Order) =>
        order._id.toLowerCase().includes(value.toLowerCase()) ||
        order.orderOwner.toLowerCase().includes(value.toLowerCase())
    );
  }
  onFilterByOwner(value: string): void {
    this.displayData = this.orders.filter((order: Order) =>
      order.orderOwner.toLowerCase().includes(value.toLowerCase())
    );
  }

  onResetFilter(): void {
    this.displayData = this.orders;
  }
}
