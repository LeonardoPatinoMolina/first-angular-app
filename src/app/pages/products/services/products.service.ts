import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  updateStock(productId: number, stock: number): Observable<any>{
    const body = {
      "stock":stock
    }
    return this.http.patch<any>(`${this.apiUrl}/products/${productId}`,body)
  }
  
}
