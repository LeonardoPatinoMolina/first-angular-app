import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Store } from '../../shared/interfaces/store.interface';
import { DataService } from '../../shared/services/data.service';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  }

  isDelivery: boolean = true;

  cart: Product[] = [];
  stores: Store[] = [];

  constructor(
    private dataService: DataService, 
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private productService: ProductsService
  ){
    this.checkIfCartIsEmpty();
  }
  
  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }

  onPickUpOrDelivery(value: boolean): void{
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void{
    
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataService.saveOrder(data)
      .pipe(
        switchMap(order=>{
          const orderId = order.id;
          const details: Details[] = this.prepareDetails();
          return this.dataService.saveDetailsOrder({details, orderId});
        }),
        tap(()=> this.router.navigate(['/checkout/thanks'])),
        delay(1000),
        tap(()=>this.shoppingCartService.resetcart())
      ).
      subscribe();
  }

  private getStores():void{
    this.dataService.getStores()
    .pipe(tap((stores: Store[])=>this.stores = stores))
    .subscribe();
  }

  private getCurrentDay(): string{
    return new Date().toLocaleDateString();
  }

  private getDataCart(): void{
    this.shoppingCartService.cartAction$
      .pipe(tap((products: Product[])=> this.cart = products))
      .subscribe();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = []
    this.cart.forEach((product: Product)=>{
      const updateStock = (product.stock - product.quantity)
      const newDetails = {
        id: product.id,
        productName: product.name,
        quantity: product.quantity,
      };
      this.productService.updateStock(product.id, updateStock)
        .pipe(tap(()=>details.push(newDetails)))
        .subscribe()
    })
    return details;
  }

  checkIfCartIsEmpty(): void{
    this.shoppingCartService.cartAction$
      .pipe(tap((products: Product[])=>{
        if(Array.isArray(products) && !products.length){
          this.router.navigate(['/products'])
        }
      }))
      .subscribe()
  }
}
