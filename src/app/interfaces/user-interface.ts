import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

export interface OwnerResponse {
  address: string;
  companyName: string;
  email: string;
  memberShipList: string[];
  memberShipMonths: number[];
  memberShipPrice: number;
  ownerImage: string;
  phone: string;
  productCategory: string[];
  _id: string;
}

export interface UserInfoResponse {
  message: string;
  owner: OwnerResponse;
}
export interface ColumnItem<T> {
  name: string;
  responsive?: string[];
  customFilter?: boolean;
  sortFn?: NzTableSortFn<T> | null;
  sortDirections?: NzTableSortOrder[] | null;
  sortOrder?: NzTableSortOrder | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<T> | null;
  filterMultiple?: boolean;
}
