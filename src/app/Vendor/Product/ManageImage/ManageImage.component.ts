import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Product } from '../../../Models/Product';
import { ProductService } from '../../../Services/Product.service';

@Component({
  selector: 'app-ManageImage',
  templateUrl: './ManageImage.component.html',
  styleUrls: ['./ManageImage.component.scss']
})
export class ManageImageComponent implements OnInit {

  uploadImg:FormControl
  //* My Variables
  allProducts:Product[]=[];
  constructor(private productservices:ProductService) {


   }

  ngOnInit() {
    if (this.productservices.products.length == 0) {
      this.productservices.getProducts()
    }
    this.uploadImg = new FormControl('',[Validators.required])
    this.allProducts=this.productservices.products;

    this.productservices.getProductsWithoutLoad().subscribe((pro)=>{
      this.allProducts=pro;
    })

  }

  updatImage(event,indexProduct,indexPhoto){

   let photo=(URL.createObjectURL(event.target.files[0] as File));
   this.allProducts[indexProduct].photos[indexPhoto]=photo;
   this.productservices.editProduct(this.allProducts[indexProduct]);
  }



deleteImage(indexProduct,indexPhoto){
  let pro = this.allProducts[indexProduct]._id;
  let file = this.allProducts[indexProduct].photos[indexPhoto];
  this.allProducts[indexProduct].photos.splice(indexPhoto,1);

 // this.productservices.editProduct(this.allProducts[indexProduct]);
 this.productservices.deletePhoto(pro,file);
}

uploadpreviewImge(event, productId) {

  let formDta= new FormData()
  formDta.append("_id",productId)
  //let file = event.target.files[0] as File;
  let files = event.target.files;
  for (let i = 0; i < files.length; i++) {
  formDta.append('photos',files[i], files[i].name);

  }
  this.productservices.updatePhoto(productId,formDta)
  // this.uploadImg.setValue(formDta)
}


}
