import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  total$: Observable<number> = this.shoppingCartService.totalAction$;
  cart$: Observable<Product[]> = this.shoppingCartService.cartAction$;

  constructor(private shoppingCartService: ShoppingCartService){}
}
