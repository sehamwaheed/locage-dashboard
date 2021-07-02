import { Product } from "./../Models/Product";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient,private toast: NbToastrService) {}
  products: Product[] = [];
  private productsLoad = new Subject<Product[]>();

  private readonly api = "https://locage.herokuapp.com/api/v1/products";

  getProducts() {
    return this.http
      .get<{ product: Product[] }>(this.api + "/vendor?page=1&limit=10")
      .pipe(
        map((pro: any) => {
          return pro?.result?.docs.map((p: any) => {
            return {
              _id: p._id,
              title: p.title,
              color: p.color,
              description: p.description,
              price: p.price,
              subcategoryId: p.subcategoryId,
              vendor: p.vendorId,
              sku: p.sku,
              quantity: p.quantity,
              size: p.size,
              Weight: p.Weight,
              photos: p.photos,
              rating: p.rating,
              discount: p.discount,
              discountDate: p.discountDate,
              brand: p.brand,
              productSpecifications: p.productSpecifications,
            };
          });
        })
      )
      .subscribe((p) => {
        this.products = p;
        this.productsLoad.next([...this.products]);
      });
  }

  getProductById(id) {
    let product;

    return this.http.get<{ product: Product }>(this.api + "/" + id);
    // this.products.find((d)=>d.id == id);
  }

  addProduct(_product: FormData) {
    this.http
      .post<{ message: string; result: Product }>(this.api, _product)
      .subscribe(
        (data) => {
          this.products.push(data.result);
          this.productsLoad.next([...this.products]);
          this.showToast(
            "success",
            "Operation Created valid  ",
            "your Product is Created "
          );
        },
        (error) => {
          console.log(error);

        }
      );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : "";
    this.toast.show(body, `${titleContent}`, config);
  }

  getProductsWithoutLoad() {
    return this.productsLoad.asObservable();
  }

  editProduct(_product: Product) {
    this.http
      .patch(this.api + "/" + _product._id, _product)
      .subscribe((res) => {

        //  const updateproducts=[...this.products];
        //  let oldIndex= updateproducts.findIndex((i)=>i.id == _product.id);
        //    updateproducts[oldIndex]=_product;
        //    this.products= updateproducts;
        //    this.productsLoad.next([...this.products]);
      });
  }
  deletProduct(id) {
    this.http.delete(this.api + "/" + id).subscribe(() => {
      let updatedproduct = this.products.filter((i) => i._id !== id);
      this.products = updatedproduct;
      this.productsLoad.next([...this.products]);
    });
  }

  deletePhoto(idProduct, url) {
    this.http
      .delete(this.api + "/" + idProduct + "/manage-photos/" + url)
      .subscribe((res: any) => {
        this.products = this.products.map((pro) => {
          if (pro._id == res.result._id) {
            pro = res.result;
          }
          return pro;
        });

        this.productsLoad.next([...this.products]);
      });
  }

  updatePhoto(productId, img) {
    this.http
      .patch(this.api + "/" + productId + "/manage-photos", img)
      .subscribe((res: any) => {

        this.products = this.products.map((pro) => {
          if (pro._id == res.result._id) {
            pro = res.result;
          }
          return pro;
        });
        this.productsLoad.next([...this.products]);
      });
  }
}
