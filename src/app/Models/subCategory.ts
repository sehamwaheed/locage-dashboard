export interface Subcategory {
  _id: any;
  name: string;
  photo: string;
  categoryId: {
    _id: any,
    name: string,
    photo: string,
  }
}
