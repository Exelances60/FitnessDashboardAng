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
