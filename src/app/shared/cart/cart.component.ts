import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
import { ShoppingCartService } from "../services/shopping-cart.service";

@Component({
  selector: 'app-cart',
  template: `
    <ng-container *ngIf="{total: total$ | async, quantity: quantity$ | async} as dataCart">
      <ng-container *ngIf="dataCart.total">
        <mat-icon>add_shopping_cart</mat-icon>
          {{ dataCart.total | currency }}
          ({{ dataCart.quantity }})
        </ng-container>
      </ng-container>
  `
})
export class CartComponent{
  quantity$: Observable<number> = this.shoppingCartService.quantityAction$;
  total$: Observable<number> = this.shoppingCartService
  .totalAction$;
  cart$: Observable<Product[]> = this.shoppingCartService.cartAction$;

  constructor(private shoppingCartService: ShoppingCartService){}
}