import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from '../products/interfaces/store.interface';
import { DataService } from '../products/services/data.service';

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

  isDelivery: boolean = false;

  stores: Store[] = [];

  constructor(private dataService: DataService){}
  
  ngOnInit(): void {
    this.getStores();
  }
  onPickUpOrDelivery(value: boolean): void{
    this.isDelivery = value;
  }
  onSubmit(): void{
    console.log("saludar")
  }
  private getStores():void{
    this.dataService.getStores()
    .pipe(tap((stores: Store[])=>this.stores = stores))
    .subscribe();
  }
}
