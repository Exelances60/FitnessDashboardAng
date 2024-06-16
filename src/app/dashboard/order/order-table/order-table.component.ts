import { Component, Input } from '@angular/core';
import { Order } from '../../../interfaces/order-interfaces';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserService } from '../../../services/user.service';
import { ColumnItem } from '../../../interfaces/user-interface';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent {
  @Input() loading = true;

  orders: Order[] = [];
  curency = '';
  displayData: Order[] = [];
  allStatus: string[] = [];
  allCategory: { text: string; value: string }[] = [];
  selectedOrder: Order | null = null;
  modalState = { view: false, edit: false };

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private orderService: OrderService
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
    this.orderService.$orders.subscribe((orders) => {
      this.orders = orders;
      this.displayData = [...orders];
      this.updateStatusFilter();
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

  updateStatusFilter(): void {
    this.allStatus = this.displayData.reduce((acc: string[], order: Order) => {
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
    this.modalState.view = true;
  }

  openEditModal(order: Order): void {
    this.selectedOrder = order;
    this.modalState.edit = true;
  }
}
