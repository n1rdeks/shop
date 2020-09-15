import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IProductBrand } from '../shared/models/productBrand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class ShopService {
    baseUrl = environment.apiUrl;
    products: IProduct[] = [];
    brands: IProductBrand[] = [];
    types: IProductType[] = [];

    constructor(private http: HttpClient) { }

    getProducts(shopParams: ShopParams) {
        let params = new HttpParams();

        if (shopParams.brandId !== 0) {
            params = params.append('brandId', shopParams.brandId.toString());
        }

        if (shopParams.typeId !== 0) {
            params = params.append('typeId', shopParams.typeId.toString());
        }

        if (shopParams.search) {
            params = params.append('search', shopParams.search);
        }

        params = params.append('sort', shopParams.sort);
        params = params.append('pageIndex', shopParams.pageNumber.toString());
        params = params.append('pageIndex', shopParams.pageSize.toString());

        return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
            .pipe(
                map(response => {
                    this.products = response.body.data;
                    return response.body;
                })
            );
    }

    getProduct(id: number) {
        const product = this.products.find(p => p.id === id);

        if (product) {
            return of(product);
        }

        return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
    }

    getBrands() {
        if (this.brands.length > 0) { return of(this.brands); }

        return this.http.get<IProductBrand[]>(this.baseUrl + 'products/brands').pipe(
            map(response => {
                this.brands = response;
                return response;
            })
        );
    }

    getTypes() {
        if (this.types.length > 0) { return of(this.types); }

        return this.http.get<IProductType[]>(this.baseUrl + 'products/types').pipe(
            map(response => {
                this.types = response;
                return response;
            })
        );
    }
}
