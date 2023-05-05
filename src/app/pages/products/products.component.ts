import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  template: `
  <section class="products">
    <app-product 
      (addToCartClick)="addToCart($event)"
      [product]="product" 
      *ngFor="let product of products"
    ></app-product>
  </section>
  `,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products?: Product[];

  constructor(private productService: ProductsService, private shoppingCartService: ShoppingCartService){} 

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(tap((products: Product[])=> this.products = products))
      .subscribe()
  }

  addToCart(product: Product): void{
    this.shoppingCartService.updateCart(product);
  }

}
