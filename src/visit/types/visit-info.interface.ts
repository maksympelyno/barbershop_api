interface ClientInfo {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  isRegular: boolean;
}

interface HaircutInfo {
  name: string;
  price: number;
}

export interface VisitInfo {
  _id: string;
  client: ClientInfo;
  haircut: HaircutInfo;
  finalPrice: number;
  date: string;
  branchId: string;
}
