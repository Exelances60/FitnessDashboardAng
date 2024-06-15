import { Component, Input, SimpleChanges } from '@angular/core';
import { Order } from '../../../interfaces/order-interfaces';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserService } from '../../../services/user.service';
import { ColumnItem } from '../../../interfaces/user-interface';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent {
  @Input() loading = true;
  @Input() orders: Order[] = [];
  displayData: Order[] = [];
  curency = '';
  allStatus: string[] = [];
  allCategory: { text: string; value: string }[] = [];
  viewModal = false;
  selectedOrder: Order | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {
    this.localStorageService.$cureny.subscribe((currecy) => {
      this.curency = currecy;
    });
    this.userService.$user.subscribe((user) => {
      this.allCategory =
        user?.productCategory.map((category) => ({
          text: category,
          value: category,
        })) || [];
      this.updateCategoryFilter();
    });
  }

  listOfColumms: ColumnItem<Order>[] = [
    { name: 'Address' },
    {
      name: 'Total Price',
      sortFn: (a: Order, b: Order) => a.totalPrice - b.totalPrice,
    },
    {
      name: 'Status',
      filterFn: (list: string[], item: Order) =>
        list.some((status) => item.status.includes(status)),
      filterMultiple: false,
    },
    { name: 'Phone' },
    { name: 'Category' },
    {
      name: 'Created At',
      sortFn: (a: Order, b: Order) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    { name: 'Action' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders'] && changes['orders'].currentValue) {
      this.displayData = this.orders;
      this.updateStatusFilter();
    }
  }

  updateStatusFilter(): void {
    this.allStatus = this.orders.reduce((acc: string[], order: Order) => {
      if (!acc.includes(order.status)) {
        acc.push(order.status);
      }
      return acc;
    }, []);
    this.listOfColumms[2].listOfFilter = this.allStatus.map((status) => ({
      text: status,
      value: status,
    }));
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

  updateCategoryFilter(): void {
    this.listOfColumms[4] = {
      name: 'Category',
      listOfFilter: this.allCategory,
      filterFn: (list: string[], item: Order) =>
        list.some((category) =>
          item.orderCategory
            ? item.orderCategory.includes(category)
            : item.orderCategory.includes(category)
        ),
    };
  }

  openViewModal(order: Order): void {
    this.selectedOrder = order;
    this.viewModal = true;
  }
}
