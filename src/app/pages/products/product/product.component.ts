import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product?: Product;
  @Output() addToCartClick: EventEmitter<Product> = new EventEmitter<Product>();

  onClick(){
    this.addToCartClick.emit(this.product);
  }
}
