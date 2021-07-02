export interface StoreModel {
  _id: any;
  name: string;
  statusCode: string;
  address: {
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  phoneNumber: string;
  email: string;
  photo: string;
  userId: string;
}
